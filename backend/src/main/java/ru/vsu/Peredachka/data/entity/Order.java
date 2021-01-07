package ru.vsu.Peredachka.data.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "order", schema = "public")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Integer order_value;
    private String description;

    @ManyToOne
    @JoinColumn(name = "sizeId")
    private OrderSize orderSize;

    @ManyToOne
    @JoinColumn(name = "statusId")
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "journeyId")
    private Journey journey;

    @ManyToOne
    @JoinColumn(name = "dispatchPointId")
    private TravelPoint dispatchPoint;

    @ManyToOne
    @JoinColumn(name = "arrivalPointId")
    private TravelPoint arrivalPoint;

}
