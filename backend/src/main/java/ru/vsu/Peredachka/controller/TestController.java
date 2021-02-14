package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vsu.Peredachka.data.dto.MsgDto;
import ru.vsu.Peredachka.data.dto.user.UserDto;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.entity.UserRole;
import ru.vsu.Peredachka.data.repository.*;
import ru.vsu.Peredachka.security.CustomUserDetails;
import ru.vsu.Peredachka.service.OrderService;
import ru.vsu.Peredachka.service.UserService;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/test")
public class TestController {
    private final UserRoleRepository userRoleRepository;
    private final UserService userService;
    private final JourneyRepository journeyRepository;
    private final TravelPointRepository travelPointRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final ModelMapper modelMapper;


    public TestController(UserRoleRepository userRoleRepository, UserService userService, JourneyRepository journeyRepository, TravelPointRepository travelPointRepository, OrderRepository orderRepository, OrderService orderService, ModelMapper modelMapper) {
        this.userRoleRepository = userRoleRepository;
        this.userService = userService;
        this.journeyRepository = journeyRepository;
        this.travelPointRepository = travelPointRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.modelMapper = modelMapper;
    }

    @RequestMapping(method = GET, path = "/admin/1")
    public MsgDto adminTest(Authentication auth) {
        var details = (CustomUserDetails)auth.getPrincipal();
        String email = details.getEmail();
        return new MsgDto("Security admin endpoint! " + email + " has entered!");
    }

    @RequestMapping(method = GET, path = "/user/1")
    public MsgDto userTest(Authentication auth) {
        var details = (CustomUserDetails)auth.getPrincipal();
        String email = details.getEmail();
        return new MsgDto("Security user endpoint! " + email + " has entered!");
    }

    @RequestMapping(method = GET, path = "/roles")
    @CrossOrigin
    public Iterable<UserRole> userRole() {
        Iterable<UserRole> list = userRoleRepository.findAll();
        return list;
    }

    @RequestMapping(method = GET, path = "/user")
    @CrossOrigin
    public UserDto user() throws NotFoundException {
       User user = userService.findById(10L);
       UserDto userDto = modelMapper.map(user, UserDto.class);
       return userDto;
    }

    @RequestMapping(method = GET, path = "/point")
    @CrossOrigin
    public TravelPoint point() {
        TravelPoint point = travelPointRepository.findById(2L).orElseThrow();
        return point;
    }

    @RequestMapping(method = GET, path = "/order")
    @CrossOrigin
    public Order order() {
        Order order = orderRepository.findById(1L).orElseThrow();
        return order;
    }
}
