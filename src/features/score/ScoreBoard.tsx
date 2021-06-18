import React from 'react'
import { Container } from 'react-bootstrap'
import { map, slice } from 'lodash'
import Score from '../score/Score'
import './score.scss'

interface Props {
    playersScores: ReadonlyArray<Object>
    isOver?: boolean
}

const ScoreBoard = ({ playersScores }: Props) => {
    const scores = slice(playersScores, 0, 2)
    return (
        <div className="score-board">
            <div className="score-board-inner">
                {map(playersScores, (playerScore, index) => {
                    return (
                        <Score
                            playerScore={playerScore}
                            key={playerScore.id}
                            totalPlayersCount={playersScores.length}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default ScoreBoard
