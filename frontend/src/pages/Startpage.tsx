import {Song} from "../model/Song.ts";

export default function Startpage({songList}: {songList: Song[]}){
    return (
        <>
        <h1>ChordMate</h1>
        <div className="song-card">
            <div className="input-box">
                <h2>Song hinzufügen</h2>
            </div>
            <div className={"output-box"}>
                {songList.map((song: Song) => (
                    <div className={"output-content"} key={song.id}>
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