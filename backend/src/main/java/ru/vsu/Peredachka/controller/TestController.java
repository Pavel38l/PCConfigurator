package ru.vsu.Peredachka.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.entity.UserRole;
import ru.vsu.Peredachka.data.repository.*;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class TestController {
    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final JourneyRepository journeyRepository;
    private final TravelPointRepository travelPointRepository;
    private final OrderRepository orderRepository;


    public TestController(UserRoleRepository userRoleRepository, UserRepository userRepository, JourneyRepository journeyRepository, TravelPointRepository travelPointRepository, OrderRepository orderRepository) {
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.journeyRepository = journeyRepository;
        this.travelPointRepository = travelPointRepository;
        this.orderRepository = orderRepository;
    }

    @RequestMapping(method = GET, path = "/roles")
    public Iterable<UserRole> userRole() {
        Iterable<UserRole> list = userRoleRepository.findAll();
        return list;
    }

    @RequestMapping(method = GET, path = "/user")
    public User user() {
       User user = userRepository.findById(1L).orElseThrow();
       return user;
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
