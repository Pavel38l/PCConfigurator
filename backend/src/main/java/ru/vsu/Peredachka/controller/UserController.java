package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.journey.JourneyInfoDto;
import ru.vsu.Peredachka.data.dto.order.OrderWithDependenciesDto;
import ru.vsu.Peredachka.data.dto.user.UserWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.mapper.JourneyInfoCostMapper;
import ru.vsu.Peredachka.service.OrderService;
import ru.vsu.Peredachka.service.UserService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final ModelMapper mapper;
    private final JourneyInfoCostMapper journeyMapper;
    private final OrderService orderService;

    public UserController(UserService userService, ModelMapper mapper, JourneyInfoCostMapper journeyMapper, OrderService orderService) {
        this.userService = userService;
        this.mapper = mapper;
        this.journeyMapper = journeyMapper;
        this.orderService = orderService;
    }
    @RequestMapping(method = GET, path = "/{id}")
    public UserWithDependenciesDto getUser(@PathVariable Long id) throws NotFoundException {
        return mapper.map(userService.findById(id), UserWithDependenciesDto.class);
    }


    @RequestMapping(method = GET, path = "")
    public List<UserWithDependenciesDto> getUsers() {
        return userService.getAllUsers().stream().map(
                o -> mapper.map(o, UserWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = GET, path = "/{id}/orders")
    public List<OrderWithDependenciesDto> getOrders(@PathVariable Long id) throws NotFoundException {
        User user = userService.findById(id);
        return user.getOrders().stream().map(
                o -> mapper.map(o, OrderWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = GET, path = "/{id}/journeys")
    public List<JourneyInfoDto> getJourneys(@PathVariable Long id) throws NotFoundException {
        User user = userService.findById(id);
        List<JourneyInfoDto> infosDto = user.getJourneys().stream().map(
                journeyMapper::toDto
        ).collect(Collectors.toList());
        Collections.sort(infosDto, JourneyInfoDto.COMPARE_BY_STARTDATE);
        return infosDto;
    }
    @RequestMapping(method = POST, path = "/update")
    public void update(@RequestBody User dto) {
         userService.update(dto);

    }
    //поменять ссыль
    @RequestMapping(method = GET, path = "/{id}/request-orders")
    public List<OrderWithDependenciesDto> getOtherOrders(@PathVariable Long id) throws NotFoundException {
        User user = userService.findById(id);
        List<Long> idJourneys = user.getJourneys().stream().map(
                Journey::getId
        ).collect(Collectors.toList());

        List<Order> otherOrders = idJourneys.stream().map(
                orderService::findByJourneyId
        ).flatMap(Collection::stream)
         .filter(o -> o.getOrderStatus().getId() == 1)
         .collect(Collectors.toList());

        return otherOrders.stream().map(
                o -> mapper.map(o, OrderWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }
    @RequestMapping(method = POST, path = "/{id}/rating-update")
    public void updateRating(@PathVariable Long id) throws NotFoundException {
        User user = userService.findById(id);
        List<Long> idJourneys = user.getJourneys().stream().map(
                Journey::getId
        ).collect(Collectors.toList());

        List<Order> ordersJourney = idJourneys.stream().map(
                orderService::findByJourneyId
        ).flatMap(Collection::stream)
                .collect(Collectors.toList());
        int count = 0;
        Integer rate = 0;
        for(Order o : ordersJourney){
            if(o.getRateJourney() != null) {
                rate += o.getRateJourney();
                count++;
            }
        }
        for(Order o : orderService.findByOwnerId(id)){
            if(o.getRateOrder() != null) {
                rate += o.getRateJourney();
                count++;
            }
        }
        rate = rate/count;
        userService.updateRating(id, rate);
    }
}
