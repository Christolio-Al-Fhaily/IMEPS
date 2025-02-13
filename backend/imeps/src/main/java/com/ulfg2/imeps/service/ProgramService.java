package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Program;
import com.ulfg2.imeps.persistence.ProgramEntity;
import com.ulfg2.imeps.repo.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgramService {

    @Autowired
    ProgramRepository repo;


    public Program findById(int id){
        return toDomain(repo.findById(id).get());
    }

    private Program toDomain(ProgramEntity entity) {
        return new Program(entity.getId(),
                entity.getDescription(),
                entity.getDepartment(),
                entity.getType(),
                entity.getSubmissionDate(),
                entity.getAcademicYear());
    }
}
