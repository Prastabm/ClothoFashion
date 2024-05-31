package com.clotho.project.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clotho.project.entity.Product;
import com.clotho.project.repository.ProductRepository;

@Service
public class ProductServiceImp implements ProductService{
	
	@Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Product> getAllProductsByListby(String listby) {
        return productRepository.findByListby(listby);
    }

    @Override
    public List<Product> getAllProductsBySize(String size) {
        return productRepository.findByPsize(size);
    }
    
    @Override
    public List<Product> getProductsByName(String pname) {
        return productRepository.findByPname(pname);
    }

    @Override
    public List<Product> getAllListedProducts() {
        return productRepository.findByListedTrue();
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(int id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setPname(product.getPname());
            existingProduct.setPremium(product.getPremium());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setAge(product.getAge());
            existingProduct.setPsize(product.getPsize());
            existingProduct.setDiscount(product.getDiscount());
            existingProduct.setQty(product.getQty());
            existingProduct.setImg(product.getImg());
            existingProduct.setListed(product.isListed());
            existingProduct.setCreatedDate(product.getCreatedDate());
            existingProduct.setListby(product.getListby());
            existingProduct.setModifiedOn(product.getModifiedOn());
            existingProduct.setModifiedBy(product.getModifiedBy());
            return productRepository.save(existingProduct);
        }
        return null;
    }
    

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
}
