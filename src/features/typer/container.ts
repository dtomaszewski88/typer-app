import { connect } from 'react-redux'
import Typer from './Typer'
import {
    getLocalText,
    updateLocalTextGuarded,
    getCurrentWord,
    getScore,
    getCountDown,
    countDownInit,
    getErrors,
    getStatus,
    getErrorTime,
    getRemainingWords,
    getPlayersCurrentWords,
    getGameState,
    getPlayersScores,
} from './typerSlice'

const mapStateToProps = (state: any) => ({
    localText: getLocalText(state),
    currentWord: getCurrentWord(state),
    errors: getErrors(state),
    status: getStatus(state),
    errorTime: getErrorTime(state),
    score: getScore(state),
    countDown: getCountDown(state),
    remainingWords: getRemainingWords(state),
    playerCurrentWords: getPlayersCurrentWords(state),
    playersScores: getPlayersScores(state),
    gameState: getGameState(state),
})

const mapDispatchToProps = {
    updateLocalText: updateLocalTextGuarded,
    countDownInit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Typer)
