package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.journey.JourneyCriteriaDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyInfoDto;
import ru.vsu.Peredachka.data.dto.journey.CreateOrUpdateJourneyDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.mapper.JourneyInfoCostMapper;
import ru.vsu.Peredachka.service.JourneyService;

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

    @Autowired
    public JourneyController(JourneyService journeyService, ModelMapper mapper, JourneyInfoCostMapper journeyMapper) {
        this.journeyService = journeyService;
        this.mapper = mapper;
        this.journeyMapper = journeyMapper;
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

    @RequestMapping(method = POST, path = "/create")
        public JourneyWithDependenciesDto createJourney(@RequestBody CreateOrUpdateJourneyDto dto) {
        var map = mapper.map(dto, Journey.class);
        var createdJourney = journeyService.createOrUpdateJourney(
                map
        );
        return mapper.map(createdJourney, JourneyWithDependenciesDto.class);
    }

    @RequestMapping(method = GET, path = "/{id}")
    public JourneyWithDependenciesDto getJourney(@PathVariable Long id) throws NotFoundException {
        return mapper.map(journeyService.findById(id), JourneyWithDependenciesDto.class);
    }
}
