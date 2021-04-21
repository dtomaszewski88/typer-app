import React from 'react'
import { Container } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
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
