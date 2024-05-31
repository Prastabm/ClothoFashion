package com.clotho.project.controller;

import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.clotho.project.DTO.ProductDTO;
import com.clotho.project.DTO.ProductDiscountDTO;
import com.clotho.project.Service.ProductService;
import com.clotho.project.entity.Product;

import com.clotho.project.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService productService;
    
    @Autowired
    private ProductRepository repository;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return productService.getProductById(id);
    }
    @GetMapping("/listby/{listby}")
    public List<Product> getAllProductsByListby(@PathVariable String listby) {
        return productService.getAllProductsByListby(listby);
    }

    @GetMapping("/size/{size}")
    public List<Product> getAllProductsBySize(@PathVariable String size) {
        return productService.getAllProductsBySize(size);
    }
    
    @GetMapping("/byname/{name}")
    public List<Product> getProductsByName(@PathVariable String name) {
        return productService.getProductsByName(name);
    }

    @GetMapping("/listed")
    public List<Product> getAllListedProducts() {
        return productService.getAllListedProducts();
    }
    
    @PostMapping
    public Product uploadProduct(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart("img") MultipartFile img) throws IOException, SerialException, SQLException {

        
            Product product = new Product();
            product = copyDtoToProduct(productDTO,product);
            product.setCreatedDate(new Date());
        	product.setModifiedOn(new Date());
        	product.setImgType(img.getContentType());
        	try {
        		byte[] imgBytes = img.getBytes();
        		product.setImg(imgBytes);

        	return productService.createProduct(product);
        	}
        	catch(Error e) {
        		return (null);
        	}
        
    }
    
    @PostMapping("/calcDiscount")
    public int calculateDiscount(@RequestBody ProductDiscountDTO data) {
    	return discount(data); 
    }
    
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable int id, @RequestPart("product") ProductDTO product, @RequestPart(value = "img", required = false) MultipartFile img) throws IOException, SerialException, SQLException {
    	Product existingProd = repository.findById(id).orElse(null);
    	
    	/*existingProd.setPname(product.getPname());
    	existingProd.setPremium(product.getPremium());
    	existingProd.setPrice(product.getPrice());
    	existingProd.setCategory(product.getCategory());
    	existingProd.setAge(product.getAge());
    	existingProd.setPsize(product.getPsize());
    	existingProd.setDiscount(product.getDiscount());
    	existingProd.setQty(product.getQty());
    	existingProd.setListed(product.isListed());
    	existingProd.setModifiedBy(product.getModifiedBy());*/
    	
    	existingProd = copyDtoToProduct(product, existingProd);
    	existingProd.setModifiedOn(new Date());
    	
    	if(img!= null) {
    	try {
    		existingProd.setImgType(img.getContentType());
    		byte[] imgBytes = img.getBytes();
    		existingProd.setImg(imgBytes);

    		return productService.updateProduct(id, existingProd);
    	}
    	catch(Error e) {
    		return (null);
    	}}
    	return productService.updateProduct(id, existingProd);
        
    }
    
    @PutMapping("/unlist/{id}")
    public ResponseEntity<Product> unlistProduct(@PathVariable int id){
    	Product existingProduct = repository.findById(id)
                .orElse(null);
    	if (existingProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    	existingProduct.setListed(false);
    	productService.updateProduct(id, existingProduct);
    	return new ResponseEntity<>(existingProduct, HttpStatus.OK);
    }
    
    @PutMapping("/enlist/{id}")
    public ResponseEntity<Product> enlistProduct(@PathVariable int id){
    	Product existingProduct = repository.findById(id)
                .orElse(null);
    	if (existingProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    	existingProduct.setListed(true);
    	productService.updateProduct(id, existingProduct);
    	return new ResponseEntity<>(existingProduct, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }
    
    private int discount(ProductDiscountDTO data) {
    	int discount = 0;

        if (data.getAge() < 1) {
            if (data.getCondition().equalsIgnoreCase("best")) {
                discount = data.isPremium() ? 50 : 40;
            } else if (data.getCondition().equalsIgnoreCase("good")) {
                discount = data.isPremium() ? 45 : 38;
            } else if (data.getCondition().equalsIgnoreCase("avg")) {
                discount = data.isPremium() ? 42 : 35;
            }
        } else if (data.getAge() >= 1 && data.getAge() < 3) {
            if (data.getCondition().equalsIgnoreCase("best")) {
                discount = data.isPremium() ? 43 : 36;
            } else if (data.getCondition().equalsIgnoreCase("good")) {
                discount = data.isPremium() ? 39 : 33;
            } else if (data.getCondition().equalsIgnoreCase("avg")) {
                discount = data.isPremium() ? 37 : 30;
            }
        } else if (data.getAge() >= 3) {
            if (data.getCondition().equalsIgnoreCase("best")) {
                discount = data.isPremium() ? 40 : 25;
            } else if (data.getCondition().equalsIgnoreCase("good")) {
                discount = data.isPremium() ? 35 : 23;
            } else if (data.getCondition().equalsIgnoreCase("avg")) {
                discount = data.isPremium() ? 30 : 20;
            }
        }

        return discount;

    }
    
    public static <T> Product copyDtoToProduct(T dto, Product product) {
        Class<?> dtoClass = dto.getClass();
        Class<?> productClass = Product.class;

        Field[] dtoFields = dtoClass.getDeclaredFields();
        Field[] productFields = productClass.getDeclaredFields();

        for (Field dtoField : dtoFields) { // for each Field in dtoFields
            try {
                Field productField = getProductFieldByName(dtoField.getName(), productFields);
                if (productField != null && productField.getType().equals(dtoField.getType())) {
                    dtoField.setAccessible(true);
                    Object value = dtoField.get(dto);
                    if (value != null) {
                        productField.setAccessible(true);
                        productField.set(product, value);
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return product;
    }
    private static Field getProductFieldByName(String fieldName, Field[] productFields) {
        for (Field productField : productFields) {
            if (productField.getName().equals(fieldName)) {
                return productField;
            }
        }
        return null;
    }
}