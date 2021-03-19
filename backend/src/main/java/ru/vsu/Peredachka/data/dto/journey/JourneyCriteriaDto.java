package ru.vsu.Peredachka.data.dto.journey;

import lombok.Data;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointFilterDto;
import ru.vsu.Peredachka.data.entity.TravelPoint;

import java.util.Date;

@Data
public class JourneyCriteriaDto {
    private TravelPointFilterDto startTravelPoint;
    private TravelPointFilterDto endTravelPoint;
    private Date dispatchDate;
    private Date arrivalDate;
    private Integer maxOrderCount;
    private Integer rating;
}
