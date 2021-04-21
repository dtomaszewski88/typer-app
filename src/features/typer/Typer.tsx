import React from 'react'
import { InputGroup, FormControl, Container, Button } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { getLocalText } from './typerSlice'
import { map } from 'lodash'
import classNames from 'classnames'
import Score from '../score/container'
import './typer.scss'

declare type FormControlElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
interface Props {
    countDown: number
    score: number
    errorTime: number
    errors: number
    localText: string
    status: string
    remoteText: string
    currentWord: string | undefined
    remainingWords: [string?]
    updateLocalText: (arg1: string) => void
    countDownInit: (arg1: number) => void
}

const Typer = ({
    score,
    errors,
    errorTime,
    countDown,
    localText,
    remoteText,
    currentWord,
    remainingWords,
    updateLocalText,
    countDownInit,
}: Props) => {
    const promptLetters = currentWord.split('')
    const textLetters = localText.split('')
    const wordWrapper = (
        <div className="word-wrapper-inner">
            <div className="prompt-wrapper">
                {map(promptLetters, (letter: string, index: number) => (
                    <div
                        className={classNames('letter', {
                            next: index === textLetters.length,
                        })}
                        key={`${letter}-${index}`}
                    >
                        {letter}
                    </div>
                ))}
            </div>
            <div className="text-wrapper">
                {map(textLetters, (letter: string, index: number) => (
                    <div className="letter" key={`${letter}-${index}`}>
                        {letter}
                    </div>
                ))}
            </div>
        </div>
    )
    const translates = [1.25, 4, 6, 8, 10, 13]
    const scales = [2.5, 1.8, 1.3, 1, 0.8, 0]
    return (
        <>
            <Container>
                <Score />
            </Container>
            <Container>
                <div className="typer">
                    <div className="word-wrapper" key={errorTime}>
                        <CSSTransition
                            in={Boolean(errorTime)}
                            classNames="error-input"
                            timeout={500}
                            appear
                        >
                            {wordWrapper}
                        </CSSTransition>
                    </div>
                    <div className="remaining-words">
                        {map(remainingWords, (word: string, index: number) => {
                            const scale = scales[index] || 0
                            const translate = translates[index] || 15
                            return (
                                <div
                                    key={word}
                                    className={classNames(
                                        'remaining-word',
                                        `remaining-word-${index}`
                                    )}
                                    style={{
                                        transform: `translate(0, ${translate}rem) scale(${scale})`,
                                    }}
                                >
                                    {word}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </>
    )
}
export default Typer
