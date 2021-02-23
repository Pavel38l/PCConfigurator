package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.Peredachka.data.dto.journey.JourneyCriteriaDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.repository.JourneyRepository;
import ru.vsu.Peredachka.data.repository.TravelPointRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JourneyService {
    private final JourneyRepository journeyRepository;

    public JourneyService(JourneyRepository journeyRepository) {
        this.journeyRepository = journeyRepository;
    }

    @Transactional
    public List<Journey> getAllFilteredJourneys(JourneyCriteriaDto dto) {
        List<Long> list = journeyRepository.findFilteredJourney(
                dto.getStartTravelPoint().getX(),
                dto.getStartTravelPoint().getY(),
                dto.getEndTravelPoint().getX(),
                dto.getEndTravelPoint().getY(),
                dto.getDispatchDate(),
                dto.getArrivalDate(),
                dto.getMaxOrderCount(),
                dto.getRating(),
                3
        );
        return journeyRepository.findAllById(list);
    }

    @Transactional
    public List<Journey> getAllJourneys() {
        return journeyRepository.findAll();
    }

    @Transactional
    public Journey findById(Long id) throws NotFoundException {
        return journeyRepository.findById(id).orElseThrow(() -> new NotFoundException("Journey not found!"));
    }

    public Journey createOrUpdateJourney(Journey journey) {
        return journeyRepository.save(journey);
    }

    public void deleteJourneyById(Long id) throws NotFoundException {
        Journey journey = findById(id);
        journeyRepository.delete(journey);
    }

}
