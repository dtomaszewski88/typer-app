import { connect } from 'react-redux'
import Countdown from './Countdown'
import { getCountDown } from '../typer/typerSlice'

const mapStateToProps = (state: any) => ({
    countDown: getCountDown(state),
})

export default connect(mapStateToProps)(Countdown)
