package home.officers.backend.widgetbe.ballance.service;

import home.officers.backend.widgetbe.ballance.external.currency.CurrencyExchangeAdapter;
import home.officers.backend.widgetbe.ballance.external.currency.model.CurrencyDto;
import home.officers.backend.widgetbe.ballance.model.domain.Account;
import home.officers.backend.widgetbe.ballance.model.dto.AccountDto;
import home.officers.backend.widgetbe.ballance.model.dto.BalanceDataDto;
import home.officers.backend.widgetbe.ballance.repository.BalanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BalanceService {

    private final BalanceRepository repository;
    private final CurrencyExchangeAdapter adapter;

    public BalanceDataDto getBalances(Long customerId) {
        List<Account> accounts = repository.findAccountsByCustomerId(customerId);

        double totalBalanceInEuro = accounts.stream()
                .mapToDouble(account -> {
                    double rateToEuro = adapter.getConvertedCurrency("eur").eur().getOrDefault(account.getCurrency().getCurrency(), 1.0);
                    return account.getBalance() / rateToEuro;
                })
                .sum();

        CurrencyDto currency = adapter.getConvertedCurrency("eur");

        List<AccountDto> accountDtos = accounts.stream()
                .map(account -> {
                    double rateToEuro = currency.eur().getOrDefault(account.getCurrency().getCurrency(), 1.0);
                    double realValueInEur = account.getBalance() / rateToEuro;

                    double percent = totalBalanceInEuro > 0
                            ? (realValueInEur / totalBalanceInEuro) * 100
                            : 0;

                    return new AccountDto(
                            account.getAccountNumber(),
                            account.getCurrency().toString(),
                            account.getBalance(),
                            realValueInEur,
                            percent
                    );
                })
                .toList();

        return new BalanceDataDto(accountDtos, totalBalanceInEuro);
    }
}
