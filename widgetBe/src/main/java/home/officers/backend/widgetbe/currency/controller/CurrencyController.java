package home.officers.backend.widgetbe.currency.controller;

import home.officers.backend.widgetbe.currency.model.ChartDataDto;
import home.officers.backend.widgetbe.currency.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/v1/currency")
public class CurrencyController {

    private final CurrencyService service;

    @GetMapping("/{time}")
    public ResponseEntity<ChartDataDto> getCurrencyPrediction(@PathVariable int time) {
        return ResponseEntity.ok(service.getCurrencyPrediction(time));
    }
}
