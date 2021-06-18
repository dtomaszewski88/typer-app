import React from 'react'
import Typer from './features/typer/container'
import Init from './features/init/init'
import Start from './features/start/container'
import GameReady from './features/gameReady/container'
import 'bootstrap/dist/css/bootstrap.min.css'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import Countdown from './features/countdown/container'
import {
    INIT,
    START,
    GAME_READY,
    GAME_COUNTDOWN,
    GAME_IN_PROGRESS,
    GAME_OVER,
} from './features/typer/typerSlice'
import { Navbar } from 'react-bootstrap'
import GameOver from './features/gameOver/container'

interface Props {
    updateText: (arg0: string) => void
    countDownInit: (arg0: number) => void
    status: string
}

export default function App(props: Props) {
    const { updateText, status } = props
    return (
        <>
            <KeyboardEventHandler
                handleKeys={['alphabetic']}
                onKeyEvent={(key) => updateText(key)}
            />
            <Navbar></Navbar>
            <div className="app-main">
                {
                    {
                        [INIT]: <Init />,
                        [START]: <Start />,
                        [GAME_READY]: <GameReady />,
                        [GAME_COUNTDOWN]: <Countdown />,
                        [GAME_IN_PROGRESS]: <Typer />,
                        [GAME_OVER]: <GameOver />,
                    }[status]
                }
            </div>
        </>
    )
}
