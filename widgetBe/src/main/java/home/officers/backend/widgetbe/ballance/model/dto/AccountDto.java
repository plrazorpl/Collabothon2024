package home.officers.backend.widgetbe.ballance.model.dto;

public record AccountDto(
        String accountNumber,
        String currency,
        double balance,
        double realValueInEur,
        double percent
) {
}
