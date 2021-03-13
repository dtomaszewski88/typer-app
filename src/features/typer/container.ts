import { connect } from 'react-redux'
import Typer from './Typer'
import {getLocalText, updateLocalTextGuarded, getRemoteText, getCurrentWord} from './typerSlice'

const mapStateToProps = (state: any) => ({
  localText: getLocalText(state),
  remoteText: getRemoteText(state),
  currentWord: getCurrentWord(state),
})
const mapDispatchToProps = { updateLocalText: updateLocalTextGuarded }


export default connect( mapStateToProps, mapDispatchToProps)(Typer)

