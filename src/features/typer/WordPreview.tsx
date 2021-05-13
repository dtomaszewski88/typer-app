import React from 'react'
import { map } from 'lodash'
import classNames from 'classnames'
import './word-preview.scss'

interface Props {
    currentText?: string
    targetWord: string
    wordProgress: Object
}

const WordPreview = ({ currentText, targetWord, wordProgress }: Props) => {
    const promptLetters = targetWord.split('')
    return (
        <div className="word-preview">
            {map(promptLetters, (letter: string, index: number) => (
                <div
                    className={classNames('letter', {
                        next: index === currentText?.length,
                    })}
                    key={`${letter}-${index}`}
                >
                    <span>{letter}</span>
                    <div className="progress-wrap">
                        {map(wordProgress, (progress, playerId) => {
                            if (
                                progress.currentWord === targetWord &&
                                progress.currentWordProgress === index
                            ) {
                                return (
                                    <div
                                        className="progress-bar"
                                        id={playerId}
                                        key={playerId}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default WordPreview
