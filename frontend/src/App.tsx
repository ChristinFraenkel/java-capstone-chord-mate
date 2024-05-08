import './App.css'
import Startpage from "./pages/Startpage.tsx";
import {useEffect, useState} from "react";
import {Song} from "./model/Song.ts";
import axios from "axios";

function App() {
    const[songList, setSongList] = useState<Song[]>([]);

    function fetchSongs(){
        axios.get('/api/song')
            .then((response) => {
                setSongList(response.data);
            })
    }

    useEffect(() => {
        fetchSongs();
    }, [])

  return (
    <>
      <Startpage songList={songList} />
    </>
  )
}

export default App
