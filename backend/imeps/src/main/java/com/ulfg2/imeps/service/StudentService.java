package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Candidature;
import com.ulfg2.imeps.domain.Program;
import com.ulfg2.imeps.domain.Student;
import com.ulfg2.imeps.persistence.ProgramStudentEntity;
import com.ulfg2.imeps.persistence.StudentEntity;
import com.ulfg2.imeps.persistence.StudentScholarshipEntity;
import com.ulfg2.imeps.persistence.UserEntity;
import com.ulfg2.imeps.repo.ProgramStudentRepository;
import com.ulfg2.imeps.repo.StudentRepository;
import com.ulfg2.imeps.repo.StudentScholarshipRepository;
import com.ulfg2.imeps.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;
    @Autowired
    ProgramStudentRepository programStudentRepository;
    @Autowired
    ProgramService programService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StudentScholarshipRepository studentScholarshipRepository;

    public List<Student> findByUlBranchAndByStatus(Integer ulBranch, String status, Integer scholarshipId) {
        List<Student> students = new ArrayList<>();
        List<ProgramStudentEntity> programStudentsByStatus = programStudentRepository.findAll();
        List<StudentScholarshipEntity> studentScholarshipByScholarship = studentScholarshipRepository.findAll();

        if (status != null)
            programStudentsByStatus = programStudentsByStatus.stream().filter(ps -> ps.getStatus().equals(status)).toList();
        if(scholarshipId != null)
            studentScholarshipByScholarship = studentScholarshipByScholarship.stream().filter(ps -> ps.getId().getScholarshipId() == scholarshipId).toList();

        programStudentsByStatus.forEach(ps -> {
            Student student = findById(ps.getId().getStudentId());
            if (ulBranch == null || student.ulBranch() == ulBranch) {
                Program program = programService.findById(ps.getId().getProgramId());
                Candidature candidature = new Candidature(program, ps.getStatus());
                student.candidatures().add(candidature);
                students.add(student);
            }
        });

        Set<Integer> studentsByScholarshipIds = studentScholarshipByScholarship.stream().map(s -> s.getId().getStudentId()).collect(Collectors.toSet());

        return students.stream().filter(s -> studentsByScholarshipIds.contains(s.id())).toList();
    }

    public Student findById(int id) {
        StudentEntity entity = studentRepository.findById(id).get();
        UserEntity user = userRepository.findById(entity.getUserId()).get();
        return toDomain(entity, user.getUlBranch(), user.getUsername());
    }


    private Student toDomain(StudentEntity entity, int ulBranch, String email) {
        return new Student(entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getPhoneNumber(),
                email,
                entity.getStdId(),
                entity.getAcademicYear(),
                entity.getDepartment(),
                entity.getGrade(),
                ulBranch,
                new ArrayList<>()
        );
    }
}
