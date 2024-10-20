package home.officers.backend.widgetbe.ballance.external.currency;

import home.officers.backend.widgetbe.ballance.external.currency.model.CurrencyDto;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.jetbrains.annotations.Nullable;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

@Component
@Slf4j
public class CurrencyExchangeAdapter {

    private final String url;

    public CurrencyExchangeAdapter(Environment environment) {
        this.url = environment.getRequiredProperty("CURRENCY_API_URL");
    }

    public CurrencyDto getConvertedCurrency(String currency) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(url)
                .client(new OkHttpClient.Builder()
                        .addInterceptor(chain -> {
                            Request requestBuilder = chain.request()
                                    .newBuilder()
                                    .addHeader(HttpHeaders.ACCEPT, "application/json")
                                    .build();
                            return chain.proceed(requestBuilder);
                        })
                        .build())
                .addConverterFactory(JacksonConverterFactory.create())
                .build();
        CurrencyExchangeAPI currencyExchangeAPI = retrofit.create(CurrencyExchangeAPI.class);

        return callApiAndGetResponse(currency, currencyExchangeAPI);
    }

    @Nullable
    private CurrencyDto callApiAndGetResponse(String currency, CurrencyExchangeAPI currencyExchangeAPI) {
        try {
            Response<CurrencyDto> response = currencyExchangeAPI
                    .getCurrency("%s.json".formatted(currency))
                    .execute();
            if (!response.isSuccessful() || response.body() == null) {
                return null;
            }
            return response.body();
        } catch (Exception e) {
            log.error("Error while calling Stable Diffusion API", e);
            return null;
        }
    }
}
