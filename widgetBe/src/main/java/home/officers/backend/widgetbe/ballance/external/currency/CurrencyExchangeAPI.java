package home.officers.backend.widgetbe.ballance.external.currency;

import home.officers.backend.widgetbe.ballance.external.currency.model.CurrencyDto;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

@Component
public interface CurrencyExchangeAPI {

    @GET("/npm/@fawazahmed0/currency-api@latest/v1/currencies/{currency}")
    Call<CurrencyDto> getCurrency(@Path("currency") String currency);
}
