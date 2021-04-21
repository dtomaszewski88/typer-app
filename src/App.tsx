import React from 'react'
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import Typer from './features/typer/container'
import TyperDebug from './features/typerDebug/container'
import 'bootstrap/dist/css/bootstrap.min.css'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import Countdown from './features/countdown/container'
import {
    INIT,
    GAME_READY,
    GAME_COUNTDOWN,
    GAME_IN_PROGRESS,
    GAME_OVER,
} from './features/typer/typerSlice'
type Props = {
    updateText: (arg0: string) => void
    countDownInit: (arg0: number) => void
    addItems: (arg0: number, arg1?: boolean) => void
    removeItem: () => void
    resetKey: () => void
    resetAnimate: () => void
    toggleAnimate: () => void
    listKey: string
    status: string
}

export default function App(props: Props) {
    const {
        updateText,
        countDownInit,
        status,
        addItems,
        removeItem,
        listKey,
        resetKey,
        resetAnimate,
        toggleAnimate,
    } = props
    const handleAddMultiple = () => {
        setTimeout(() => {
            addItems(1, false)
        }, 0)
        setTimeout(() => {
            addItems(3, false)
        }, 0)
        setTimeout(() => {
            addItems(5, false)
        }, 500)
    }
    return (
        <>
            <KeyboardEventHandler
                handleKeys={['enter']}
                onKeyEvent={() => countDownInit(3)}
            />
            <KeyboardEventHandler
                handleKeys={['alphabetic']}
                onKeyEvent={(key, event) => updateText(key)}
            />
            <div className="app-main">
                {
                    {
                        [INIT]: <div>{' INIT '}</div>,
                        [GAME_READY]: <div>{' GAME_READY '}</div>,
                        [GAME_COUNTDOWN]: <Countdown />,
                        [GAME_IN_PROGRESS]: <Typer />,
                        [GAME_OVER]: <div>{' GAME_OVER '}</div>,
                    }[status]
                }
            </div>
        </>
    )
}
