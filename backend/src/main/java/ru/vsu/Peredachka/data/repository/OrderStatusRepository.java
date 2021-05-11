package ru.vsu.Peredachka.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.OrderStatus;

import java.util.Optional;

@Component
public interface OrderStatusRepository extends CrudRepository<OrderStatus, Long> {
    Optional<OrderStatus> findByName(String name);
}
