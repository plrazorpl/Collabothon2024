package com.stc.collabothon.util;

import com.stc.collabothon.model.ServerDowntime;
import com.stc.collabothon.repo.ServerDowntimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ServerDowntimeInitializer implements CommandLineRunner {

    @Autowired
    private ServerDowntimeRepository serverDowntimeRepository;

    @Override
    public void run(String... args) throws Exception {

        ServerDowntime serverDowntime = ServerDowntime.builder()
                .title("Server downtime - October")
                .description("The Customer Portal will be unavailable on October 25th, from 03:00 to 05:00 CEST, due to scheduled maintenance")
                .downtimeStart(LocalDateTime.of(2024, 10, 25, 3, 0))
                .downtimeEnd(LocalDateTime.of(2024, 10, 25, 5, 0))
                .build();
        serverDowntimeRepository.save(serverDowntime);

    }
}
