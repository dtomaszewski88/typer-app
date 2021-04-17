import { connect } from 'react-redux'
import Score from './Score'
import { getScore } from '../typer/typerSlice'

const mapStateToProps = (state: any) => ({
    score: getScore(state),
})

export default connect(mapStateToProps)(Score)
