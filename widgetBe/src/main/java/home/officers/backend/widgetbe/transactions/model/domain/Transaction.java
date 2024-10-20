package home.officers.backend.widgetbe.transactions.model.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "customer_id", nullable = false)
    private Long customerID;
    @Column(name = "transaction_type", nullable = false)
    private String transactionType;
    @Column(name = "transaction_value", nullable = false)
    private Double transactionValue;
    @Column(name = "currency_code", nullable = false)
    private String currencyCode;
    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;
}
