package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.filter.JourneySpecification;
import ru.vsu.Peredachka.data.repository.JourneyRepository;
import ru.vsu.Peredachka.data.repository.TravelPointRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JourneyService {
    private final JourneyRepository journeyRepository;
    private final TravelPointRepository travelPointRepository;

    public JourneyService(JourneyRepository journeyRepository, TravelPointRepository travelPointRepository) {
        this.journeyRepository = journeyRepository;
        this.travelPointRepository = travelPointRepository;
    }

    @Transactional
    public List<Journey> getAllFilteredJourneys(JourneySpecification journeySpecification) {
        var result = new ArrayList<Journey>();
        journeyRepository.findAll(journeySpecification).forEach(element -> result.add(setupJourney(element)));
        return result;
    }

    @Transactional
    public List<Journey> getAllJourneys() {
        var result = new ArrayList<Journey>();
        journeyRepository.findAll().forEach(element -> result.add(setupJourney(element)));
        return result;
    }

    @Transactional
    public Journey findById(Long id) throws NotFoundException {
        Journey journey = journeyRepository.findById(id).orElseThrow(() -> new NotFoundException("Journey not found!"));
        setupJourney(journey);
        return journey;
    }

    public Journey createOrUpdateJourney(Journey journey) {
        return journeyRepository.save(journey);
    }

    public void deleteJourneyById(Long id) throws NotFoundException {
        Journey journey = findById(id);
        journeyRepository.delete(journey);
    }

    @SneakyThrows
    private Journey setupJourney(Journey journey) {
        return setJourneyTravelPoints(journey);
    }

    private Journey setJourneyTravelPoints(Journey journey) throws NotFoundException {

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
        journey.setTravelPoints(path);
        return journey;
    }
}
