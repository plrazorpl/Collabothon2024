package com.stc.collabothon.services;

import com.stc.collabothon.algorithm.OfferRecommendationsAlgorithm;
import com.stc.collabothon.model.Account;
import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import com.stc.collabothon.model.offer.Offer;
import com.stc.collabothon.repo.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final OfferRecommendationsAlgorithm offerRecommendationsAlgorithm;

    @Autowired
    public OfferService(OfferRepository offerRepository, OfferRecommendationsAlgorithm offerRecommendationsAlgorithm) {
        this.offerRepository = offerRepository;
        this.offerRecommendationsAlgorithm = offerRecommendationsAlgorithm;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Optional<Offer> getOfferById(Long id) {
        return offerRepository.findById(id);
    }

    public Offer saveOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public void deleteOfferById(Long id) {
        offerRepository.deleteById(id);
    }

    public List<Offer> getOffersByEligibility(EligibilityCriteria criteria) {
        return offerRepository.findAll()
                .stream()
                .filter(offer -> offer.getEligibilityCriteria().equals(criteria))
                .toList();
    }

    public List<Offer> getRecommendedOffersByAccount(Account account) {
        return offerRecommendationsAlgorithm.getRecommendedOffersForAccount(account);
    }
}
