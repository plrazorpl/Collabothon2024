package com.stc.collabothon.model.transaction;

import com.stc.collabothon.model.Account;
import com.stc.collabothon.model.offer.InvestmentType;
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
public class Investment extends BankTransaction{
    @Enumerated(EnumType.STRING)
    private InvestmentType investmentType;

    private double managementFee;
    private String stockName;

    public Investment(LocalDateTime transactionDate, double amount, String description, Currency currency, Status status, Account account, InvestmentType investmentType, double managementFee, String stockName) {
        super(transactionDate, amount, description, currency, status, account, TransactionType.INVESTMENT);
        this.investmentType = investmentType;
        this.managementFee = managementFee;
        this.stockName = stockName;
    }
}
