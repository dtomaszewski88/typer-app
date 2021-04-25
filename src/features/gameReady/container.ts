import { connect } from 'react-redux'
import GameReady from './GameReady'
import { getIsWaitingForPlayers, playerReadyInit } from '../typer/typerSlice'

const mapStateToProps = (state: any) => ({
    isWaiting: getIsWaitingForPlayers(state),
})

const mapDispatchToProps = {
    playerReadyInit,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameReady)
