package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Program;
import com.ulfg2.imeps.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProgramController {

    @Autowired
    ProgramService service;

    @GetMapping("/programs")
    public List<Program> getAll(){
        return service.getAll();
    }

}
