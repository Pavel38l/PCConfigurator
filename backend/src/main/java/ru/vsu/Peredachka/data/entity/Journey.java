package ru.vsu.Peredachka.data.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDispatchDate() {
        return dispatchDate;
    }

    public void setDispatchDate(LocalDate dispatchDate) {
        this.dispatchDate = dispatchDate;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Journey journey = (Journey) o;
        return Objects.equals(id, journey.id) &&
                Objects.equals(dispatchDate, journey.dispatchDate) &&
                Objects.equals(arrivalDate, journey.arrivalDate) &&
                Objects.equals(cost, journey.cost) &&
                Objects.equals(owner, journey.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dispatchDate, arrivalDate, cost, owner);
    }
}
