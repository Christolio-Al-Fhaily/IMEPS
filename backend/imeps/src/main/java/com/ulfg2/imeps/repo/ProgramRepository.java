package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.ProgramEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<ProgramEntity, Integer> {
}
