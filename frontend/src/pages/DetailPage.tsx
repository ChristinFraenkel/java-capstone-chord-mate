import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Song } from '../model/Song.ts';
import {formatSongText} from "../utils/utils.tsx";


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
                <a href={"/"} className={"back-btn"}>
                    <button>zurück
                    </button>
                </a>
            </div>
            <p className="artist-paragraph">{song.artist}</p>
            {formatSongText(song.text)}
            <a href={"/"} className={"back-btn"}>
                <button>zurück
                </button>
            </a>
</div>
)
    ;
}
