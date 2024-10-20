package home.officers.backend.widgetbe.currency.model;

import java.util.List;

public record DataDto(
        List<String> dates,
        List<Double> values
) {
}
