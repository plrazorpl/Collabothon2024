package com.stc.collabothon.repo;

import com.stc.collabothon.model.ServerDowntime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerDowntimeRepository extends JpaRepository<ServerDowntime, Long> {
}
