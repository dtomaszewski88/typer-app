import React from 'react'
import { map } from 'lodash'
import classNames from 'classnames'
import './remaining-words.scss'
import WordProgress from './WordPreview'

interface Props {
    localText: string
    remainingWords: [string?]
    playerCurrentWords: Object
}

const RemainingWords = ({
    localText,
    remainingWords,
    playerCurrentWords,
}: Props) => {
    const translates = [1.25, 4, 6, 8, 10, 13]
    const scales = [2.5, 1.8, 1.3, 1, 0.8, 0]

    return (
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
                        <WordProgress
                            currentText={localText}
                            targetWord={word}
                            wordProgress={playerCurrentWords}
                        />
                    </div>
                )
            })}
        </div>
    )
}
export default RemainingWords
