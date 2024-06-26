package com.example.backend.controller;
import com.example.backend.model.Song;
import com.example.backend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/song")
@RequiredArgsConstructor
public class SongController {

    private final SongService service;

    @GetMapping
    public List<Song> getAllSongs(){
        return service.getAllSongs();
    }

    @PostMapping
    public Song addNewSong(@RequestBody Song newSong) {

        return service.addNewSong(newSong);
    }

    @GetMapping("{id}")
    Song getSongById(@PathVariable String id) {
        return service.getById(id);
    }

    @DeleteMapping("{id}")
    public String deleteSongById(@PathVariable String id) {
        return service.deleteSongById(id);
    }

    @PutMapping("{id}")
    public Song putSong(@RequestBody Song song, @PathVariable String id) {
        return service.updateSong(song, id);
    }
}
