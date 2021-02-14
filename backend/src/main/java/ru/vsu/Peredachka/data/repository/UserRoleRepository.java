package ru.vsu.Peredachka.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.UserRole;

@Component
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
    UserRole findByName(String name);
}
