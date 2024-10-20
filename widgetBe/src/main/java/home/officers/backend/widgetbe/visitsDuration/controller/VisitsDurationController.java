package home.officers.backend.widgetbe.visitsDuration.controller;

import home.officers.backend.widgetbe.visitsDuration.model.dto.CustomerVisitsAnalysis;
import home.officers.backend.widgetbe.visitsDuration.service.VisitDurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/v1/visit/duration")
@RequiredArgsConstructor
public class VisitsDurationController {

    private final VisitDurationService service;

    @GetMapping(path = "/analyze/{customerId}")
    public CustomerVisitsAnalysis analyzeCustomerVisitsDuration(@PathVariable Long customerId) {
        return service.getCustomerVisitsAnalysis(customerId);
    }
}
