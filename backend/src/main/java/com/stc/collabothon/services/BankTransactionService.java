package com.stc.collabothon.services;

import com.stc.collabothon.model.transaction.BankTransaction;
import com.stc.collabothon.model.transaction.Status;
import com.stc.collabothon.repo.BankTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BankTransactionService {
    private final BankTransactionRepository bankTransactionRepository;

    @Autowired
    public BankTransactionService(BankTransactionRepository bankTransactionRepository) {
        this.bankTransactionRepository = bankTransactionRepository;
    }

    public List<BankTransaction> getAllTransactions() {
        return bankTransactionRepository.findAll();
    }

    public BankTransaction saveTransaction(BankTransaction transaction) {
        return bankTransactionRepository.save(transaction);
    }

    public void deleteTransactionById(Long id) {
        bankTransactionRepository.deleteById(id);
    }
    public Optional<BankTransaction> getTransactionById(Long id) {
        return bankTransactionRepository.findById(id);
    }
    public List<BankTransaction> getTransactionsFromDate(LocalDateTime date) {
        return bankTransactionRepository.findAll()
                .stream()
                .filter(transaction -> transaction.getTransactionDate().isAfter(date))
                .toList();
    }

    public List<BankTransaction> getTransactionsByStatus(Status status) {
        return bankTransactionRepository.findAll()
                .stream()
                .filter(transaction -> transaction.getStatus().equals(status))
                .toList();
    }

    public List<BankTransaction> getTransactionsByAccountDateAndStatus(Long accountId, LocalDateTime date, Status status) {
        return bankTransactionRepository.findAll()
                .stream()
                .filter(transaction -> transaction.getAccount().getId().equals(accountId))
                .filter(transaction -> transaction.getTransactionDate().isAfter(date))
                .filter(transaction -> transaction.getStatus().equals(status))
                .toList();
    }

    public List<BankTransaction> getTransactionsByAccount(Long accountId) {
        return bankTransactionRepository.findAll()
                .stream()
                .filter(transaction -> transaction.getAccount().getId().equals(accountId))
                .toList();
    }



}
