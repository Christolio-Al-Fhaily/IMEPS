package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Country;
import com.ulfg2.imeps.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("")
public class CountryController {

    @Autowired
    CountryService service;

    @GetMapping("/countries")
    public List<Country> getAll() {
        return service.getAll();
    }
}
