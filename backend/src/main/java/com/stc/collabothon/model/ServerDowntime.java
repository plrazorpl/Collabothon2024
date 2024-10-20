package com.stc.collabothon.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "server_downtimes")
public class ServerDowntime {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "server_downtime_id_seq")
    @SequenceGenerator(name = "server_downtime_id_seq", sequenceName = "server_downtime_id_SEQ", allocationSize = 1)
    private Long id;

    private String title;

    private String description;

    @Column(name = "downtime_start")
    private LocalDateTime downtimeStart;
    @Column(name = "downtime_end")
    private LocalDateTime downtimeEnd;
}
