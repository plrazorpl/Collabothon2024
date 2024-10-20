package home.officers.backend.widgetbe.visitsDuration.model.dto;

import home.officers.backend.widgetbe.customer.model.dto.CustomerDto;

public record CustomerVisitsAnalysis(
        CustomerDto customer,
        int averageCustomersTimeInComparison, //[%]
        int customerAverageTime, //[s]
        int lastVisitDuration,
        int visitTrend //[%] with sign -
) {
}
