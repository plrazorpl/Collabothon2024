package com.stc.collabothon.controllers;

import com.stc.collabothon.model.Account;
import com.stc.collabothon.model.CollabothonApiResponse;
import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import com.stc.collabothon.model.offer.Offer;
import com.stc.collabothon.repo.AccountRepository;
import com.stc.collabothon.services.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/offers")
public class OfferController {

    private final AccountRepository accountRepository;
    private final OfferService offerService;

    @Autowired
    public OfferController(AccountRepository accountRepository, OfferService offerService) {
        this.accountRepository = accountRepository;
        this.offerService = offerService;
    }

    @GetMapping
    public List<Offer> getAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        return offer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get offers by EligibilityCriteria (Example: /api/offers/criteria/MIDDLE_INCOME)
    @GetMapping("/criteria/{criteria}")
    public List<Offer> getOffersByEligibilityCriteria(@PathVariable EligibilityCriteria criteria) {
        return offerService.getOffersByEligibility(criteria);
    }

    @PostMapping
    public Offer createOffer(@RequestBody Offer offer) {
        return offerService.saveOffer(offer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable Long id, @RequestBody Offer updatedOffer) {
        Optional<Offer> existingOffer = offerService.getOfferById(id);

        if (existingOffer.isPresent()) {
            updatedOffer.setId(id); // Ensure the ID is set for update
            return ResponseEntity.ok(offerService.saveOffer(updatedOffer));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        Optional<Offer> offer = offerService.getOfferById(id);

        if (offer.isPresent()) {
            offerService.deleteOfferById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/recommendations/{accountId}")
    public ResponseEntity<CollabothonApiResponse<List<Offer>>> getOfferRecommendations(@PathVariable Long accountId) {

        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Offer> recommendedOffers = offerService.getRecommendedOffersByAccount(account.get());
        CollabothonApiResponse<List<Offer>> response = new CollabothonApiResponse<>(true, recommendedOffers, "Recommended offers found successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}


