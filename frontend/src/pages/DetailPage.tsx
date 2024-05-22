import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Song } from '../model/Song.ts';


export default function DetailPage() {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        axios.get(`/api/song/${id}`)
            .then(response => {
                setSong(response.data);
            })
            .catch(error => {
                console.error('Fehler beim Laden des Songs:', error);
            });
    }, []);

    // Loading
    if (!song) {
        return <p>Ups, da ist wohl etwas schief gelaufen.</p>;
    }

    return (
        <div className="song-content">
            <div className="title-btn-box">
            <h2>{song.title}</h2>
            <button><a href={"/"} className={"back-btn"}>zurück</a></button>
            </div>
            <p className="artist-paragraph">{song.artist}</p>
            {song.text.split('\n').map((line, index) => (
                <p key={index}>{line.replace(/ /g, '\u00A0')}</p>
            ))}
            <button><a href={"/"} className={"back-btn"}>zurück</a></button>
        </div>
    );
}
