package ru.vsu.Peredachka.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.Journey;

@Component
public interface JourneyRepository extends CrudRepository<Journey, Long> {
}
