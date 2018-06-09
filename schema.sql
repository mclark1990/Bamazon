DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
item_id INT NOT NULL auto_increment,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price decimal(6,2) NOT NULL,
stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Shirt", "Clothing", 15.00, 10),
("Jeans", "Clothing", 45.00, 15),
("Soccer Ball", "Sports", 25.00, 10),
("Soccer Cleats", "Sports", 100.00, 20),
("Electric Guitar", "Musical Instruments", 500.00, 5),
("Acoustic Guitar", "Musical Instruments", 400.00, 10),
("Xbox One", "Gaming", 300.00, 30),
("PS4", "Gaming", 300.00, 25),
("Sofa", "Home", 1000.00, 10),
("Coffee Table", "Home", 350.00, 5);

SELECT * FROM products