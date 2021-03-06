package ru.vsu.Peredachka.data.repository;

import org.aspectj.weaver.ast.Or;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.User;

import java.util.List;

@Component
public interface OrderRepository extends CrudRepository<Order, Long> {
    List<Order> findAllByJourneyIsNull();
  
    List<Order> findAllByJourney_Id(Long id);

    List<Order> findAllByJourneyIdAndOrderStatusNameNot(Long journeyId, String orderStatusName);

    List<Order> findAllByOwner_Id(Long id);
  
}
