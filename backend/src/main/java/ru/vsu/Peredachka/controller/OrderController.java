package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.journey.CreateOrUpdateJourneyDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.dto.order.OrderWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.service.OrderService;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;
    private final ModelMapper mapper;

    public OrderController(OrderService orderService, ModelMapper mapper) {
        this.orderService = orderService;
        this.mapper = mapper;
    }

    @RequestMapping(method = GET, path = "")
    @CrossOrigin
    public List<OrderWithDependenciesDto> getOrders() {
        return orderService.getAllOrders().stream().map(
                o -> mapper.map(o, OrderWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = POST, path = "")
    @CrossOrigin
    public JourneyWithDependenciesDto createOrder(@RequestBody CreateOrUpdateJourneyDto dto) {
        var createdJourney = orderService.createOrUpdateOrder(
                mapper.map(dto, Order.class)
        );
        return mapper.map(createdJourney, JourneyWithDependenciesDto.class);
    }

    @RequestMapping(method = GET, path = "/{id}")
    @CrossOrigin
    public OrderWithDependenciesDto getOrder(@PathVariable Long id) throws NotFoundException {
        return mapper.map(orderService.findById(id), OrderWithDependenciesDto.class);
    }

    @RequestMapping(method = DELETE, path = "/{id}")
    @CrossOrigin
    public void deleteDevice(@PathVariable Long id) throws NotFoundException {
        orderService.deleteOrderById(id);
    }
}
