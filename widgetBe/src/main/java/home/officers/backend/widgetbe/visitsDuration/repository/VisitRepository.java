package home.officers.backend.widgetbe.visitsDuration.repository;

import home.officers.backend.widgetbe.visitsDuration.model.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {

    Optional<List<Visit>> findAllByCustomerId(Long customerId);

    Optional<Visit> findByVisitDate(LocalDate visitDate);

}
