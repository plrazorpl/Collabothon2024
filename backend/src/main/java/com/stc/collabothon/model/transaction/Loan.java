package com.stc.collabothon.model.transaction;

import com.stc.collabothon.model.Account;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

public class Loan extends BankTransaction{
    private double interestRate;
    private double loanAmount;
    private int loanDuration;

    public Loan(LocalDateTime transactionDate, double amount, String description, Currency currency, Status status, Account account, double interestRate, double loanAmount, int loanDuration) {
        super(transactionDate, amount, description, currency, status, account, TransactionType.LOAN);
        this.interestRate = interestRate;
        this.loanAmount = loanAmount;
        this.loanDuration = loanDuration;
    }
}
