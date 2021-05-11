package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.Peredachka.data.commons.Status;
import ru.vsu.Peredachka.data.dto.sms.DeliveryDto;
import ru.vsu.Peredachka.data.dto.sms.DeliveryPrepareDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.OrderSize;
import ru.vsu.Peredachka.data.entity.OrderStatus;
import ru.vsu.Peredachka.data.repository.OrderRepository;
import ru.vsu.Peredachka.data.repository.OrderSizeRepository;
import ru.vsu.Peredachka.data.repository.OrderStatusRepository;
import ru.vsu.Peredachka.service.sms.PasswordGenerator;
import ru.vsu.Peredachka.service.sms.SMSMessage;
import ru.vsu.Peredachka.service.sms.SmsSender;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderSizeRepository orderSizeRepository;
    private final JourneyService journeyService;
    private final PasswordGenerator passwordGenerator;
    private final SMSMessage smsMessage;
    private final SmsSender smsSender;
    private final PasswordEncoder passwordEncoder;
    private final OrderStatusRepository orderStatusRepository;

    public OrderService(OrderRepository orderRepository, OrderSizeRepository orderSizeRepository, JourneyService journeyService, PasswordGenerator passwordGenerator, SMSMessage smsMessage, SmsSender smsSender, PasswordEncoder passwordEncoder, OrderStatusRepository orderStatusRepository) {
        this.orderRepository = orderRepository;
        this.orderSizeRepository = orderSizeRepository;
        this.journeyService = journeyService;
        this.passwordGenerator = passwordGenerator;
        this.smsMessage = smsMessage;
        this.smsSender = smsSender;
        this.passwordEncoder = passwordEncoder;
        this.orderStatusRepository = orderStatusRepository;
    }

    public List<Order> getAllOrders() {
        var result = new ArrayList<Order>();
        orderRepository.findAll().forEach(result::add);
        return result;
    }

    public List<Order> getAllJourneyOrders(Long journeyId) {
        var result = new ArrayList<Order>();
        orderRepository.findAllByJourneyIdAndOrderStatusNameNot(journeyId, "offered").forEach(result::add);
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

    public void prepareOrderDelivery(DeliveryPrepareDto dto) throws IOException {
        String code = passwordGenerator.generatePassword(6);
        //System.out.println(code);
        smsSender.sendMessage(dto.getReceiverPhoneNumber(), smsMessage.generateDeliveryMessage(code));
        code = passwordEncoder.encode(code);
        Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
        order.setCode(code);
        orderRepository.save(order);
    }

    public Status orderDelivery(DeliveryDto dto) {
        Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
        if (passwordEncoder.matches(dto.getCode(), order.getCode())) {
            OrderStatus orderStatus = orderStatusRepository.findByName("completed").orElseThrow();
            order.setOrderStatus(orderStatus);
            orderRepository.save(order);
            return Status.OK;
        } else {
            return Status.FAIL;
        }
    }
}
