import './App.css';
import Startpage from "./pages/Startpage";
import { useEffect, useState } from "react";
import { Song } from "./model/Song";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";

function App() {
    const [songList, setSongList] = useState<Song[]>([]);

    const [newSong, setNewSong] = useState<Song>({
        id: "",
        artist: "",
        title: "",
        text: ""
    });

    function fetchSongs() {
        axios.get('/api/song')
            .then((response) => {
                setSongList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching songs:', error);
            });
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Startpage songList={songList} newSong={newSong} setNewSong={setNewSong} fetchSongs={fetchSongs} />} />
                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
        </>
    );
}

export default App;
