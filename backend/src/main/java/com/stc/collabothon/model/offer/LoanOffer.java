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
public class LoanOffer extends Offer {
    private double interestRate;
    private double loanAmount;
    private int loanTermMonths;


    public LoanOffer(String title, String description, String longDescription, EligibilityCriteria criteria,
                     double interestRate, double loanAmount, int loanTermMonths) {
        super(title, description, longDescription,criteria, OfferType.LOAN);
        this.interestRate = interestRate;
        this.loanAmount = loanAmount;
        this.loanTermMonths = loanTermMonths;
    }
}
