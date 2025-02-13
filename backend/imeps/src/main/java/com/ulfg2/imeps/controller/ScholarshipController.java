package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Scholarship;
import com.ulfg2.imeps.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("")
public class ScholarshipController {

    @Autowired
    ScholarshipService service;

    @GetMapping("/scholarships")
    public List<Scholarship> getAll() {
        return service.getAll();
    }
}
