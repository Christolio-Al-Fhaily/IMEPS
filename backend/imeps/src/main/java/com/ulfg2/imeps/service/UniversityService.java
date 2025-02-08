package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Convention;
import com.ulfg2.imeps.domain.Country;
import com.ulfg2.imeps.domain.University;
import com.ulfg2.imeps.persistence.ConventionEntity;
import com.ulfg2.imeps.persistence.CountryEntity;
import com.ulfg2.imeps.persistence.UniversityEntity;
import com.ulfg2.imeps.repo.ConventionRepository;
import com.ulfg2.imeps.repo.CountryRepository;
import com.ulfg2.imeps.repo.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository uniRepo;
    @Autowired
    private ConventionRepository conventionRepo;
    @Autowired
    private CountryRepository countryRepo;

    public List<University> getAll() {
        List<UniversityEntity> universityEntities = uniRepo.findAll();
        List<University> universities = new ArrayList<>();
        universityEntities.forEach(universityEntity -> {
            Country country = getCountry(universityEntity);
            Convention convention = getConvention(universityEntity);
            universities.add(new University(universityEntity.getName(), country, convention));
        });
        return universities;
    }

    private Convention getConvention(UniversityEntity universityEntity) {
        ConventionEntity conventionEntity = conventionRepo.getReferenceById(universityEntity.getConvention_id());
        return new Convention(conventionEntity.getName(), conventionEntity.getDate(), conventionEntity.getAttachment());
    }

    private Country getCountry(UniversityEntity universityEntity) {
        CountryEntity countryEntity = countryRepo.getReferenceById(universityEntity.getCountry_id());
        return new Country(countryEntity.getName(), countryEntity.getCode());
    }
}
