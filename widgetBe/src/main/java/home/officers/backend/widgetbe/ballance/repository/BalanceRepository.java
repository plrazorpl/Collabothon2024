package home.officers.backend.widgetbe.ballance.repository;

import home.officers.backend.widgetbe.ballance.model.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BalanceRepository extends JpaRepository<Account, Long> {

    List<Account> findAccountsByCustomerId(Long customerId);

}
