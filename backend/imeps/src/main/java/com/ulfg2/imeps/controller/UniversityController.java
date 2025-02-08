package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.University;
import com.ulfg2.imeps.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("")
public class UniversityController {

    @Autowired
    UniversityService service;

    @GetMapping("/universities")
    public List<University> getAll() {
        return service.getAll();
    }

}
