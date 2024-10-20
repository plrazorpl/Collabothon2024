package home.officers.backend.widgetbe.ballance.model.dto;

import java.util.List;

public record BalanceDataDto(
    List<AccountDto> balances,
    double totalBalance
) {
}
