import React from 'react'
import { Container } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { map } from 'lodash'
import ScoreBoard from '../score/container'
import './typer.scss'
import WordProgress from './WordPreview'
import RemainingWords from './remainingWords'

interface Props {
    errorTime: number
    localText: string
    currentWord: string | undefined
    remainingWords: [string?]
    playerCurrentWords: Object
    playersScores: ReadonlyArray<Object>
    gameState: Object
}

const Typer = ({
    errorTime,
    localText,
    currentWord,
    remainingWords,
    playerCurrentWords,
    gameState,
    playersScores,
}: Props) => {
    const textLetters = localText.split('')
    console.log('gameState', gameState)
    console.log('playersScores', playersScores)
    return (
        <>
            <Container>
                <ScoreBoard />
                <div className="typer">
                    <div className="current-word-input" key={errorTime}>
                        <CSSTransition
                            in={Boolean(errorTime)}
                            classNames="error-input"
                            timeout={500}
                            appear
                        >
                            <div className="word-wrapper-inner">
                                <WordProgress
                                    currentText={localText}
                                    targetWord={currentWord}
                                    wordProgress={playerCurrentWords}
                                />
                                <div className="text-wrapper">
                                    {map(
                                        textLetters,
                                        (letter: string, index: number) => (
                                            <div
                                                className="letter"
                                                key={`${letter}-${index}`}
                                            >
                                                {letter}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                    <RemainingWords
                        localText={localText}
                        remainingWords={remainingWords}
                        playerCurrentWords={playerCurrentWords}
                    />
                </div>
            </Container>
        </>
    )
}
export default Typer
