package com.example.backend.model;

import com.example.backend.repository.SongRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class SongIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private SongRepository repository;

    @DirtiesContext
    @Test
    void expectListOfSongs_whenCallingHttpGet() throws Exception {
        repository.save(new Song("1", "Metallica", "Enter Sandman", "Exit Light..."));

        mvc.perform((MockMvcRequestBuilders.get("/api/song")))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """

                        [
                             {
                              "id": "1",
                              "artist": "Metallica",
                              "title": "Enter Sandman",
                              "text": "Exit Light..."
                             }       
                         ]

                        """
                ));
    }

    @DirtiesContext
    @Test
    void postSong_shouldReturnNewSong() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/song")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                             {
                              "artist": "Metallica",
                              "title": "Enter Sandman",
                              "text": "Exit Light..."
                             }       
                        """
                ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                             {
                              "artist": "Metallica",
                              "title": "Enter Sandman",
                              "text": "Exit Light..."
                             }       
                        """
                ))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty());
    }

}