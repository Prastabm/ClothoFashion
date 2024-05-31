package com.clotho.project.DTO;

public class ProductUpdateDTO {
	 	private String pname;
	    private String premium;
	    private int price;
	    private String category;
	    private int age;
	    private String psize;
	    private int discount;
	    private int qty;
	    private String img;
	    private boolean isListed;
	    private String modifiedBy;

	    // Getters and setters for all fields
	    // You can generate these using your IDE or write them manually

	    public String getPname() {
	        return pname;
	    }

	    public void setPname(String pname) {
	        this.pname = pname;
	    }

	    public String getPremium() {
	        return premium;
	    }

	    public void setPremium(String premium) {
	        this.premium = premium;
	    }

	    public int getPrice() {
	        return price;
	    }

	    public void setPrice(int price) {
	        this.price = price;
	    }

	    public String getCategory() {
	        return category;
	    }

	    public void setCategory(String category) {
	        this.category = category;
	    }

	    public int getAge() {
	        return age;
	    }

	    public void setAge(int age) {
	        this.age = age;
	    }

	    public String getPsize() {
	        return psize;
	    }

	    public void setPsize(String psize) {
	        this.psize = psize;
	    }

	    public int getDiscount() {
	        return discount;
	    }

	    public void setDiscount(int discount) {
	        this.discount = discount;
	    }

	    public int getQty() {
	        return qty;
	    }

	    public void setQty(int qty) {
	        this.qty = qty;
	    }

	    public String getImg() {
	        return img;
	    }

	    public void setImg(String img) {
	        this.img = img;
	    }

	    public boolean isListed() {
	        return isListed;
	    }

	    public void setListed(boolean listed) {
	        isListed = listed;
	    }

	    public String getModifiedBy() {
	        return modifiedBy;
	    }

	    public void setModifiedBy(String modifiedBy) {
	        this.modifiedBy = modifiedBy;
	    }
}
