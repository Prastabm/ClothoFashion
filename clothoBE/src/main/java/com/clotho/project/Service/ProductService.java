package com.clotho.project.Service;

import java.util.List;

import com.clotho.project.entity.Product;

public interface ProductService {
	List<Product> getAllProducts();
    Product getProductById(int id);
    List<Product> getAllProductsByListby(String listby);
    List<Product> getAllProductsBySize(String size);
    List<Product> getProductsByName(String pname);
    List<Product> getAllListedProducts();
    Product createProduct(Product product);
    Product updateProduct(int id, Product product);
    void deleteProduct(int id);
}
