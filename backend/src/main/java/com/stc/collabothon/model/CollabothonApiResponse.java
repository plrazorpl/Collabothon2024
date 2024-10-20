package com.stc.collabothon.model;

import lombok.Getter;

@Getter
public class CollabothonApiResponse<T> {
    private final boolean success;
    private String message;
    private T response;
    public CollabothonApiResponse(boolean success, T response, String message) {
        this.success = success;
        this.message = message;
        this.response = response;
    }

    public CollabothonApiResponse(boolean success, T response) {
        this.response = response;
        this.success = success;
    }

    public CollabothonApiResponse(boolean success, String message) {
        this.message = message;
        this.success = success;
    }
}
