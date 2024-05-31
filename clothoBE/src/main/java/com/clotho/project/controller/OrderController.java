package com.clotho.project.controller;
import com.clotho.project.entity.Order;
import com.clotho.project.entity.Product;
import com.clotho.project.repository.OrderRepository;
import com.clotho.project.repository.ProductRepository;
import com.clotho.project.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private OrderRepository orderrepo;
    
    @Autowired
    private ProductRepository prodrepo;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
    	Product existingProd = prodrepo.findById(order.getProductId()).orElse(null); 
    	if(existingProd !=null && existingProd.getQty()>= order.getQuantity()) {
    		existingProd.setQty(existingProd.getQty() - order.getQuantity());
    		if(existingProd.getQty() == 0) existingProd.setListed(false);
    		prodrepo.save(existingProd);
    		return orderService.saveOrder(order);
    	}
    	else {
    		return null;
    	}
        
    }
    
    @GetMapping
    public List<Order> getAllOrders(){
    	return orderrepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable int userId) {
        return orderService.getOrdersByUserId(userId);
    }
    @GetMapping("/orders/{orderId}")
    public List<Order> getOrdersbyOrderId(@PathVariable String orderId) {
        return orderService.findbyOrderId(orderId);
    }

    @PutMapping("/cancel/{id}")
    public Order deleteOrder(@PathVariable int id) {
        Order item = orderrepo.findById(id).orElse(null);
        if (item!=null) {
        	item.setActive(false);
        	return orderrepo.save(item);
        }
        else {
        	return item;
        }
    }
}

