import React from 'react'
import { InputGroup, FormControl, Container, Button } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { map } from 'lodash'

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

const TyperDebug = ({
    score,
    status,
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
    console.log('localText', localText)
    console.log('remainingWords', remainingWords)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        updateLocalText(newValue)
    }
    const handleConnect = (e) => {
        console.log('handleConnect', e)
    }
    const handleAddToQueue = (e) => {
        console.log('handleAddToQueue', e)
    }
    const handleReady = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { target } = e
        console.log('handleStart', (target as HTMLButtonElement).blur())
        countDownInit(1)
    }
    const promptLetters = currentWord.split('')
    const textLetters = localText.split('')
    const wordWrapper = (
        <div className="word-wrapper">
            <div className="prompt-wrapper">
                {map(promptLetters, (letter: string) => (
                    <div className="letter">{letter}</div>
                ))}
            </div>
            <div className="text-wrapper">
                {map(textLetters, (letter: string) => (
                    <div className="letter">{letter}</div>
                ))}
            </div>
        </div>
    )
    return (
        <>
            <Container>
                <h1>Count Down: {countDown}</h1>
                <h1>Status: {status}</h1>
                <h1>Score: {score}</h1>
                <h1>Errors: {errors}</h1>
                <h1>Error Time: {errorTime}</h1>
                <h1>Current Word: {currentWord}</h1>
                <h1>Local Text: {localText}</h1>
                <h1>Remote Text: {remoteText}</h1>
            </Container>
            <Container>
                <Button variant="primary" onClick={handleConnect}>
                    Connect
                </Button>{' '}
                <Button variant="secondary" onClick={handleAddToQueue}>
                    Add To queue
                </Button>{' '}
                <Button variant="success" onClick={handleReady}>
                    Ready
                </Button>{' '}
            </Container>

            <Container>
                {map(remainingWords, (word: string) => {
                    return <h2 key={word}>{word}</h2>
                })}
            </Container>
        </>
    )
}
export default TyperDebug
