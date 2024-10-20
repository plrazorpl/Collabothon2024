package com.stc.collabothon.model.client;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.stc.collabothon.model.Account;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME, // Use the class name as the type indicator
        include = JsonTypeInfo.As.PROPERTY, // Include this as a property in JSON
        property = "type" // This property will be added to your JSON response to indicate the type
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = NaturalPerson.class, name = "naturalPerson"),
        @JsonSubTypes.Type(value = CorporateClient.class, name = "corporateClient")
})
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_id_seq")
    @SequenceGenerator(name = "client_id_seq", sequenceName = "client_id_SEQ", allocationSize = 1)
    private Long id;

    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "email_address")
    private String emailAddress;
    @Column(name = "postal_Address")
    private String postalAddress;
    private String nationality;

    @OneToOne(mappedBy = "client",  cascade = CascadeType.ALL)
    @JsonBackReference
    private Account account;

}
