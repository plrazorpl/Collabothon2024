package home.officers.backend.widgetbe.transactions.controller;

import home.officers.backend.widgetbe.transactions.model.dto.TransactionsResponseDto;
import home.officers.backend.widgetbe.transactions.service.TransactionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/transactions")
public class TransactionsController {

     private final TransactionsService service;

    @GetMapping(path = "/analyze/{customerId}")
    public TransactionsResponseDto getTransactionDataForCustomers(
            @PathVariable Long customerId) {
        return service.getTransactionDataForCustomers(customerId);
    }
}
