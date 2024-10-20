package home.officers.backend.widgetbe.currency.service;

import home.officers.backend.widgetbe.currency.external.PredictAdapter;
import home.officers.backend.widgetbe.currency.model.ChartDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final PredictAdapter adapter;

    public ChartDataDto getCurrencyPrediction(int time) {
        return adapter.getPredictedCurrency(time);
    }
}
