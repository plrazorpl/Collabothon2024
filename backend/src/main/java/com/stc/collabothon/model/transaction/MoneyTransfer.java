package com.stc.collabothon.model.transaction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.stc.collabothon.model.Account;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class MoneyTransfer extends BankTransaction {
    private Long recipientAccountId;

    public MoneyTransfer(LocalDateTime transactionDate, double amount, String description, Currency currency, Status status, Account account, Account recipientAccount) {
        super(transactionDate, amount, description, currency, status, account, TransactionType.MONEY_TRANSFER);
        this.recipientAccountId = recipientAccount.getId();
    }
}
