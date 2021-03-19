package ru.vsu.Peredachka.data.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.dto.journey.JourneyInfoDto;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.repository.TravelPointRepository;

import javax.annotation.PostConstruct;

@Component
public class JourneyInfoCostMapper extends AbstractMapper<Journey, JourneyInfoDto> {

    private final TravelPointRepository travelPointRepository;

    @Autowired
    JourneyInfoCostMapper(TravelPointRepository travelPointRepository) {
        super(Journey.class, JourneyInfoDto.class);
        this.travelPointRepository = travelPointRepository;
    }

    @PostConstruct
    public void setupMapper() {
        mapper.createTypeMap(Journey.class, JourneyInfoDto.class).setPostConverter(toDtoConverter());
    }

    @Override
    void mapSpecificFields(Journey source, JourneyInfoDto destination) {
        destination.setStartTravelPoint(mapper.map(source.getTravelPoints().get(0), TravelPointDto.class));
        destination.setEndTravelPoint(
                mapper.map(source.getTravelPoints().get(source.getTravelPoints().size() - 1),
                TravelPointDto.class)
        );
    }
}
