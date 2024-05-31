package com.clotho.project.Service;

import com.clotho.project.entity.Order;
import com.clotho.project.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByUserId(int userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public void deleteOrderById(int id) {
        orderRepository.deleteById(id);
    }
    @Override
    public List<Order> findbyOrderId(String orderId){
    	return orderRepository.findByOrderId(orderId);
    }
}
