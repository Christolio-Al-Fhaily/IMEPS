package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Program;
import com.ulfg2.imeps.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProgramController {

    @Autowired
    ProgramService service;

    @GetMapping("/programs")
    public List<Program> getAll() {
        return service.getAll();
    }

    @PostMapping("/programs")
    public ResponseEntity<Void> createProgram(@RequestBody Program program) throws Exception {
        service.createProgram(program);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/programs/{programId}")
    public ResponseEntity<Void> deleteProgram(@PathVariable int programId) {
        service.deleteProgram(programId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
