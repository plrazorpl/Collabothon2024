package com.stc.collabothon.model.offer;

import com.stc.collabothon.model.offer.criteria.AgeCriteria;
import com.stc.collabothon.model.offer.criteria.CompanySizeCriteria;
import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "offer_id_seq")
    @SequenceGenerator(name = "offer_id_seq", sequenceName = "offer_id_SEQ", allocationSize = 1)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "eligibility_criteria")
    private EligibilityCriteria eligibilityCriteria;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_criteria")
    private AgeCriteria ageCriteria;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_size_criteria")
    private CompanySizeCriteria companySizeCriteria;

    @Enumerated(EnumType.STRING)
    private OfferType offerType;
    @Column(columnDefinition = "TEXT")
    private String longDescription;

    public Offer(String title, String description, String longDescription ,EligibilityCriteria eligibilityCriteria, OfferType offerType) {
        this.title = title;
        this.description = description;
        this.eligibilityCriteria = eligibilityCriteria;
        this.offerType = offerType;
        this.longDescription = longDescription;
    }
}
