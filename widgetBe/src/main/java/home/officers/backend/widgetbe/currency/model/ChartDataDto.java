package home.officers.backend.widgetbe.currency.model;

public record ChartDataDto(
        DataDto actual,
        DataDto future,
        DataDto predicted
) {

}
