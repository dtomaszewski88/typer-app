import { put, takeEvery, call } from 'redux-saga/effects'

import { eventChannel } from 'redux-saga'
import type { Socket } from 'socket.io-client'

import {
    countDownInit,
    gameUpdate,
    gameSearchSuccess,
    gameOver,
} from '../../../../features/typer/typerSlice'

const COUNTDOWN_STEP_COUNT = 1

export function* createSocketReadChannel(socket: Socket) {
    return eventChannel((emit) => {
        socket.on('gameOver', (data) => {
            emit(gameOver(data))
        })
        socket.on('gameUpdate', (data) => {
            emit(gameUpdate(data))
        })
        socket.on('gameSearchSuccess', (data) => {
            console.log(socket, data)
            emit(gameSearchSuccess(data))
        })
        socket.on('gameReadySuccess', () => {
            emit(countDownInit(COUNTDOWN_STEP_COUNT))
        })
        socket.on('playerDisconnected', (...args) => {
            console.log('playerDisconnected', args)
        })
        return () => {}
    })
}

export function* readSocket(socket: Socket) {
    const readChannel = yield call(createSocketReadChannel, socket)
    yield takeEvery(readChannel, function* (action) {
        yield put(action)
    })
}
