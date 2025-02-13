package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Student;
import com.ulfg2.imeps.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
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

}
