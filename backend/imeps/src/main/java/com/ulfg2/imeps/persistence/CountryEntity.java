package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "countries")
public record CountryEntity(@GeneratedValue(strategy = GenerationType.IDENTITY) @Id int id, String name,@Column(length = 2) String code) {}
