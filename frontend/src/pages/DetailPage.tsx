import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Song } from '../model/Song.ts';

export default function DetailPage() {
    const { id } = useParams(); // Die ID aus der URL abrufen
    const [song, setSong] = useState<Song | null>(null); // Zustand für den geladenen Song

    useEffect(() => {
        // Daten für den Song mit der entsprechenden ID abrufen
        axios.get(`/api/song/${id}`)
            .then(response => {
                setSong(response.data); // Setze den geladenen Song im Zustand
            })
            .catch(error => {
                console.error('Fehler beim Laden des Songs:', error);
            });
    }, []); // Diese Effektfunktion wird immer dann neu ausgeführt, wenn sich die ID ändert

    // Wenn der Song noch nicht geladen wurde, zeige eine Ladeanzeige an
    if (!song) {
        return <p>Kein Song gefunden</p>;
    }
    console.log(song)
    return (
        <div className="song-content">
            <h2>{song.title}</h2>
            <p className="artist-paragraph">{song.artist}</p>
            {song.text.split('\n').map((line, index) => (
                <p key={index}>{line.replace(/ /g, '\u00A0')}</p>
            ))}
        </div>
    );
}
