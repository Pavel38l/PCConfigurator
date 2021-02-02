package ru.vsu.Peredachka.data.dto.journey;

import lombok.*;
import ru.vsu.Peredachka.data.dto.JourneyCostDto;
import ru.vsu.Peredachka.data.dto.order.OrderDto;
import ru.vsu.Peredachka.data.dto.TravelPointDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;
import ru.vsu.Peredachka.data.entity.JourneyCost;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JourneyWithDependenciesDto {
    private Long id;
    private Double cost;
    private Integer maxOrderCount;

    private UserDto owner;

    List<TravelPointDto> travelPoints;

    List<OrderDto> orders;

    List<JourneyCostDto> journeyCosts;
}
