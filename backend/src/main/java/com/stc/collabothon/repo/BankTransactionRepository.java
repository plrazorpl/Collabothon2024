package com.stc.collabothon.repo;

import com.stc.collabothon.model.transaction.BankTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankTransactionRepository extends JpaRepository<BankTransaction, Long> {
}
