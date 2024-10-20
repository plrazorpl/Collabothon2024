package home.officers.backend.widgetbe.ballance.external.currency.model;

import java.util.Map;

public record CurrencyDto(
        String date,
        Map<String, Double> eur
) {
}
