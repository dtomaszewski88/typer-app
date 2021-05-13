import { put, takeEvery, call } from 'redux-saga/effects'

import { eventChannel } from 'redux-saga'
import type { Socket } from 'socket.io-client'

import {
    updateRemoteText,
    countDownInit,
    gameUpdate,
    gameSearchSuccess,
    gameOver,
} from '../../../../features/typer/typerSlice'

const COUNTDOWN_STEP_COUNT = 1

export function* createSocketReadChannel(socket: Socket) {
    return eventChannel((emit) => {
        socket.on('gameOver', (data) => {
            return emit(gameOver(data))
        })
        socket.on('gameUpdate', (data) => {
            return emit(gameUpdate(data))
        })
        socket.on('gameSearchSuccess', (data) => {
            console.log(socket, data)
            emit(gameSearchSuccess(data))
        })
        socket.on('gameReadySuccess', () => {
            emit(countDownInit(COUNTDOWN_STEP_COUNT))
        })
        return () => {}
    })
}

export function* readSocket(socket: Socket) {
    const readChannel = yield call(createSocketReadChannel, socket)
    yield takeEvery(
        readChannel,
        function* (action: ReturnType<typeof updateRemoteText>) {
            yield put(action)
        }
    )
}
