package ru.vsu.Peredachka.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.User;

import java.util.List;

@Component
public interface JourneyRepository extends CrudRepository<Journey, Long> {
    List<Journey> findAllByOwner(Journey journey);
}
