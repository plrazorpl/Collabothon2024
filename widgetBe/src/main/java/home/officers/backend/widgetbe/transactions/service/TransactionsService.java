package home.officers.backend.widgetbe.transactions.service;

import home.officers.backend.widgetbe.customer.model.domain.Customer;
import home.officers.backend.widgetbe.customer.repository.CustomerRepository;
import home.officers.backend.widgetbe.customer.util.Mapper;
import home.officers.backend.widgetbe.transactions.consts.TransactionType;
import home.officers.backend.widgetbe.transactions.model.domain.Transaction;
import home.officers.backend.widgetbe.transactions.model.dto.TransactionsResponseDto;
import home.officers.backend.widgetbe.transactions.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static home.officers.backend.widgetbe.commonConsts.CommonConsts.NOT_FOUND_CUSTOMER;

@Service
@RequiredArgsConstructor
public class TransactionsService {

    private final CustomerRepository customerRepository;
    private final TransactionRepository transactionRepository;
    private static final String NOT_FOUND_TRANSACTIONS = "Transactions not Found for customer Id: %s";
    private final double carbonFootprintPerBanknote = 0.005;

    public TransactionsResponseDto getTransactionDataForCustomers(Long customerId) {
        return computeDataForCustomer(customerId);
    }

    private TransactionsResponseDto computeDataForCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_CUSTOMER));
        List<Transaction> transactionsList = transactionRepository.findAllByCustomerID(customerId)
                .orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_TRANSACTIONS.formatted(customerId)));

        List<Transaction> cashTransactionList = retrieveCashOperationsNumber(transactionsList);
        int cashOperationsAmount = cashTransactionList.size();
        int digitalOperationsAmount = retrieveDigitalOperationsNumber(transactionsList).size();
        double producedCarbonFootprintByCashTransactions = computeCarbonFootprintForCashOperations(cashTransactionList,
                cashOperationsAmount);

        return new TransactionsResponseDto(Mapper.toCustomerDto(customer),
                cashOperationsAmount,
                digitalOperationsAmount,
                producedCarbonFootprintByCashTransactions);
    }

    private List<Transaction> retrieveCashOperationsNumber(List<Transaction> transactionsList) {
        return transactionsList.stream()
                .filter(transactionType -> transactionType.getTransactionType().equals(TransactionType.CASH.toString()))
                .toList();
    }

    private List<Transaction> retrieveDigitalOperationsNumber(List<Transaction> transactionsList) {
        return transactionsList.stream()
                .filter(transactionType ->
                        transactionType.getTransactionType().equals(TransactionType.DIGITAL_OPERATION.toString()))
                .toList();
    }

    private double computeCarbonFootprintForCashOperations(List<Transaction> cashTransactionsList,
                                                         int cashOperationsAmount) {
        int averageBanknotesUsedInTransactions = cashTransactionsList.stream()
                .mapToInt(transaction -> Math.toIntExact(Math.round(transaction.getTransactionValue() / 100)))
                .sum();

        return cashOperationsAmount * averageBanknotesUsedInTransactions * carbonFootprintPerBanknote;
    }
}
