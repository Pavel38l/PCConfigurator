package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.commons.Status;
import ru.vsu.Peredachka.data.dto.StatusDto;
import ru.vsu.Peredachka.data.dto.journey.CreateOrUpdateJourneyDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyWithDependenciesDto;
import ru.vsu.Peredachka.data.dto.order.CreateOrUpdateOrderDto;
import ru.vsu.Peredachka.data.dto.order.OrderDto;
import ru.vsu.Peredachka.data.dto.order.OrderWithDependenciesDto;
import ru.vsu.Peredachka.data.dto.sms.DeliveryDto;
import ru.vsu.Peredachka.data.dto.sms.DeliveryPrepareDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.OrderSize;
import ru.vsu.Peredachka.data.entity.OrderStatus;
import ru.vsu.Peredachka.service.JourneyService;
import ru.vsu.Peredachka.service.OrderService;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;
    private final ModelMapper mapper;
    private final JourneyService journeyService;

    public OrderController(OrderService orderService, ModelMapper mapper, JourneyService journeyService) {
        this.orderService = orderService;
        this.mapper = mapper;
        this.journeyService = journeyService;
    }

    @RequestMapping(method = GET, path = "")
    public List<OrderWithDependenciesDto> getOrders() {
        return orderService.getAllOrders().stream().map(
                o -> mapper.map(o, OrderWithDependenciesDto.class)
        ).collect(Collectors.toList());
    }

    @RequestMapping(method = GET, path = "/journey/{journeyId}")
    public List<OrderWithDependenciesDto> getAllJourneyOrders(@PathVariable Long journeyId) {
        return orderService.getAllJourneyOrders(journeyId).stream().map(
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
    @RequestMapping(method = POST, path = "/{id}/accept")
    public void acceptOrder(@PathVariable Long id) throws NotFoundException {
        orderService.updateStatus(id, "defined");
    }
    @RequestMapping(method = POST, path = "/{id}/cancel")
    public void cancelOrder(@PathVariable Long id) throws NotFoundException {
        orderService.updateStatus(id, "canceled");
    }
    @RequestMapping(method = DELETE, path = "/{id}")
    public void deleteOrder(@PathVariable Long id) throws NotFoundException {
        orderService.deleteOrderById(id);
    }

    @CrossOrigin
    @RequestMapping(method = POST, path = "/prepare-delivery")
    public void prepareOrderDelivery(@RequestBody DeliveryPrepareDto dto) throws IOException {
        orderService.prepareOrderDelivery(dto);
    }

    @CrossOrigin
    @RequestMapping(method = POST, path = "/deliver")
    public StatusDto orderDelivery(@RequestBody DeliveryDto dto) {
        Status status = orderService.orderDelivery(dto);
        return StatusDto.builder()
                .status(status)
                .build();
    }
    @RequestMapping(method = POST, path = "/{id}/rate-order/{rate}")
    public void updateRateOrder(@PathVariable Long id, @PathVariable Integer rate) throws NotFoundException {
        orderService.updateRateOrder(id,rate*20);
    }

    @RequestMapping(method = POST, path = "/{id}/rate-journey/{rate}")
    public void updateRateJourney(@PathVariable Long id, @PathVariable Integer rate) throws NotFoundException {
        orderService.updateRateJourney(id,rate*20);
    }

    @RequestMapping(method = GET, path = "/{id}/journey-owner")
    public UserDto getJourneyOwnerId(@PathVariable Long id) throws NotFoundException {
        return mapper.map(journeyService.findById(id).getOwner(), UserDto.class);
    }
}
