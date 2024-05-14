import {Song} from "../model/Song.ts";
import axios from "axios";
import {ChangeEvent, FormEvent} from "react";

export default function Startpage({songList, newSong, setNewSong}: { songList: Song[], newSong: Song, setNewSong: (song: Song) => void }){



    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        axios.post("/api/song", newSong)
            .then((response) => {console.log(response)})
            .catch((error) => {console.log(error.message)})
        setNewSong({artist : "", title : "", text : ""})
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        setNewSong({...newSong, [key]: event.target.value})
    }function handleOnTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
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
                {songList.map((song: Song, index) => (
                    <div className={"output-content"} key={index}>
                        <h3>{song.title}</h3>
                        <p className={"artist-paragraph"}>{song.artist}</p>
                        <p>{song.text}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}