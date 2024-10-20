package com.stc.collabothon.model.client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@SuperBuilder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NaturalPerson extends Client {


    @Column(name = "last_name")
    private String lastName;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "date_of_birth")
    private String dateOfBirth;
    private String salutation;
    private String title;

    @Transient
    private Integer age;

    public Integer getAge() {

        if (this.dateOfBirth == null) {
            return null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate birthDate = LocalDate.parse(this.dateOfBirth, formatter);
        return Period.between(birthDate, LocalDate.now()).getYears();
    }


}
