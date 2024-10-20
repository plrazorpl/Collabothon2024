package home.officers.backend.widgetbe.ballance.model.domain;

public enum Currency {
    DOLAR("usc"),
    EURO("eur"),
    RUBLE("rub"),
    YEN("jpy"),
    YUAN("cny"),
    POUND("gbp");

    private final String currency;

    Currency(String currency) {
        this.currency = currency;
    }

    public String getCurrency() {
        return currency;
    }

}
