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
    private final IdService idService;

    public List<Song> getAllSongs(){
        return repo.findAll();
    }

    public Song addNewSong(Song newSong) {
        String newId = idService.randomId();
        Song song = new Song(
                newId,
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
