import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Song } from "../model/Song.ts";
import { formatSongText, extractChords } from "../utils/utils.tsx";

export default function Startpage({ songList, newSong, setNewSong }: { songList: Song[], newSong: Song, setNewSong: (song: Song) => void }) {

    const [filter, setFilter] = useState<string>("");
    const [chordFilter, setChordFilter] = useState<string[]>([]);

    // Funktion, um alle einzigartigen Chords zu extrahieren
    const getAllChords = (songs: Song[]): string[] => {
        const allChords = new Set<string>();
        songs.forEach(song => {
            extractChords(song.text).forEach(chord => allChords.add(chord));
        });
        return Array.from(allChords);
    };

    const allChords = getAllChords(songList);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/song", newSong)
            .then((response) => { console.log(response); })
            .catch((error) => { console.log(error.message); });
        setNewSong({ id: "", artist: "", title: "", text: "" });
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name;
        setNewSong({ ...newSong, [key]: event.target.value });
    }

    function handleOnTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const key = event.target.name;
        setNewSong({ ...newSong, [key]: event.target.value });
    }

    const handleChordFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const chord = event.target.value;
        setChordFilter(prev =>
            prev.includes(chord) ? prev.filter(c => c !== chord) : [...prev, chord]
        );
    };

    const filteredSongList = songList.filter((song) => {
        const chords = extractChords(song.text);
        return (song.title.toLowerCase().includes(filter.toLowerCase()) ||
                song.artist.toLowerCase().includes(filter.toLowerCase()) ||
                song.text.toLowerCase().includes(filter.toLowerCase())) &&
            (chordFilter.length === 0 || chordFilter.every(chord => chords.includes(chord)));
    });

    return (
        <>
            <h1>ChordMate</h1>
            <div className="song-card">
                <div className="input-box">
                    <h2>Song hinzufügen</h2>
                    <div className={"form-box"}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="title" id="title" placeholder={"Titel"} onChange={handleOnChange} value={newSong.title} />
                            <input type="text" name="artist" id="artist" placeholder={"Künstler"} onChange={handleOnChange}
                                   value={newSong.artist} />
                            <textarea name="text" id="text" placeholder={"Songtext: Akkorde bitte mit eckigen Klammern einfügen -> [G]"} rows={10} cols={50} onChange={handleOnTextareaChange}
                                      value={newSong.text} />
                            <button type={"submit"}>hinzufügen</button>
                        </form>
                    </div>
                </div>
                <div className={"output-box"}>
                    <div className="filter-box">
                        {allChords.map(chord => (
                            <label key={chord}>
                                <input
                                    type="checkbox"
                                    value={chord}
                                    onChange={handleChordFilterChange}
                                />
                                {chord}
                            </label>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Suche nach Titel, Künstler oder Songtext"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {filteredSongList.map((song: Song) => (
                        <div className={"output-content"} key={song.id}>
                            <h3>{song.title}</h3>
                            <p className={"artist-paragraph"}>{song.artist}</p>
                            <div>
                                {formatSongText(song.text).slice(0, 10)}{'...'}
                            </div>
                            <Link to={`/detail/${song.id}`} >
                                <button>Mehr anzeigen</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
