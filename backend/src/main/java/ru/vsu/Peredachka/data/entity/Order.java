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
    private Integer orderValue;
    private String description;
    private Integer rateOrder;
    private Integer rateJourney;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "sizeId")
    private OrderSize orderSize;

    @ManyToOne
    @JoinColumn(name = "statusId")
    private OrderStatus orderStatus;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "ownerId")
    private User owner;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "journeyId")
    private Journey journey;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "dispatchPointId")
    private TravelPoint dispatchPoint;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "arrivalPointId")
    private TravelPoint arrivalPoint;



    private Long receiverPhoneNumber;

}
