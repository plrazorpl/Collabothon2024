package home.officers.backend.widgetbe.transactions.repository;

import home.officers.backend.widgetbe.transactions.model.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<List<Transaction>> findAllByCustomerID(Long id);
}
