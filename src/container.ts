import { connect } from 'react-redux'
import App from './App'
import { RootState } from './app/store'
import {
    updateWithKey,
    countDownInit,
    getStatus,
} from './features/typer/typerSlice'

const mapStateToProps = (state: RootState) => ({
    status: getStatus(state),
})
const mapDispatchToProps = { updateText: updateWithKey, countDownInit }

export default connect(mapStateToProps, mapDispatchToProps)(App)
