import React from 'react'
import { InputGroup, FormControl, Container, Button } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { getLocalText } from '../typer/typerSlice'
import { map } from 'lodash'
import './countdown.scss'

interface Props {
    countDown: number
}

const Countdown = ({ countDown }: Props) => {
    return (
        <Container>
            <div className="count-down-wrapper" key={countDown}>
                <CSSTransition in classNames="countdown" timeout={1000} appear>
                    <div className="countdown-text">
                        {countDown === 0 ? 'GO!' : countDown}
                    </div>
                </CSSTransition>
            </div>
        </Container>
    )
}
export default Countdown
