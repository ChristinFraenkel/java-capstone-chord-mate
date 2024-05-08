package com.example.backend.controller;
import com.example.backend.model.Song;
import com.example.backend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
