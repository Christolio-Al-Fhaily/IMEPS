package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.ProgramStudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramStudentRepository extends JpaRepository<ProgramStudentEntity, Integer> {
}
