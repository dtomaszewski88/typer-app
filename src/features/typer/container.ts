import { connect } from 'react-redux'
import Typer from './Typer'
import {
    getLocalText,
    updateLocalTextGuarded,
    getRemoteText,
    getCurrentWord,
    getScore,
    getCountDown,
    countDownInit,
    getErrors,
    getStatus,
    getErrorTime,
    getRemainingWords,
} from './typerSlice'

const mapStateToProps = (state: any) => ({
    localText: getLocalText(state),
    remoteText: getRemoteText(state),
    currentWord: getCurrentWord(state),
    errors: getErrors(state),
    status: getStatus(state),
    errorTime: getErrorTime(state),
    score: getScore(state),
    countDown: getCountDown(state),
    remainingWords: getRemainingWords(state),
})

const mapDispatchToProps = {
    updateLocalText: updateLocalTextGuarded,
    countDownInit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Typer)
