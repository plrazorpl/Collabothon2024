package com.stc.collabothon.model.transaction;

import com.stc.collabothon.model.Account;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class CurrencyExchange extends BankTransaction{
    @Enumerated(EnumType.STRING)
    private Currency targetCurrency;
    private double exchangeRate;
    private int originalAmount;
    private int exchangedAmount;

    public CurrencyExchange(LocalDateTime transactionDate, double amount, String description, Currency currency, Status status, Account account, Currency targetCurrency, double exchangeRate, int originalAmount, int exchangedAmount) {
        super(transactionDate, amount, description, currency, status, account, TransactionType.CURRENCY_EXCHANGE);
        this.targetCurrency = targetCurrency;
        this.exchangeRate = exchangeRate;
        this.originalAmount = originalAmount;
        this.exchangedAmount = exchangedAmount;
    }
}
