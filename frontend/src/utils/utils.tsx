import React from "react";

export function formatSongText(text: string) {
    const chordRegex = /\[([A-G][#bm]*)\]/g;
    return text.split('\n').map((line, lineIndex) => (
        <p key={lineIndex}>
            {line.split(chordRegex).map((part, partIndex) => (
                chordRegex.test(`[${part}]`)
                    ? <span key={partIndex} className="chord">{part}</span>
                    : part.split(' ').map((word, wordIndex) => (
                        <React.Fragment key={wordIndex}>
                            {word}
                            {wordIndex !== part.split(' ').length - 1 && '\u00A0'}
                        </React.Fragment>
                    ))
            ))}
        </p>
    ));
}