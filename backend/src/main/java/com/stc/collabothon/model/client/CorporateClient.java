package com.stc.collabothon.model.client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CorporateClient extends Client {

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_size")
    private int companySize;

}
