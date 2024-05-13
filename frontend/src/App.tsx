import './App.css'
import Startpage from "./pages/Startpage.tsx";
import {useEffect, useState} from "react";
import {Song} from "./model/Song.ts";
import axios from "axios";

function App() {
    const[songList, setSongList] = useState<Song[]>([]);

    const[newSong, setNewSong] = useState<Song>({
        artist : "",
        title : "",
        text : ""
    });

    function fetchSongs(){
        axios.get('/api/song')
            .then((response) => {
                setSongList(response.data);
            })
    }

    useEffect(() => {
        fetchSongs();
    }, [newSong])

    useEffect(() => {
        fetchSongs();
    }, [])


  return (
    <>
      <Startpage songList={songList} newSong={newSong} setNewSong={setNewSong} />
    </>
  )
}

export default App
