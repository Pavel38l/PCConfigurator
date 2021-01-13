package ru.vsu.Peredachka.data.dto.journey;

import lombok.*;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CreateOrUpdateJourneyDto {
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
    private Double cost;
}
