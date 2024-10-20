package home.officers.backend.widgetbe.currency.external;

import home.officers.backend.widgetbe.currency.model.ChartDataDto;
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

import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class PredictAdapter {

    private final String url;

    public PredictAdapter(Environment environment) {
        this.url = environment.getRequiredProperty("CURRENCY_PREDICTION_API_URL");
    }

    public ChartDataDto getPredictedCurrency(int time) {
        OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    Request requestBuilder = chain.request()
                            .newBuilder()
                            .addHeader(HttpHeaders.ACCEPT, "application/json")
                            .build();
                    return chain.proceed(requestBuilder);
                })
                .connectTimeout(120, TimeUnit.SECONDS)
                .readTimeout(300, TimeUnit.SECONDS)
                .writeTimeout(300, TimeUnit.SECONDS)
                .build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(url)
                .client(okHttpClient)
                .addConverterFactory(JacksonConverterFactory.create())
                .build();

        PredictAPI currencyAPI = retrofit.create(PredictAPI.class);

        return callApiAndGetResponse(time, currencyAPI);
    }

    @Nullable
    private ChartDataDto callApiAndGetResponse(int time, PredictAPI currencyExchangeAPI) {
        try {
            Response<ChartDataDto> response = currencyExchangeAPI
                    .getPrediction(time)
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
