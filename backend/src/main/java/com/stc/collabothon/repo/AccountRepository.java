package com.stc.collabothon.repo;

import com.stc.collabothon.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
