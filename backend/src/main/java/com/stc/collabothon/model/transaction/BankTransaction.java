package com.stc.collabothon.model.transaction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.stc.collabothon.model.Account;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BankTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_id_seq")
    @SequenceGenerator(name = "transaction_id_seq", sequenceName = "transaction_id_SEQ", allocationSize = 1)
    private Long id;

    private LocalDateTime transactionDate;
    private double amount;
    private String description;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    @JsonBackReference
    private Account account;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;


    public BankTransaction(LocalDateTime transactionDate, double amount, String description, Currency currency, Status status, Account account, TransactionType transactionType) {
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.currency = currency;
        this.status = status;
        this.account = account;
        this.transactionType = transactionType;
    }
}
