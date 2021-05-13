import { takeEvery, all, select } from 'redux-saga/effects'

import type { Socket } from 'socket.io-client'

import {
    updateLocalText,
    gameSearchInit,
    playerReadyInit,
    getGameId,
    getTyperState,
    completeWord,
} from '../../../../features/typer/typerSlice'

function* writeLocalText(socket: Socket) {
    yield takeEvery([updateLocalText], function* ({ payload }) {
        const gameId = yield select(getGameId)
        socket.emit('updateLocalText', { gameId, currentText: payload })
    })
}

function* writeCompleteWord(socket: Socket) {
    yield takeEvery([completeWord], function* () {
        const gameId = yield select(getGameId)
        socket.emit('completeWord', { gameId })
    })
}

function* writeGameSearchInit(socket: Socket) {
    yield takeEvery([gameSearchInit], () => {
        socket.emit('gameSearchInit')
    })
}

function* writePlayerReadyInit(socket: Socket) {
    yield takeEvery([playerReadyInit], function* () {
        const gameId = yield select(getGameId)
        const state = yield select(getTyperState)
        socket.emit('playerReadyInit', { gameId: gameId })
    })
}

export function* writeSocket(socket: Socket) {
    yield all([
        writeLocalText(socket),
        writeCompleteWord(socket),
        writeGameSearchInit(socket),
        writePlayerReadyInit(socket),
    ])
}
