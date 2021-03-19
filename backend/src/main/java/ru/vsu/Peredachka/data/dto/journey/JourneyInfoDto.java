package ru.vsu.Peredachka.data.dto.journey;

import lombok.Data;
import ru.vsu.Peredachka.data.dto.AbstractDto;
import ru.vsu.Peredachka.data.dto.JourneyCostDto;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;

import java.util.List;

@Data
public class JourneyInfoDto extends AbstractDto {
    private Long id;
    private Integer maxOrderCount;

    private UserDto owner;

    private TravelPointDto startTravelPoint;
    private TravelPointDto endTravelPoint;

    List<JourneyCostDto> journeyCosts;
}
