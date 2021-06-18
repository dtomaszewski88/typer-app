import React, { useRef } from 'react'
import classNames from 'classnames'

type PlayerScore = {
    id: string
    name: string
    score: number
    isCurrent: boolean
    scoreIndex: number
}

interface Props {
    playerScore: PlayerScore
    totalPlayersCount: number
}

const TRANSLATE_STEP_SIZE = 12.5 // %

const HORIZONTAL_TRANSLATES = {
    1: [-4],
    2: [-9, 1],
    3: [-14, -4, 6],
    4: [-19, -9, 1, 11],
}

const Score = ({ playerScore, totalPlayersCount }: Props) => {
    const { score, name, isCurrent, scoreIndex } = playerScore
    const classes = classNames('score-container', { 'is-current': isCurrent })
    const style = {
        transform: `translate(${
            HORIZONTAL_TRANSLATES[totalPlayersCount][scoreIndex] *
            TRANSLATE_STEP_SIZE
        }%, 0%)`,
    }
    return (
        <div className={classes} style={style}>
            <div className="score-label">{name}</div>
            <div className="score-wrapper">
                <div className="score-value">{score}</div>
            </div>
        </div>
    )
}
export default Score
