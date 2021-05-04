import {
    put,
    takeEvery,
    all,
    take,
    call,
    fork,
    takeLatest,
    delay,
    select,
} from 'redux-saga/effects'

import { eventChannel } from 'redux-saga'
import { LOCATION_CHANGE } from 'connected-react-router'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import {
    updateLocalText,
    updateRemoteText,
    countDownInit,
    getCountDown,
    countDownTick,
    countDownDone,
    gameUpdate,
    gameSearchInit,
    gameSearchSuccess,
    playerReadyInit,
    getGameId,
    getTyperState,
    initAppSuccess,
    completeWord,
} from '../features/typer/typerSlice'

function* countDown(action: ReturnType<typeof countDownInit>) {
    while (true) {
        yield delay(1000)
        const count: number = yield select(getCountDown)
        if (count === 0) {
            yield put(countDownDone())
            return
        } else {
            yield put(countDownTick())
        }
    }
}

function* watchCountDown() {
    yield takeLatest(countDownInit, countDown)
}

export function* subscribe(socket: Socket) {
    return eventChannel((emit) => {
        socket.on('gameUpdate', (data) => {
            return emit(gameUpdate(data))
        })
        socket.on('gameSearchSuccess', (data) => {
            console.log(socket, data)
            emit(gameSearchSuccess(data))
        })
        socket.on('gameReadySuccess', () => {
            emit(countDownInit(5))
        })
        return () => {}
    })
}

function* read(socket: Socket) {
    const channel = yield call(subscribe, socket)
    yield takeEvery(
        channel,
        function* (action: ReturnType<typeof updateRemoteText>) {
            yield put(action)
        }
    )
}

function connectToSocket(): Promise<Socket> {
    const socket = io()
    return new Promise((resolve) => socket.on('connect', () => resolve(socket)))
}

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

function* write(socket: Socket) {
    yield all([
        writeLocalText(socket),
        writeCompleteWord(socket),
        writeGameSearchInit(socket),
        writePlayerReadyInit(socket),
    ])
}

function* initAppSaga() {
    yield take(LOCATION_CHANGE)
    const socket: Socket = yield call(connectToSocket)
    yield put(initAppSuccess(socket.id))
    yield fork(write, socket)
    yield fork(read, socket)
}

export default function* rootSaga() {
    yield all([initAppSaga(), watchCountDown()])
}
