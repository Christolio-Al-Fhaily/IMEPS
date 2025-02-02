package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "universities")
public class UniversityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String name;
    private int country_id;
    private int convention_id;

    public UniversityEntity() {
    }

    public UniversityEntity(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCountry_id() {
        return country_id;
    }

    public void setCountry_id(int country_id) {
        this.country_id = country_id;
    }

    public int getConvention_id() {
        return convention_id;
    }

    public void setConvention_id(int convention_id) {
        this.convention_id = convention_id;
    }
}
