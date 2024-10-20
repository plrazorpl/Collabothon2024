package com.stc.collabothon.algorithm;

import com.stc.collabothon.model.Account;
import com.stc.collabothon.model.client.CorporateClient;
import com.stc.collabothon.model.client.NaturalPerson;
import com.stc.collabothon.model.offer.criteria.AgeCriteria;
import com.stc.collabothon.model.offer.criteria.CompanySizeCriteria;
import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import com.stc.collabothon.model.offer.Offer;
import com.stc.collabothon.services.OfferService;
import com.stc.collabothon.storage.MembershipFunctionStorage;
import fuzzy4j.sets.FuzzyFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class OfferRecommendationsAlgorithm {

    private final MembershipFunctionStorage membershipFunctionStorage;;

    private final int numberOfRecommendations;
    private final OfferService offerService;


    @Autowired
    public OfferRecommendationsAlgorithm(MembershipFunctionStorage membershipFunctionStorage,
                                         @Value("${offer.recommendations.amount}") int numberOfRecommendations, @Lazy OfferService offerService) {
        this.membershipFunctionStorage = membershipFunctionStorage;
        this.numberOfRecommendations = numberOfRecommendations;
        this.offerService = offerService;
    }

    public List<Offer> getRecommendedOffersForAccount(Account account) {
        boolean isIndividual = account.isIndividual();
        return isIndividual ?
                getRecommendedOffersForIndividualAccount(account, membershipFunctionStorage.getIndividualFinancialStatusMembershipFunction()) :
                getRecommendedOffersForCorporateAccount(account, membershipFunctionStorage.getCorporateFinancialStatusMembershipFunction());

    }

    private List<Offer> getRecommendedOffersForIndividualAccount(Account account, Map<EligibilityCriteria, FuzzyFunction> eligibilityCriteriaMap) {
        double accountBalance = account.getBalanceAmount();
        NaturalPerson naturalPerson = (NaturalPerson) account.getClient();
        Map<EligibilityCriteria, Double> accountMembershipMap = new HashMap<>();
        Map<AgeCriteria, Double> ageMembershipMap = new HashMap<>();
        for (Map.Entry<EligibilityCriteria, FuzzyFunction> entry : eligibilityCriteriaMap.entrySet()) {
            accountMembershipMap.put(entry.getKey(), entry.getValue().apply(accountBalance));
        }

        for (Map.Entry<AgeCriteria, FuzzyFunction> entry : membershipFunctionStorage.getAgeMembershipFunction().entrySet()) {
            ageMembershipMap.put(entry.getKey(), entry.getValue().apply(naturalPerson.getAge()));
        }
        System.out.println(accountMembershipMap);
        return getOffersByMembershipAndAgeMap(accountMembershipMap, ageMembershipMap);
    }

    private List<Offer> getOffersByMembershipAndAgeMap(Map<EligibilityCriteria, Double> accountMembershipMap, Map<AgeCriteria, Double> ageMembershipMap) {
        List<Offer> offers = new ArrayList<>();
        double sum = accountMembershipMap.values().stream().mapToDouble(Double::doubleValue).sum();
        for (Map.Entry<EligibilityCriteria, Double> entry : accountMembershipMap.entrySet()) {
            if (offers.size() == numberOfRecommendations) {
                break;
            }
            if (entry.getValue() == 0.0) {
                continue;
            }
            int numberOfOffersFromCriteria = (int) Math.round(numberOfRecommendations * entry.getValue() / sum);
            System.out.println("Fetching " + numberOfOffersFromCriteria + " offers from criteria: " + entry.getKey());
            List<Offer> criteriaOffers = new ArrayList<>(offerService.getOffersByEligibility(entry.getKey()));
            System.out.println("CRITERIA OFFERS SIZE: " + criteriaOffers.size());
            if (criteriaOffers.isEmpty()) {
                continue;
            }
            Collections.shuffle(criteriaOffers);
            for (int i = 0; i < numberOfOffersFromCriteria; i++) {
                Offer offer = criteriaOffers.get(i);
                System.out.println("OFFER "+ offer.getAgeCriteria());
                if (offer.getAgeCriteria() != null) {
                    System.out.println("AGE MEMBERSHIP MAP "+ ageMembershipMap);
                    System.out.println("AgeCriteriaType: " + offer.getAgeCriteria().getClass().getSimpleName());
                    double ageMembership = ageMembershipMap.get(offer.getAgeCriteria());
                    if (ageMembership > 0.0) {
                        offers.add(offer);
                    } else {
                        numberOfOffersFromCriteria++;
                    }
                } else if (offer.getCompanySizeCriteria() == null){
                    offers.add(offer);
                } else {
                    numberOfOffersFromCriteria++;
                }
            }

        }
        return offers;
    }

    private List<Offer> getOffersByMembershipAndCompanySizeMap(Map<EligibilityCriteria, Double> accountMembershipMap, Map<CompanySizeCriteria, Double> companySizeMembershipMap) {
        List<Offer> offers = new ArrayList<>();
        double sum = accountMembershipMap.values().stream().mapToDouble(Double::doubleValue).sum();
        for (Map.Entry<EligibilityCriteria, Double> entry : accountMembershipMap.entrySet()) {
            if (offers.size() == numberOfRecommendations) {
                break;
            }
            if (entry.getValue() == 0.0) {
                continue;
            }
            int numberOfOffersFromCriteria = (int) Math.round(numberOfRecommendations * entry.getValue() / sum);
            System.out.println("Fetching " + numberOfOffersFromCriteria + " offers from criteria: " + entry.getKey());
            List<Offer> criteriaOffers = new ArrayList<>(offerService.getOffersByEligibility(entry.getKey()));
            System.out.println("CRITERIA OFFERS SIZE: " + criteriaOffers.size());
            if (criteriaOffers.isEmpty()) {
                continue;
            }
            Collections.shuffle(criteriaOffers);
            for (int i = 0; i < numberOfOffersFromCriteria; i++) {
                Offer offer = criteriaOffers.get(i);
                System.out.println("OFFER "+ offer.getCompanySizeCriteria());
                if (offer.getCompanySizeCriteria() != null) {
                    System.out.println("Company size MAP "+ companySizeMembershipMap);
                    double companySizeMembership = companySizeMembershipMap.get(offer.getCompanySizeCriteria());
                    if (companySizeMembership > 0.0) {
                        offers.add(offer);
                    } else {
                        numberOfOffersFromCriteria++;
                    }
                    // todo dont take individual offers
                } else if (offer.getAgeCriteria() == null){
                    offers.add(offer);
                } else {
                    numberOfOffersFromCriteria++;
                }
            }

        }
        return offers;
    }

    private List<Offer> getRecommendedOffersForCorporateAccount(Account account, Map<EligibilityCriteria, FuzzyFunction> eligibilityCriteriaMap) {
        double accountBalance = account.getBalanceAmount();
        CorporateClient corporateClient = (CorporateClient) account.getClient();
        Map<EligibilityCriteria, Double> accountMembershipMap = new HashMap<>();
        Map<CompanySizeCriteria, Double> companySizeMembershipMap = new HashMap<>();
        for (Map.Entry<EligibilityCriteria, FuzzyFunction> entry : eligibilityCriteriaMap.entrySet()) {
            accountMembershipMap.put(entry.getKey(), entry.getValue().apply(accountBalance));
        }

        for (Map.Entry<CompanySizeCriteria, FuzzyFunction> entry : membershipFunctionStorage.getCompanySizeMembershipFunction().entrySet()) {
            companySizeMembershipMap.put(entry.getKey(), entry.getValue().apply(corporateClient.getCompanySize()));
        }
        System.out.println(accountMembershipMap);
        return getOffersByMembershipAndCompanySizeMap(accountMembershipMap, companySizeMembershipMap);
    }



    List<Offer> getOffersByMembershipMap(Map<EligibilityCriteria, Double> accountMembershipMap, Map<CompanySizeCriteria, Double> companySizeMembershipMap) {
        List<Offer> offers = new ArrayList<>();
        double sum = accountMembershipMap.values().stream().mapToDouble(Double::doubleValue).sum();
        for (Map.Entry<EligibilityCriteria, Double> entry : accountMembershipMap.entrySet()) {
            if (offers.size() == numberOfRecommendations) {
                break;
            }
            if (entry.getValue() == 0.0) {
                continue;
            }
            int numberOfOffersFromCriteria = (int) Math.round(numberOfRecommendations * entry.getValue() / sum);
            System.out.println("Fetching " + numberOfOffersFromCriteria + " offers from criteria: " + entry.getKey());
            List<Offer> criteriaOffers = new ArrayList<>(offerService.getOffersByEligibility(entry.getKey()));
            System.out.println("CRITERIA OFFERS SIZE: " + criteriaOffers.size());
            if (criteriaOffers.isEmpty()) {
                continue;
            }
            Collections.shuffle(criteriaOffers);
            for (int i = 0; i < numberOfOffersFromCriteria; i++) {
                Offer offer = criteriaOffers.get(i);
                if (offer.getAgeCriteria() != null) {
                    double ageMembership = companySizeMembershipMap.get(offer.getAgeCriteria());
                    if (ageMembership > 0.0) {
                        offers.add(offer);
                    }
                } else {
                    offers.add(offer);
                }
            }

        }
        return offers;
    }

}
