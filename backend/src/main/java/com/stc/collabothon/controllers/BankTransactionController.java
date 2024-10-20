package com.stc.collabothon.controllers;

import com.stc.collabothon.model.Account;
import com.stc.collabothon.model.CollabothonApiResponse;
import com.stc.collabothon.model.offer.Offer;
import com.stc.collabothon.model.transaction.BankTransaction;
import com.stc.collabothon.model.transaction.Investment;
import com.stc.collabothon.model.transaction.Status;
import com.stc.collabothon.repo.AccountRepository;
import com.stc.collabothon.services.BankTransactionService;
import com.stc.collabothon.services.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/bank-transactions")
public class BankTransactionController {
    private final BankTransactionService bankTransactionService;
    private final AccountRepository accountRepository;


    @Autowired
    public BankTransactionController(BankTransactionService bankTransactionService, AccountRepository accountRepository) {
        this.bankTransactionService = bankTransactionService;
        this.accountRepository = accountRepository;
    }

    @GetMapping
    public List<BankTransaction> getAllTransactions() {
        return bankTransactionService.getAllTransactions();
    }
    @GetMapping("/{id}")
    public ResponseEntity<BankTransaction> getTransactionById(@PathVariable Long id) {
        Optional<BankTransaction> transaction = bankTransactionService.getTransactionById(id);
        return transaction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/status/{status}")
    public List<BankTransaction> getTransactionsByStatus(@PathVariable Status status) {
        return bankTransactionService.getTransactionsByStatus(status);
    }
    @GetMapping("/account/{accountId}")
    public List<BankTransaction> getTransactionsByAccount(@PathVariable Long accountId) {
        return bankTransactionService.getTransactionsByAccount(accountId);
    }
    @GetMapping("/date/{date}")
    public List<BankTransaction> getTransactionsFromDate(@PathVariable LocalDateTime date) {
        return bankTransactionService.getTransactionsFromDate(date);
    }


    @GetMapping("/account/{accountId}/date/{date}/status/{status}")
    public List<BankTransaction> getTransactionsByAccountDateAndStatus(@PathVariable Long accountId, @PathVariable LocalDateTime date, @PathVariable Status status) {
        return bankTransactionService.getTransactionsByAccountDateAndStatus(accountId, date, status);
    }

    @PostMapping
    public BankTransaction createTransaction(@RequestBody BankTransaction transaction) {
        return bankTransactionService.saveTransaction(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BankTransaction> updateTransaction(@PathVariable Long id, @RequestBody BankTransaction updatedTransaction) {
        Optional<BankTransaction> existingTransaction = bankTransactionService.getTransactionById(id);

        if (existingTransaction.isPresent()) {
            updatedTransaction.setId(id); // Ensure the ID is set for update
            return ResponseEntity.ok(bankTransactionService.saveTransaction(updatedTransaction));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        Optional<BankTransaction> transaction = bankTransactionService.getTransactionById(id);

        if (transaction.isPresent()) {
            bankTransactionService.deleteTransactionById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get-users-investments/{accountId}")
    public ResponseEntity<CollabothonApiResponse<List<BankTransaction>>> getAllInvestmentsForUser(@PathVariable Long accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<BankTransaction> allTransactions = bankTransactionService.getAllTransactions();

        List<BankTransaction> userInvestments = allTransactions.stream()
                .filter(transaction -> transaction instanceof Investment)
                .collect(Collectors.toList());

        CollabothonApiResponse<List<BankTransaction>> response = new CollabothonApiResponse<>(true, userInvestments, "User's investments found successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
