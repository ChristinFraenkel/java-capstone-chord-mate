package com.example.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Song {
    private String id;
    private String title;
    private String artist;
    private String text;
}
