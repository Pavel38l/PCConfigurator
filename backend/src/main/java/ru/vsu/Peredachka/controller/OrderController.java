package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.journey.CreateOrUpdateJourneyDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.dto.order.CreateOrUpdateOrderDto;
import ru.vsu.Peredachka.data.dto.order.OrderDto;
import ru.vsu.Peredachka.data.dto.order.OrderWithDependenciesDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.OrderSize;
import ru.vsu.Peredachka.data.entity.OrderStatus;
import ru.vsu.Peredachka.service.OrderService;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;
    private final ModelMapper mapper;

    public OrderController(OrderService orderService, ModelMapper mapper) {
        this.orderService = orderService;
        this.mapper = mapper;
    }

    @RequestMapping(method = GET, path = "")
    public List<OrderWithDependenciesDto> getOrders() {
        return orderService.getAllOrders().stream().map(
                o -> mapper.map(o, OrderWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = GET, path = "/orderSizes")
    public List<OrderSize> getOrderSize() {
        return orderService.getAllOrderSize();
    }

    @RequestMapping(method = POST, path = "")
    public OrderDto createOrder(@RequestBody CreateOrUpdateOrderDto dto) {
        Order order = mapper.map(dto, Order.class);
        OrderStatus orderStatus = new OrderStatus();
        orderStatus.setId(1L);
        order.setOrderStatus(orderStatus);
        Order createdOrder = orderService.createOrUpdateOrder(
                order
        );
        return mapper.map(createdOrder, OrderDto.class);
    }

    @RequestMapping(method = GET, path = "/{id}")
    public OrderWithDependenciesDto getOrder(@PathVariable Long id) throws NotFoundException {
        return mapper.map(orderService.findById(id), OrderWithDependenciesDto.class);
    }

    @RequestMapping(method = DELETE, path = "/{id}")
    public void deleteOrder(@PathVariable Long id) throws NotFoundException {
        orderService.deleteOrderById(id);
    }
}
