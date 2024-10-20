package com.nosuchteamexception.widget.repository;

import com.nosuchteamexception.widget.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
