package com.clotho.project.Service;



import com.clotho.project.entity.Order;
import java.util.List;

public interface OrderService {
    Order saveOrder(Order order);
    List<Order> getOrdersByUserId(int userId);
    void deleteOrderById(int id);
    List<Order> findbyOrderId(String orderId);
}

