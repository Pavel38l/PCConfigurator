package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vsu.Peredachka.data.dto.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.dto.OrderWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/api/v1")
public class CurrentUserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public CurrentUserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @RequestMapping(method = GET, path = "/{id}/orders")
    public List<OrderWithDependenciesDto> getOrders(@PathVariable Long id) throws NotFoundException {
        User user = userService.findById(id);
        return user.getOrders().stream().map(
                o -> modelMapper.map(o, OrderWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = GET, path = "/{id}/journeys")
    public List<JourneyWithDependenciesDto> getJourneys(@PathVariable Long id) throws NotFoundException {
        User user = userService.findById(id);
        return user.getJourneys().stream().map(
                o -> modelMapper.map(o, JourneyWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }
}
