package ru.vsu.Peredachka.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.TravelPoint;

@Component
public interface TravelPointRepository extends CrudRepository<TravelPoint, Long> {
}
