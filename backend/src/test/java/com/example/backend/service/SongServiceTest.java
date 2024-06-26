package com.example.backend.service;

import com.example.backend.model.Song;
import com.example.backend.repository.SongRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SongServiceTest {

    SongRepository mockrepo = mock(SongRepository.class);
    IdService mockIdService = mock(IdService.class);
    SongService songService = new SongService(mockrepo, mockIdService);

    @Test
    void getAllSongs_shouldReturn_ListWithElementSong_whenCalled(){
        //GIVEN
        Song newSong = new Song("1", "Metallica", "Enter Sandman", "Exit Light....");
        List<Song> expected = List.of(newSong);

        when(mockrepo.findAll()).thenReturn(expected);

        //THEN
        List<Song> actual = songService.getAllSongs();

        //WHEN
        verify(mockrepo).findAll();
        assertEquals(actual, expected);
    }

    @Test
    void getAllSongs_shouldReturn_enterSandman_whenCalled(){
        //GIVEN
        Song newSong = new Song("Test-Id", "Metallica", "Enter Sandman", "Exit Light....");

        when(mockIdService.randomId()).thenReturn("Test-Id");
        when(mockrepo.save(newSong)).thenReturn(newSong);

        //WHEN
        Song actual = songService.addNewSong(newSong);

        //THEN
        verify(mockIdService).randomId();
        verify(mockrepo).save(newSong);
        assertEquals(actual, newSong);
    }

    @Test
    void getSongById_shouldReturn_enterSandman_whenCalled() {
        // GIVEN
        String songId = "Test-Id";
        Song newSong = new Song(songId, "Metallica", "Enter Sandman", "Exit Light....");

        when(mockrepo.getById(songId)).thenReturn(newSong);

        // WHEN
        Song actual = songService.getById(songId);

        // THEN
        verify(mockrepo).getById(songId);
        assertEquals(actual, newSong);
    }

    @Test
    void deleteSongById_shouldReturn_successMessage_whenSongExists() {
        // GIVEN
        String songId = "Test-Id";
        Song existingSong = new Song(songId, "Metallica", "Enter Sandman", "Exit Light....");

        when(mockrepo.findById(songId)).thenReturn(Optional.of(existingSong));
        doNothing().when(mockrepo).delete(existingSong);

        // WHEN
        String actualMessage = songService.deleteSongById(songId);

        // THEN
        verify(mockrepo).findById(songId);
        verify(mockrepo).delete(existingSong);
        assertEquals(actualMessage, "Song deleted successfully");
    }

    @Test
    void deleteSongById_shouldReturn_notFoundMessage_whenSongDoesNotExist() {
        // GIVEN
        String songId = "Test-Id";

        when(mockrepo.findById(songId)).thenReturn(Optional.empty());

        // WHEN
        String actualMessage = songService.deleteSongById(songId);

        // THEN
        verify(mockrepo).findById(songId);
        verify(mockrepo, never()).delete(any(Song.class));
        assertEquals(actualMessage, "Song not found");
    }

    @Test
    void putSong_shouldReturn_updatedSong_whenCalled() {
        // GIVEN
        String songId = "Test-Id";
        Song updatedSong = new Song(songId, "Metallica", "Enter Sandman", "Exit Light....");

        when(mockrepo.save(updatedSong)).thenReturn(updatedSong);

        // WHEN
        Song actualSong = songService.updateSong(updatedSong, songId);

        // THEN
        verify(mockrepo).save(updatedSong);
        assertEquals(actualSong, updatedSong);
    }

}