package com.example.backend.service;

import com.example.backend.model.Song;
import com.example.backend.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository repo;

    public List<Song> getAllSongs(){
        return repo.findAll();
    }

    public Song addNewSong(Song newSong) {
        Song song = new Song(
                newSong.getId(),
                newSong.getArtist(),
                newSong.getTitle(),
                newSong.getText()
                );

        repo.save(song);
        return song;
    }

    public Song getById(String id) {
        return repo.getById(id);
    }
}
