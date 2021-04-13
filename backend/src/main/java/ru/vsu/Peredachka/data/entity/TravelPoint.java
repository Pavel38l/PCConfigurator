package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "travelPoint", schema = "public")
public class TravelPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comment;
    private Double x, y;
    private String address;
    private Date dispatchDate;
    private Date arrivalDate;

    private Integer pointIndex;

    @ManyToOne
    @JoinColumn(name = "journeyId")
    private Journey journey;

}
