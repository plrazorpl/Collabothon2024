package com.stc.collabothon.model.offer;

import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class InvestmentOffer extends Offer {

    private double expectedReturnRate;

    @Enumerated(EnumType.STRING)
    private InvestmentType investmentType;

    private double minimumInvestmentAmount;
    private double managementFee;
    private int riskLevel;
    private String stockName;

    public InvestmentOffer(String title, String description, String longDescription, EligibilityCriteria criteria,
                           double expectedReturnRate, InvestmentType investmentType,
                           double minimumInvestmentAmount, double managementFee,
                           int riskLevel, String stockName) {
        super(title, description, longDescription, criteria, OfferType.INVESTMENT);
        this.expectedReturnRate = expectedReturnRate;
        this.investmentType = investmentType;
        this.minimumInvestmentAmount = minimumInvestmentAmount;
        this.managementFee = managementFee;
        this.riskLevel = riskLevel;
        this.stockName = stockName;
    }
}
