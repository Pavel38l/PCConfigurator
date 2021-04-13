package ru.vsu.Peredachka.data.dto.journey;

import lombok.*;
import ru.vsu.Peredachka.data.dto.JourneyCostCreateDto;
import ru.vsu.Peredachka.data.dto.OrderSizeDto;
import ru.vsu.Peredachka.data.dto.travelPoint.CreateTravelPointDto;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointDto;
import ru.vsu.Peredachka.data.entity.JourneyCost;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.List;

@Data
public class CreateOrUpdateJourneyDto {
    private Long id;
    private Integer maxOrderCount;
    private List<CreateTravelPointDto> travelPoints;
    private List<JourneyCostCreateDto> journeyCosts;
    private Long ownerId;
}
