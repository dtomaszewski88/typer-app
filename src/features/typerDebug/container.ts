import { connect } from 'react-redux'
import TyperDebug from './TyperDebug'
import {
    getLocalText,
    updateLocalTextGuarded,
    getRemoteText,
    getCurrentWord,
    getScore,
    getCountDown,
    countDownInit,
    getErrors,
    getErrorTime,
    getRemainingWords,
    getStatus,
} from '../typer/typerSlice'

const mapStateToProps = (state: any) => ({
    localText: getLocalText(state),
    remoteText: getRemoteText(state),
    currentWord: getCurrentWord(state),
    status: getStatus(state),
    errors: getErrors(state),
    errorTime: getErrorTime(state),
    score: getScore(state),
    countDown: getCountDown(state),
    remainingWords: getRemainingWords(state),
})
const mapDispatchToProps = {
    updateLocalText: updateLocalTextGuarded,
    countDownInit,
}

export default connect(mapStateToProps, mapDispatchToProps)(TyperDebug)
