import { takeEvery, all, select } from 'redux-saga/effects'

import type { Socket } from 'socket.io-client'

import {
    updateLocalText,
    gameSearchInit,
    playerReadyInit,
    getGameId,
    completeWord,
    getErrors,
    getUserName,
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
        const errors = yield select(getErrors)
        socket.emit('completeWord', { gameId, errors })
    })
}

function* writeGameSearchInit(socket: Socket) {
    yield takeEvery([gameSearchInit], function* () {
        const name = yield select(getUserName)
        socket.emit('gameSearchInit', { name })
    })
}

function* writePlayerReadyInit(socket: Socket) {
    yield takeEvery([playerReadyInit], function* () {
        const gameId = yield select(getGameId)
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
