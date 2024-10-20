package com.stc.collabothon.services;

import com.stc.collabothon.model.ServerDowntime;
import com.stc.collabothon.repo.ServerDowntimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ServerDowntimeService {

    private final ServerDowntimeRepository serverDowntimeRepository;

    @Autowired
    public ServerDowntimeService(ServerDowntimeRepository serverDowntimeRepository) {
        this.serverDowntimeRepository = serverDowntimeRepository;
    }

    public ServerDowntime getUpcomingServerDowntime() {

        List<ServerDowntime> serverDowntimes = serverDowntimeRepository.findAll();
        Optional<ServerDowntime> nextDowntime = serverDowntimes.stream()
                .filter(downtime -> downtime.getDowntimeStart().isAfter(LocalDateTime.now()))
                .findFirst();
        return nextDowntime.orElse(null);


    }
}
