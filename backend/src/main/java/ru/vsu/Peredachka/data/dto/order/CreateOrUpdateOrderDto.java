package ru.vsu.Peredachka.data.dto.order;

import lombok.Data;
import ru.vsu.Peredachka.data.dto.OrderSizeDto;
import ru.vsu.Peredachka.data.dto.OrderStatusDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyDto;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;

@Data
public class CreateOrUpdateOrderDto {
    private Integer orderValue;
    private String description;

    private OrderSizeDto orderSize;

    private UserDto owner;

    private JourneyDto journey;

    private TravelPointDto dispatchPoint;

    private TravelPointDto arrivalPoint;
}
