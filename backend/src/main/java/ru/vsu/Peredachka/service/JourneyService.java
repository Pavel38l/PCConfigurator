package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.repository.JourneyRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class JourneyService {
    private final JourneyRepository journeyRepository;

    public JourneyService(JourneyRepository journeyRepository) {
        this.journeyRepository = journeyRepository;
    }

    public List<Journey> getAllJourneys() {
        var result = new ArrayList<Journey>();
        journeyRepository.findAll().forEach(result::add);
        return result;
    }

    public List<Journey> getAllUserOrders(Journey journey) {
        return journeyRepository.findAllByOwner(journey);
    }

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
