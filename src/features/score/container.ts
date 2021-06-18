import { connect } from 'react-redux'
import ScoreBoard from './ScoreBoard'
import { getGameState, getPlayersScores } from '../typer/typerSlice'

const mapStateToProps = (state: any) => ({
    playersScores: getPlayersScores(state),
    gameState: getGameState(state),
})

export default connect(mapStateToProps)(ScoreBoard)
