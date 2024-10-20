package com.stc.collabothon.controllers;

import com.stc.collabothon.model.CollabothonApiResponse;
import com.stc.collabothon.model.ServerDowntime;
import com.stc.collabothon.services.ServerDowntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/server-downtimes")
public class ServerDowntimeController {

    private final ServerDowntimeService serverDowntimeService;

    @Autowired
    public ServerDowntimeController(ServerDowntimeService serverDowntimeService) {
        this.serverDowntimeService = serverDowntimeService;
    }

    @GetMapping("/upcoming")
    public ResponseEntity<CollabothonApiResponse<ServerDowntime>> getUpcomingServerDowntime() {

        ServerDowntime upcoming = this.serverDowntimeService.getUpcomingServerDowntime();
        if (upcoming == null) {
            return ResponseEntity.notFound().build();
        }
        CollabothonApiResponse<ServerDowntime> response = new CollabothonApiResponse<>(true, upcoming, "Server downtime found successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);



    }
}
