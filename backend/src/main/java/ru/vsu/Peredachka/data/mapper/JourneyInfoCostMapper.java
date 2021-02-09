package ru.vsu.Peredachka.data.mapper;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.dto.journey.JourneyInfoDto;
import ru.vsu.Peredachka.data.dto.TravelPointDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.repository.TravelPointRepository;
import ru.vsu.Peredachka.data.utils.Utils;

import javax.annotation.PostConstruct;
import java.util.List;

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
        List<TravelPoint> path = Utils.getTravelPointsPath(source, travelPointRepository);
        destination.setStartTravelPoint(mapper.map(path.get(0), TravelPointDto.class));
        destination.setEndTravelPoint(mapper.map(path.get(path.size() - 1), TravelPointDto.class));
    }

    private TravelPoint getLastTravelPoint(Journey source) {
        return getFirstTravelPoint(source);
    }

    private TravelPoint getFirstTravelPoint(Journey source) {
        for (TravelPoint tp : source.getTravelPoints()) {
            if (tp.getPreviousTravelPoint() == null) {
                return tp;
            }
        }
        return null;
    }
}
