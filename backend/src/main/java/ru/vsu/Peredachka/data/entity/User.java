package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Getter @Setter
@EqualsAndHashCode
@ToString
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Integer rating;
    private LocalDate dateOfBirth;
    private String sex;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private UserRole userRole;

    @OneToMany(mappedBy = "owner")
    private List<Journey> journeys;
}
