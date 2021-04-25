import { connect } from 'react-redux'
import Start from './Start'
import {
    getUserName,
    updateUserName,
    getIsSearchingForGame,
    gameSearchInit,
} from '../typer/typerSlice'

const mapStateToProps = (state: any) => ({
    isSearching: getIsSearchingForGame(state),
    userName: getUserName(state),
})

const mapDispatchToProps = {
    updateUserName,
    gameSearchInit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
