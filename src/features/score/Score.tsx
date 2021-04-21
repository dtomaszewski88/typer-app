import React, { useRef } from 'react'
import { InputGroup, FormControl, Container, Button } from 'react-bootstrap'
import './score.scss'

interface Props {
    score: number
}

const Score = ({ score }: Props) => {
    const lastScore = useRef(null)
    const scoreValue = score + ''

    return (
        <div className="score-container">
            <div className="score-label">SCORE:</div>
            <div className="score-wrapper">
                <div className="score-value">{scoreValue}</div>
            </div>
        </div>
    )
}
export default Score
