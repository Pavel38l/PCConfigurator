package ru.vsu.Peredachka.data.utils;

import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.repository.JourneyRepository;
import ru.vsu.Peredachka.data.repository.TravelPointRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Utils {
        @SneakyThrows
         public static List<TravelPoint> getTravelPointsPath(
                 Journey journey,
                 TravelPointRepository travelPointRepository
         ) {

            List<TravelPoint> path = new ArrayList<>();
            TravelPoint firstTravelPoint = travelPointRepository.findByJourneyIdAndPreviousTravelPointIsNull(
                    journey.getId()
            ).orElseThrow(() -> new NotFoundException("First travel point not found!"));
            path.add(firstTravelPoint);
            TravelPoint current = firstTravelPoint;
            Optional<TravelPoint> next = travelPointRepository.findByPreviousTravelPointId(current.getId());
            while (next.isPresent()) {
                current = next.orElseThrow(() -> new NotFoundException("Travel point not found!"));
                path.add(current);
                next = travelPointRepository.findByPreviousTravelPointId(current.getId());
            }
            return path;
         }
}
