package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Convention;
import com.ulfg2.imeps.domain.Country;
import com.ulfg2.imeps.domain.University;
import com.ulfg2.imeps.persistence.ConventionEntity;
import com.ulfg2.imeps.persistence.CountryEntity;
import com.ulfg2.imeps.persistence.UniversityEntity;
import com.ulfg2.imeps.repo.ConventionRepository;
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
    private CountryService countryService;

    public List<University> getAll() {
        List<UniversityEntity> universityEntities = uniRepo.findAll();
        return toDomain(universityEntities);
    }

    public List<University> getByCountryCode(String countryCode) {
        CountryEntity country = countryService.getByCountryCode(countryCode);
        List<UniversityEntity> universityEntities = uniRepo.findAllByCountryId(country.getId());
        List<University> universities = new ArrayList<>();
        universityEntities.forEach(u -> universities.add(new University(u.getId(), u.getName(), new Country(country.getName(), country.getCode()), getConvention(u))));
        return universities;
    }

    public University getById(int id) {
        UniversityEntity entity = uniRepo.findById(id).get();
        return toDomain(entity);
    }


    private List<University> toDomain(List<UniversityEntity> universityEntities) {
        List<University> universities = new ArrayList<>();
        universityEntities.forEach(entity -> {
            universities.add(toDomain(entity));
        });
        return universities;
    }

    private University toDomain(UniversityEntity entity) {
        Country country = getCountry(entity);
        Convention convention = getConvention(entity);
        return new University(entity.getId(), entity.getName(), country, convention);
    }


    private Convention getConvention(UniversityEntity universityEntity) {
        ConventionEntity conventionEntity = conventionRepo.getReferenceById(universityEntity.getConventionId());
        return new Convention(conventionEntity.getName(), conventionEntity.getDate(), conventionEntity.getAttachment());
    }

    private Country getCountry(UniversityEntity universityEntity) {
        CountryEntity countryEntity = countryService.getById(universityEntity.getCountryId()).get();
        return new Country(countryEntity.getName(), countryEntity.getCode());
    }
}
