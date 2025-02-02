package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {
}
