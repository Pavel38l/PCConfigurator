package ru.vsu.Peredachka.data.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.OrderSize;

@Component
public interface OrderSizeRepository extends CrudRepository<OrderSize, Long> {
}
