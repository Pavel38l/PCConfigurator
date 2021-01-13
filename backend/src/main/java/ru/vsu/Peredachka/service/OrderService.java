package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.OrderSize;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.repository.OrderRepository;
import ru.vsu.Peredachka.data.repository.OrderSizeRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderSizeRepository orderSizeRepository;
    private final JourneyService journeyService;

    public OrderService(OrderRepository orderRepository, OrderSizeRepository orderSizeRepository, JourneyService journeyService) {
        this.orderRepository = orderRepository;
        this.orderSizeRepository = orderSizeRepository;
        this.journeyService = journeyService;
    }

    public List<Order> getAllOrders() {
        var result = new ArrayList<Order>();
        orderRepository.findAll().forEach(result::add);
        return result;
    }

    public List<Order> getAllOrdersWithoutJourney() {
        return orderRepository.findAllByJourneyIsNull();
    }

    public Order findById(Long id) throws NotFoundException {
        return orderRepository.findById(id).orElseThrow(() -> new NotFoundException("Order not found!"));
    }

    @Transactional // This annotation execute all request in one transaction
    public Order AddOrderToJourney(Long orderId, Long journeyId) throws NotFoundException {
        Order order = findById(orderId);
        Journey journey = journeyService.findById(journeyId);
        order.setJourney(journey);
        return createOrUpdateOrder(order);
    }

    public Order createOrUpdateOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrderById(Long id) throws NotFoundException {
        Order order = findById(id);
        orderRepository.delete(order);
    }

    public List<OrderSize> getAllOrderSize() {
        var result = new ArrayList<OrderSize>();
        orderSizeRepository.findAll().forEach(result::add);
        return result;
    }
}
