package ru.vsu.Peredachka.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "journeyCost", schema = "public")
public class JourneyCost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "journey_id")
    private Journey journey;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "order_size_id")
    private OrderSize orderSize;

    private Double cost;
}
