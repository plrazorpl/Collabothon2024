package home.officers.backend.widgetbe.customer.repository;

import home.officers.backend.widgetbe.customer.model.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
