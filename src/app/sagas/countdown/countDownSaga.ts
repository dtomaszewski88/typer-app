import { put, takeLatest, delay, select } from 'redux-saga/effects'

import {
    countDownInit,
    getCountDown,
    countDownTick,
    countDownDone,
} from '../../../features/typer/typerSlice'

const COUNTDOWN_DELAY_MS = 1000

function* countDown(action: ReturnType<typeof countDownInit>) {
    while (true) {
        yield delay(COUNTDOWN_DELAY_MS)
        const count: number = yield select(getCountDown)
        if (count === 0) {
            yield put(countDownDone())
            return
        } else {
            yield put(countDownTick())
        }
    }
}

export function* watchCountDown() {
    yield takeLatest(countDownInit, countDown)
}
