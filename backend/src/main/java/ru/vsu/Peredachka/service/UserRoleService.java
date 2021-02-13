package ru.vsu.Peredachka.service;

import org.springframework.stereotype.Service;
import ru.vsu.Peredachka.data.entity.UserRole;
import ru.vsu.Peredachka.data.repository.UserRoleRepository;

@Service
public class UserRoleService {

    private final UserRoleRepository userRoleRepository;

    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public UserRole findByName(String name) {
        return userRoleRepository.findByName(name);
    }
}
