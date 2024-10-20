package home.officers.backend.widgetbe.transactions.model.dto;

import home.officers.backend.widgetbe.customer.model.dto.CustomerDto;

public record TransactionsResponseDto(
        CustomerDto customer,
        int cashTransactions,
        int onlineTransactions,
        double carbonFootprint
) {
}
