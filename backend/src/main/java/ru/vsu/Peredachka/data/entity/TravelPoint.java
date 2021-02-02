package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

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
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;

    @OneToOne
    @JoinColumn(name = "previousId", referencedColumnName = "id")
    private TravelPoint previousTravelPoint;

    @ManyToOne
    @JoinColumn(name = "journeyId")
    private Journey journey;

}
