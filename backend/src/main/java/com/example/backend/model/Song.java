package com.example.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Song {
    private final String id;
    private final String artist;
    private final String title;
    private final String text;
}
