package ru.vsu.Peredachka.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vsu.Peredachka.data.entity.UserRole;
import ru.vsu.Peredachka.data.repository.JourneyRepository;
import ru.vsu.Peredachka.data.repository.UserRepository;
import ru.vsu.Peredachka.data.repository.UserRoleRepository;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class TestController {
    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final JourneyRepository journeyRepository;


    public TestController(UserRoleRepository userRoleRepository, UserRepository userRepository, JourneyRepository journeyRepository) {
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.journeyRepository = journeyRepository;
    }

    @RequestMapping(method = GET, path = "/roles")
    public Iterable<UserRole> userRole() {
        return userRoleRepository.findAll();
    }
}
