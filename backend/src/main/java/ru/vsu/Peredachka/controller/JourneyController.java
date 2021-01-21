package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.journey.CreateOrUpdateJourneyDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.service.JourneyService;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/v1/journey")
public class JourneyController {
    private final JourneyService journeyService;
    private final ModelMapper mapper;

    public JourneyController(JourneyService journeyService, ModelMapper mapper) {
        this.journeyService = journeyService;
        this.mapper = mapper;
    }

    @RequestMapping(method = GET, path = "")
    @CrossOrigin
    public List<JourneyWithDependenciesDto> getJourneys() {
        return journeyService.getAllJourneys().stream().map(
                o -> mapper.map(o, JourneyWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = POST, path = "")
    @CrossOrigin
    public JourneyWithDependenciesDto createJourney(@RequestBody CreateOrUpdateJourneyDto dto) {
        var createdJourney = journeyService.createOrUpdateJourney(
                mapper.map(dto, Journey.class)
        );
        return mapper.map(createdJourney, JourneyWithDependenciesDto.class);
    }

    @RequestMapping(method = GET, path = "/{id}")
    @CrossOrigin
    public JourneyWithDependenciesDto getJourney(@PathVariable Long id) throws NotFoundException {
        return mapper.map(journeyService.findById(id), JourneyWithDependenciesDto.class);
    }

    @RequestMapping(method = DELETE, path = "/{id}")
    @CrossOrigin
    public void deleteDevice(@PathVariable Long id) throws NotFoundException {
        journeyService.deleteJourneyById(id);
    }
}
