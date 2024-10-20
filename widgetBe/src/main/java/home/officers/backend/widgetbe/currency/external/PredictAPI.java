package home.officers.backend.widgetbe.currency.external;

import home.officers.backend.widgetbe.currency.model.ChartDataDto;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

@Component
public interface PredictAPI {

    @GET("/predict/{time}")
    Call<ChartDataDto> getPrediction(@Path("time") int time);
}
