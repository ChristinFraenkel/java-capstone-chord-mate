import {Song} from "../model/Song.ts";
import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";
import {Link} from "react-router-dom";

export default function Startpage({songList, newSong, setNewSong}: { songList: Song[], newSong: Song, setNewSong: (song: Song) => void }){

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        axios.post("/api/song", newSong)
            .then((response) => {console.log(response)})
            .catch((error) => {console.log(error.message)})
        setNewSong({id: "", artist : "", title : "", text : ""})
    }

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        setNewSong({...newSong, [key]: event.target.value})
    }

    function handleOnTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const key = event.target.name
        setNewSong({...newSong, [key]: event.target.value})
    }

    return (
        <>
        <h1>ChordMate</h1>
        <div className="song-card">
            <div className="input-box">
                <h2>Song hinzufügen</h2>
                <div className={"form-box"}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" id="title" placeholder={"Titel"} onChange={handleOnChange} value={newSong.title}/>
                        <input type="text" name="artist" id="artist" placeholder={"Künstler"} onChange={handleOnChange}
                               value={newSong.artist}/>
                        <textarea name="text" id="text" placeholder={"Songtext"} rows={10} cols={50} onChange={handleOnTextareaChange}
                               value={newSong.text}/>
                        <button type={"submit"}>hinzufügen</button>
                    </form>
                </div>
            </div>
            <div className={"output-box"}>
                {songList.map((song: Song) => (
                    <div className={"output-content"} key={song.id}>
                        <h3>{song.title}</h3>
                        <p className={"artist-paragraph"}>{song.artist}</p>
                        {song.text.split('\n').map((line, i) => (
                            <p key={i}>{line.replace(/ /g, '\u00A0')}</p>
                        ))}
                        <p>
                            {isExpanded
                                ? song.text
                                : `${song.text.substring(0, 20)}...`}{' '}
                            <Link to={`/detail/${song.id}`}>
                                {isExpanded ? ' Weniger anzeigen' : ' Mehr anzeigen'}
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}