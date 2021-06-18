import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { slice } from 'lodash'
import { AppThunk, RootState } from '../../app/store'
import _ from 'lodash'

enum GameStatus {
    INIT,
    START,
    GAME_READY,
    GAME_COUNTDOWN,
    GAME_IN_PROGRESS,
    GAME_OVER,
}

type GameStatusStrings = keyof typeof GameStatus
type Game = {
    id: string
    words: [string]
    players: {
        [key: string]: {
            id: string
            isReady: boolean
            currentText: string
            currentWordIndex: number
            score: number
        }
    }
}
interface TyperState {
    userName: string
    playerId: string
    status: GameStatusStrings
    game: Game | null
    isSearchingForGame: boolean
    isWaitingForPlayers: boolean
    countDown: number
    errors: number
    score: number
    errorTime: number
}

export const INIT = 'INIT'
export const START = 'START'
export const GAME_READY = 'GAME_READY'
export const GAME_COUNTDOWN = 'GAME_COUNTDOWN'
export const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS'
export const GAME_OVER = 'GAME_OVER'

const initialState: TyperState = {
    userName: '',
    playerId: '',
    status: INIT,
    game: null,
    isSearchingForGame: false,
    isWaitingForPlayers: false,
    countDown: 0,
    errors: 0,
    score: 0,
    errorTime: 0,
}

export const typerSlice = createSlice({
    name: 'typer',
    initialState,
    reducers: {
        initAppSuccess: (state, action: PayloadAction<string>) => {
            state.playerId = action.payload
            state.status = START
        },
        updateUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        countDownInit: (state, action: PayloadAction<number>) => {
            state.status = GAME_COUNTDOWN
            state.isWaitingForPlayers = false
            state.countDown = action.payload
        },
        countDownTick: (state) => {
            state.countDown--
        },
        countDownDone: (state) => {
            state.status = GAME_IN_PROGRESS
            state.countDown = 0
        },
        invalidInput: (state, action: PayloadAction<number>) => {
            state.errorTime = action.payload
            state.errors++
        },
        updateLocalText: (state, action: PayloadAction<string>) => {
            state.errorTime = 0
            state.game.players[state.playerId].currentText = action.payload
        },
        completeWord: (state) => {
            const playerId = state.playerId
            state.game.players[playerId].currentText = ''
            state.game.players[playerId].currentWordIndex++
            state.errors = 0
            state.errorTime = 0
        },
        gameSearchInit: (state) => {
            state.isSearchingForGame = true
        },
        gameSearchSuccess: (state, action: PayloadAction<Game>) => {
            state.isSearchingForGame = false
            state.status = GAME_READY
            state.game = action.payload
        },
        gameUpdate: (state, action: PayloadAction<Game>) => {
            const playerId = state.playerId
            const playersUpdate = action.payload.players
            const newScore = playersUpdate[playerId].score
            const otherPlayersUpdate = _.omit(playersUpdate, [playerId])
            state.game.players = _.merge(state.game.players, otherPlayersUpdate)
            state.game.players[playerId].score = newScore
        },
        gameOver: (state, action: PayloadAction<Game>) => {
            state.game = action.payload
            state.status = GAME_OVER
        },
        playerReadyInit: (state) => {
            state.isWaitingForPlayers = true
        },
    },
})

export const {
    initAppSuccess,
    updateUserName,
    updateLocalText,
    completeWord,
    invalidInput,
    countDownInit,
    countDownTick,
    countDownDone,
    gameUpdate,
    gameOver,
    gameSearchInit,
    gameSearchSuccess,
    playerReadyInit,
} = typerSlice.actions

export const getTyperState = (state: RootState) => state.typer
export const getUserName = (state: RootState) => state.typer.userName
export const getPlayerId = (state: RootState) => state.typer.playerId
export const getStatus = (state: RootState) => state.typer.status
export const getGameState = (state: RootState) => state.typer.game
export const getWords = (state: RootState) => getGameState(state)?.words || []
export const getGameId = (state: RootState) => getGameState(state)?.id || ''
export const getGamePlayers = (state: RootState) =>
    getGameState(state)?.players || {}
export const getErrors = (state: RootState) => state.typer.errors
export const getErrorTime = (state: RootState) => state.typer.errorTime
export const getIsStarted = (state: RootState) =>
    getStatus(state) === GAME_IN_PROGRESS
export const getIsSearchingForGame = (state: RootState) =>
    state.typer.isSearchingForGame
export const getIsWaitingForPlayers = (state: RootState) =>
    state.typer.isWaitingForPlayers
export const getScore = (state: RootState) => state.typer.score
export const getCountDown = (state: RootState) => state.typer.countDown

export const getCurrentWordIndex = createSelector(
    getPlayerId,
    getGamePlayers,
    (playerId, players) => {
        return players[playerId]?.currentWordIndex || 0
    }
)

export const getRemainingWords = createSelector(
    getWords,
    getCurrentWordIndex,
    (words, wordIndex) => slice(words, wordIndex + 1, wordIndex + 10)
)
export const getCurrentWord = createSelector(
    getWords,
    getCurrentWordIndex,
    (words, wordIndex) => words[wordIndex] || ''
)
export const getLocalText = createSelector(
    getPlayerId,
    getGamePlayers,
    (playerId, players) => {
        return players[playerId]?.currentText || ''
    }
)

export const getPlayersCurrentWords = createSelector(
    getPlayerId,
    getWords,
    getGamePlayers,
    (playerId, words, players) =>
        _.chain(players)
            .omit(playerId)
            .mapValues((player) => ({
                ...player,
                currentWordProgress: player.currentText.length,
                currentWord: words[player.currentWordIndex],
            }))
            .value()
)

export const getPlayersScoreIndex = createSelector(
    getGamePlayers,
    (gamePlayers) => {
        return _.chain(gamePlayers)
            .values()
            .orderBy(['score'], ['desc'])
            .reduce((result, player, index) => {
                result[player.id] = index
                return result
            }, {})
            .value()
    }
)

export const getPlayersScores = createSelector(
    getPlayerId,
    getGamePlayers,
    getPlayersScoreIndex,
    (playerId, players, scoreIndexes) => {
        console.log('getPlayersScores', scoreIndexes)
        return _.chain(players)
            .map((player) => ({
                id: player.id,
                name: player.name,
                score: player.score,
                isCurrent: player.id === playerId,
                scoreIndex: scoreIndexes[player.id],
            }))
            .orderBy(['name'], ['desc'])
            .value()
    }
)

export const updateLocalTextGuarded = (value: string): AppThunk => (
    dispatch,
    getState
) => {
    const currentWord = getCurrentWord(getState())
    if (!currentWord.startsWith(value)) {
        dispatch(invalidInput(Date.now()))
        return
    }
    if (currentWord === value) {
        dispatch(completeWord())
        return
    }

    dispatch(updateLocalText(value))
}

export const updateWithKey = (key: string): AppThunk => (
    dispatch,
    getState
) => {
    const state = getState()
    const currentWord = getCurrentWord(state)
    const localText = getLocalText(state)
    const isStarted = getIsStarted(state)
    if (!isStarted) {
        return
    }

    const newVal = localText + key
    if (!currentWord.startsWith(newVal)) {
        dispatch(invalidInput(Date.now()))
        return
    }
    if (currentWord === newVal) {
        dispatch(completeWord())
        return
    }

    dispatch(updateLocalText(newVal))
}

export default typerSlice.reducer
