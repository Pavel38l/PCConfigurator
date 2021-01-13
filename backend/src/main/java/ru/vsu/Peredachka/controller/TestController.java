package ru.vsu.Peredachka.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.entity.UserRole;
import ru.vsu.Peredachka.data.repository.*;
import ru.vsu.Peredachka.service.OrderService;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class TestController {
    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final JourneyRepository journeyRepository;
    private final TravelPointRepository travelPointRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;


    public TestController(UserRoleRepository userRoleRepository, UserRepository userRepository, JourneyRepository journeyRepository, TravelPointRepository travelPointRepository, OrderRepository orderRepository, OrderService orderService) {
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.journeyRepository = journeyRepository;
        this.travelPointRepository = travelPointRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }

    @RequestMapping(method = GET, path = "/roles")
    public Iterable<UserRole> userRole() {
        Iterable<UserRole> list = userRoleRepository.findAll();
        return list;
    }

    @RequestMapping(method = GET, path = "/user")
    public List<Order> user() {
       User user = userRepository.findById(2L).orElseThrow();
       var result = orderService.getAllUserOrders(user);
       return result;
    }

    @RequestMapping(method = GET, path = "/point")
    public TravelPoint point() {
        TravelPoint point = travelPointRepository.findById(2L).orElseThrow();
        return point;
    }

    @RequestMapping(method = GET, path = "/order")
    public Order order() {
        Order order = orderRepository.findById(1L).orElseThrow();
        return order;
    }
}
