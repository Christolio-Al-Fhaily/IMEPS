package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<CountryEntity, Integer> {
}
