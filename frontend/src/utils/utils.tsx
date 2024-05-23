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

export function extractChords(text: string): string[] {
    const chordRegex = /\[([A-G][#bm]*)\]/g;
    const chords = new Set<string>();
    let match;
    while ((match = chordRegex.exec(text)) !== null) {
        chords.add(match[1]);
        console.log('test');
    }
    return Array.from(chords);
}
