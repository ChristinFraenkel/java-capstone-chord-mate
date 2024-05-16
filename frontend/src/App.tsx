import './App.css'
import Startpage from "./pages/Startpage.tsx";
import {useEffect, useState} from "react";
import {Song} from "./model/Song.ts";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import DetailPage from "./pages/DetailPage.tsx";

function App() {
    const[songList, setSongList] = useState<Song[]>([]);

    const[newSong, setNewSong] = useState<Song>({
        id: "",
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
    }, [songList])

    useEffect(() => {
        fetchSongs();
    }, [])


  return (
    <>
      {/*<Startpage songList={songList} newSong={newSong} setNewSong={setNewSong} />*/}
        <Routes>
            <Route path={"/"} element={<Startpage songList={songList} newSong={newSong} setNewSong={setNewSong}/>} />
            <Route path={"/detail/:id"} element={<DetailPage />} />
        </Routes>
    </>
  )
}

export default App
