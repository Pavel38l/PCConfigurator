package ru.vsu.Peredachka.data.dto.journey;

import lombok.*;
import ru.vsu.Peredachka.data.dto.order.OrderDto;
import ru.vsu.Peredachka.data.dto.TravelPointDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class JourneyWithDependenciesDto {
    private Long id;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
    private Double cost;

    private UserDto owner;

    List<TravelPointDto> travelPoints;

    List<OrderDto> orders;
}
