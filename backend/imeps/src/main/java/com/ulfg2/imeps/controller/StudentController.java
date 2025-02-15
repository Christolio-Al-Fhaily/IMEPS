package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Student;
import com.ulfg2.imeps.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class StudentController {

    @Autowired
    StudentService service;

    @GetMapping("/students")
    public List<Student> getByUlBranchAndStatus(@RequestParam(value = "ulbranch", required = false) Integer ulBranch, @RequestParam(value = "status", required = false) String status, @RequestParam(value = "scholarshipid", required = false) Integer scholarshipId) {
        return service.findByUlBranchAndByStatus(ulBranch, status, scholarshipId);
    }

    @PostMapping("/students/{studentId}/programs/{programId}")
    public ResponseEntity<Void> createProgramStudent(@PathVariable int studentId, @PathVariable int programId) {
        service.createProgramStudent(studentId, programId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/students/{studentId}/programs/{programId}")
    public ResponseEntity<Void> deleteProgramStudent(@PathVariable int studentId, @PathVariable int programId) {
        service.deleteProgramStudent(studentId, programId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/students/{studentId}/scholarships/{scholarshipId}")
    public ResponseEntity<Void> createStudentScholarship(@PathVariable int studentId, @PathVariable int scholarshipId) {
        service.createStudentScholarship(studentId, scholarshipId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/students/{studentId}/scholarships/{scholarshipId}")
    public ResponseEntity<Void> deleteStudentScholarship(@PathVariable int studentId, @PathVariable int scholarshipId) {
        service.deleteStudentScholarship(studentId, scholarshipId);
        return ResponseEntity.ok().build();
    }

}
