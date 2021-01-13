package ru.vsu.Peredachka.data.dto;

import lombok.*;
import ru.vsu.Peredachka.data.entity.*;

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
