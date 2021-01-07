package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter @Setter
@EqualsAndHashCode
@ToString
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
    private Double cost;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private User owner;
}