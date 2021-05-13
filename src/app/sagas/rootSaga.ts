import { put, all, take, call, fork } from 'redux-saga/effects'

import { eventChannel } from 'redux-saga'
import { LOCATION_CHANGE } from 'connected-react-router'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { watchCountDown } from './countdown/countDownSaga'
import { writeSocket } from './socket/write/writeSocketSaga'
import { readSocket } from './socket/read/readSocketSaga'

import { initAppSuccess } from '../../features/typer/typerSlice'

function connectToSocket(): Promise<Socket> {
    const socket = io()
    return new Promise((resolve) => socket.on('connect', () => resolve(socket)))
}

function* initAppSaga() {
    yield take(LOCATION_CHANGE)
    const socket: Socket = yield call(connectToSocket)
    yield put(initAppSuccess(socket.id))
    yield fork(writeSocket, socket)
    yield fork(readSocket, socket)
}

export default function* rootSaga() {
    yield all([initAppSaga(), watchCountDown()])
}
