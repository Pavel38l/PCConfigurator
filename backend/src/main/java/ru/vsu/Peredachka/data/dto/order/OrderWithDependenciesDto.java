package ru.vsu.Peredachka.data.dto.order;

import lombok.*;
import ru.vsu.Peredachka.data.dto.OrderSizeDto;
import ru.vsu.Peredachka.data.dto.OrderStatusDto;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyDto;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class OrderWithDependenciesDto {
    private Long id;
    private Integer orderValue;
    private String description;

    private OrderSizeDto orderSize;

    private OrderStatusDto orderStatus;

    private UserDto owner;

    private JourneyDto journey;

    private TravelPointDto dispatchPoint;

    private TravelPointDto arrivalPoint;
}
