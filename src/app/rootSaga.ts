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
import { EventChannel, eventChannel } from 'redux-saga'
import { LOCATION_CHANGE } from 'connected-react-router'
import axios from 'axios'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import {
    updateLocalText,
    updateRemoteText,
    fetchWordsSuccess,
    countDownInit,
    getCountDown,
    countDownTick,
    countDownDone,
    gameSearchInit,
    gameSearchSuccess,
    playerReadyInit,
} from '../features/typer/typerSlice'

const fetchWordsRequest = async () => {
    const result = await axios.get('/words')
    return result.data
}

function* watchLocationChange() {
    yield takeEvery(LOCATION_CHANGE, () => {
        console.log('SAGA::LOCATION_CHANGE')
    })
}

function* watchUpdateLocalText() {
    yield takeEvery(updateLocalText, () => {
        console.log('SAGA::updateLocalText')
    })
}

export function* subscribe(socket: Socket) {
    return eventChannel((emit) => {
        const update = (data: string) => {
            return emit(updateRemoteText(data))
        }
        socket.on('remoteTextUpdated', update)
        return () => {}
    })
}

function* onSocketReadUpdate(action: ReturnType<typeof updateRemoteText>) {
    console.log('onSocketReadUpdate', action)
    yield put(action)
}

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

function* loadWords() {
    const data: [string?] = yield call(fetchWordsRequest)
    // yield delay(5000)
    yield put(fetchWordsSuccess(data))
}

function* handleGameSearch() {
    yield delay(1000)
    yield put(gameSearchSuccess())
}

function* watchGameSearchInit() {
    yield takeLatest(gameSearchInit, handleGameSearch)
}

function* handlePlayerReady() {
    yield delay(1000)
    yield put(countDownInit(5))
}

function* watchPlayerReadyInit() {
    yield takeLatest(playerReadyInit, handlePlayerReady)
}

function* read(socket: Socket) {
    const channel: EventChannel<
        ReturnType<typeof updateRemoteText>
    > = yield call(subscribe, socket)
    yield takeEvery(channel, onSocketReadUpdate)
}

function connectToSocket(): Promise<Socket> {
    const socket = io()
    return new Promise((resolve) => {
        socket.on('connect', () => {
            resolve(socket)
            console.log('Socket connected')
        })
    })
}

const initSocket = (socket: Socket) => {}

function* write(socket: Socket) {
    yield takeEvery(updateLocalText, ({ payload }) => {
        socket.emit('updateLocalText', payload)
    })
}

function* initAppSaga() {
    yield take(LOCATION_CHANGE)
    console.log('SAGA::LOCATION_CHANGE::initAppSaga')
    const socket: Socket = yield call(connectToSocket)
    yield loadWords()
    yield fork(write, socket)
    yield fork(read, socket)
}

export default function* rootSaga() {
    yield all([
        initAppSaga(),
        watchGameSearchInit(),
        watchPlayerReadyInit(),
        watchUpdateLocalText(),
        watchLocationChange(),
        watchCountDown(),
    ])
}
