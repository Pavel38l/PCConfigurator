package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

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

    @OneToOne
    @JoinColumn(name = "previousId", referencedColumnName = "id")
    private TravelPoint previousTravelPoint;

    @OneToOne
    @JoinColumn(name = "nextId", referencedColumnName = "id")
    private TravelPoint nextTravelPoint;

    @ManyToOne
    @JoinColumn(name = "journeyId")
    private Journey journey;

}
