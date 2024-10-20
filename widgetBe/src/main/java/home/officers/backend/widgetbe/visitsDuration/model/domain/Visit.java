package home.officers.backend.widgetbe.visitsDuration.model.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "visit")
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "customer_id", nullable = false)
    private Long customerId;
    @Column(name = "visit_date", nullable = false)
    private LocalDateTime visitDate;
    @Column(name = "visit_duration", nullable = false)
    private int visitDuration;
}
