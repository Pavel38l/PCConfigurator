package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.journey.JourneyCriteriaDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyInfoDto;
import ru.vsu.Peredachka.data.dto.journey.CreateOrUpdateJourneyDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.JourneyCost;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.mapper.JourneyInfoCostMapper;
import ru.vsu.Peredachka.service.JourneyService;
import ru.vsu.Peredachka.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/v1/journey")
@CrossOrigin
public class JourneyController {
    private final JourneyService journeyService;
    private final ModelMapper mapper;
    private final JourneyInfoCostMapper journeyMapper;
    private final UserService userService;

    @Autowired
    public JourneyController(JourneyService journeyService, ModelMapper mapper, JourneyInfoCostMapper journeyMapper, UserService userService) {
        this.journeyService = journeyService;
        this.mapper = mapper;
        this.journeyMapper = journeyMapper;
        this.userService = userService;
    }

    @RequestMapping(method = POST, path = "/filter")
    public List<JourneyInfoDto> getFilteredJourneys(@RequestBody JourneyCriteriaDto journeyCriteriaDto) {
        return journeyService.getAllFilteredJourneys(journeyCriteriaDto).stream().map(
                journeyMapper::toDto
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = GET, path = "")
    public List<JourneyInfoDto> getJourneys() {
        return journeyService.getAllJourneys().stream().map(
                journeyMapper::toDto
        ).collect(Collectors.toList());
    }

    @SneakyThrows
    @RequestMapping(method = POST, path = "/create")
        public JourneyWithDependenciesDto createJourney(@RequestBody Journey journey) {
        var createdJourney = journeyService.createOrUpdateJourney(
                journey
        );
        return mapper.map(createdJourney, JourneyWithDependenciesDto.class);
    }

    @RequestMapping(method = GET, path = "/{id}")
    public JourneyWithDependenciesDto getJourney(@PathVariable Long id) throws NotFoundException {
        return mapper.map(journeyService.findById(id), JourneyWithDependenciesDto.class);
    }

    @RequestMapping(method = DELETE, path = "/{id}")
    public void deleteDevice(@PathVariable Long id) throws NotFoundException {
        journeyService.deleteJourneyById(id);
    }
}
