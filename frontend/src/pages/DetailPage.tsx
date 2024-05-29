import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Song } from '../model/Song.ts';
import {formatSongText} from "../utils/utils.tsx";

export default function DetailPage() {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);

    const [editing, setEditing] = useState(false);
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        if (song) {
            axios.put("/api/song/" + song.id, { artist, title, text })
                .then(response => {
                    setSong(response.data);
                })
                .catch(error => {
                    console.error('Fehler beim Speichern des Songs:', error);
                });
        }
    };

    useEffect(() => {
        axios.get(`/api/song/${id}`)
            .then(response => {
                setSong(response.data);
            })
            .catch(error => {
                console.error('Fehler beim Laden des Songs:', error);
            });
    }, [id]);

    useEffect(() => {
        if (song) {
            setArtist(song.artist);
            setTitle(song.title);
            setText(song.text);
        }
    }, [song]);

    // Loading
    if (!song) {
        return <p>Ups, da ist wohl etwas schief gelaufen.</p>;
    }

    return (
        <div className="song-content">
            <div>
                {editing ? (
                    <div className={"edit-input-box"}>
                        <input type={"text"} value={artist} onChange={(newArtist) => setArtist(newArtist.target.value)} />
                        <input type={"text"} value={title} onChange={(newTitle) => setTitle(newTitle.target.value)} />
                        <textarea value={text} cols={100} rows={100} onChange={(newText) => setText(newText.target.value)} />
                        <button onClick={handleSave}>💾</button>
                    </div>
                ) : (
                    <div>
                        <div className="title-btn-box">

                            <a href={"/"} className={"back-btn"}>
                                <button>zurück</button>
                            </a>
                        </div>
                        <button onClick={handleEdit} className={"edit-btn"}>✏️</button>
                        <h2>{song.title}</h2>
                        <p className="artist-paragraph">{song.artist}</p>
                        {formatSongText(song.text)}
                        <button onClick={handleEdit}>✏️</button>
                    </div>
                )}
            </div>
            <a href={"/"} className={"back-btn"}>
                <button>zurück</button>
            </a>
        </div>
    );
}
