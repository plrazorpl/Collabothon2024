package home.officers.backend.widgetbe.visitsDuration.service;

import home.officers.backend.widgetbe.customer.model.domain.Customer;
import home.officers.backend.widgetbe.customer.repository.CustomerRepository;
import home.officers.backend.widgetbe.customer.util.Mapper;
import home.officers.backend.widgetbe.visitsDuration.model.domain.Visit;
import home.officers.backend.widgetbe.visitsDuration.model.dto.CustomerVisitsAnalysis;
import home.officers.backend.widgetbe.visitsDuration.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static home.officers.backend.widgetbe.commonConsts.CommonConsts.NOT_FOUND_CUSTOMER;

@Service
@RequiredArgsConstructor
public class VisitDurationService {

    private final VisitRepository visitRepository;
    private final CustomerRepository customerRepository;
    private static final String NO_VISIT_MSG = "There is no any visits on site for customer id: %s";

    public CustomerVisitsAnalysis getCustomerVisitsAnalysis(Long customerId) {
        return analyzeCustomerVisits(customerId);
    }

    private CustomerVisitsAnalysis analyzeCustomerVisits(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_CUSTOMER));
        List<Visit> visitsToAnalyze = visitRepository.findAllByCustomerId(customerId)
                .orElseThrow(() -> new IllegalArgumentException(NO_VISIT_MSG.formatted(customerId)));

        int lastVisitDuration = findLastVisitDuration(visitsToAnalyze);
        int averageDurationTime = computeAverageDurationTime(visitsToAnalyze);
        int visitDurationTrend = computeDurationTrend(visitsToAnalyze, averageDurationTime);
        int otherComp = anotherCustomerDurationComparingTrend(averageDurationTime);


        return new CustomerVisitsAnalysis(Mapper.toCustomerDto(customer), otherComp,
                averageDurationTime,
                lastVisitDuration,
                visitDurationTrend);
    }

    private int computeDurationTrend(List<Visit> visitsList, int lastVisitDuration) {

        int averageDurationTimeFrom20LastVisits = computeAverageDurationTime(take20LatsVisits(visitsList));
        double outcomeTrend = (double) lastVisitDuration / averageDurationTimeFrom20LastVisits;
        if (outcomeTrend < 1) {
            double percentageOutcome = (outcomeTrend * 100);
            return (int) -percentageOutcome;
        } else {
            double percentageOutcome = (1 - outcomeTrend) * 100;
            return (int) percentageOutcome;
        }
    }

    private int computeAverageDurationTime(List<Visit> visitsList) {
        int numberOfVisits = visitsList.size();
        int totalVisitsDuration = visitsList.stream().mapToInt(Visit::getVisitDuration).sum();

        return Math.round((float) totalVisitsDuration / numberOfVisits);
    }

    private int findLastVisitDuration(List<Visit> visitsList) {
        Visit lastVisit = visitsList.stream()
                .max(Comparator.comparing(Visit::getVisitDate))
                .orElseThrow(() -> new IllegalArgumentException("The lastest date not Found"));

        return lastVisit.getVisitDuration();
    }

    private int anotherCustomerDurationComparingTrend(int averageDurationTime) {
        List<Customer> customers = customerRepository.findAll();
        Map<Long, List<Visit>> customersVisitsToCompare = new HashMap<>();
        customers.forEach(customer -> {
            Long currentCustomersId = customer.getId();
            customersVisitsToCompare.put(currentCustomersId, visitRepository.findAllByCustomerId(currentCustomersId).get());
        });

        int averageOtherCustomersVisitDuration = (int) customersVisitsToCompare.values()
                .stream()
                .filter(x -> computeAverageDurationTime(x) > averageDurationTime)
                .count();
        double trendOutcome = (double) averageOtherCustomersVisitDuration / customers.size() * 100;

        return (int) trendOutcome;
    }

    private List<Visit> take20LatsVisits(List<Visit> visitsList) {
        return visitsList.stream().
                sorted(Comparator.comparing(Visit::getVisitDate).reversed())
                .limit(20)
                .toList();
    }
}
