/* Names: Paul Lim, Sonja Hanemann */
/* Group: 108 */
/* Project Title: Pedal Box Delivery */
/* Class: CS340 400 Introduction to Databases */
/* Description: Project Step 2 Draft: Normalized Schema + DDL with Sample Data */

/* Citation for the following function: Starter Code in Project Step 2 Draft Instructions */
/* Date: 02/08/24 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456214?module_item_id=23809320 */

/* Disable commits and foreign key checks. */
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

----------------------------------------------------
--Create tables
----------------------------------------------------

/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 3, Activity 3 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-3-creating-transaction-and-category-tables?module_item_id=23809299 */
/* Create Customers table. */

CREATE OR REPLACE TABLE Customers (
        customer_id int AUTO_INCREMENT UNIQUE NOT NULL,
        first_name varchar(45) NOT NULL, 
        last_name varchar(45) NOT NULL,
        user_id varchar(45) NOT NULL,
        email varchar(45) NOT NULL,
        street_1 varchar(45) NOT NULL,
        street_2 varchar(45),
        city varchar(45) NOT NULL,
        state varchar(2) NOT NULL,
        zip_code varchar(10) NOT NULL,
        phone varchar(20) NOT NULL,
        PRIMARY KEY (customer_id)
    );


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 3, Activity 3 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-3-creating-transaction-and-category-tables?module_item_id=23809299 */
/* Create Orders table. */

CREATE OR REPLACE TABLE Orders (
        order_id int AUTO_INCREMENT UNIQUE NOT NULL,
        customer_id int NOT NULL,
        restaurant_id int NOT NULL,
        courier_id int,
        order_date datetime NOT NULL,
        total_amount decimal(6,2) NOT NULL,
        courier_fee decimal(6,2) NOT NULL,
        delivery_status varchar(45) NOT NULL,
        PRIMARY KEY (order_id),
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
        FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id),
        FOREIGN KEY (courier_id) REFERENCES Couriers(courier_id)
    );


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 3, Activity 3 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-3-creating-transaction-and-category-tables?module_item_id=23809299 */
/* Create OrdersDetails table. */

CREATE OR REPLACE TABLE OrderDetails (
        orderdetails_id int AUTO_INCREMENT UNIQUE NOT NULL,
        order_id int NOT NULL,
        food_id int NOT NULL,
        order_qty int NOT NULL,
        unit_price decimal(6,2) NOT NULL,
        line_total decimal(6,2) NOT NULL,
        unit_courier_fee decimal(6,2) NOT NULL,
        line_fee_total decimal(6,2) NOT NULL,
        PRIMARY KEY (orderdetails_id),
        FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
        FOREIGN KEY (food_id) REFERENCES Foods(food_id)
    );


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 3, Activity 3 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-3-creating-transaction-and-category-tables?module_item_id=23809299 */

/* Create Foods table. */
CREATE OR REPLACE TABLE Foods (
        food_id int AUTO_INCREMENT UNIQUE NOT NULL,
        restaurant_id int NOT NULL,
        food_name varchar(45) NOT NULL,
        cost decimal(6,2) NOT NULL,
        PRIMARY KEY (food_id),
        FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
    );


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 3, Activity 3 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-3-creating-transaction-and-category-tables?module_item_id=23809299 */

/* Create Couriers table. */
CREATE OR REPLACE TABLE Couriers (
        courier_id int AUTO_INCREMENT UNIQUE NOT NULL,
        first_name varchar(45) NOT NULL, 
        last_name varchar(45) NOT NULL,
        email varchar(45) NOT NULL,
        street_1 varchar(45) NOT NULL,
        street_2 varchar(45),
        city varchar(45) NOT NULL,
        state varchar(2) NOT NULL,
        zip_code varchar(10) NOT NULL,
        phone varchar(20) NOT NULL,
        PRIMARY KEY (courier_id)
    );


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 3, Activity 3 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-3-creating-transaction-and-category-tables?module_item_id=23809299 */

/* Create Restaurants table. */
CREATE OR REPLACE TABLE Restaurants (
        restaurant_id int AUTO_INCREMENT UNIQUE NOT NULL,
        name varchar(45) NOT NULL, 
        street_1 varchar(45) NOT NULL,
        street_2 varchar(45),
        city varchar(45) NOT NULL,
        state varchar(2) NOT NULL,
        zip_code varchar(10) NOT NULL,
        phone varchar(20) NOT NULL,
        cuisine varchar(45) NOT NULL,
        PRIMARY KEY (restaurant_id)
    );

----------------------------------------------------
--Input data
----------------------------------------------------

/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 4, Activity 4 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307 */

/* Insert values into Customers table. */
INSERT INTO Customers(first_name, last_name, user_id, email, street_1, street_2, city, state, zip_code, phone)
VALUES
('Lucy', 'Sunval', 'ss2', 'Lsunval1@gmail.com', '4556 Johnson Dr', '', 'San Diego', 'CA', '92105', '555-935-6666'),
('Ben', 'McSmart', 'bm3', 'bm222@gmail.com', '901 Palm Ave','', 'San Diego', 'CA', '92122', '334-616-8356'),
('Tommy', 'Titan', 'tt1', 'glenbrooksouth@gbs.com', '4000 West Lake Ave','', 'Glenview', 'IL', '60025', '847-729-2000')
;


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 4, Activity 4 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307 */

/* Insert values into Orders table. */
INSERT INTO Orders(customer_id, restaurant_id, courier_id, order_date, total_amount, courier_fee, delivery_status)
VALUES
(1, 1, 2, '2024-12-01 18:25:00', 37.25, 2.98, 'delivered'),
(2, 2, 1, '2023-12-30 12:15:00', 75, 6, 'delivered'),
(3, 3, 3, '2024-12-04 17:50:00', 37.50, 3, 'picked up')
;


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 4, Activity 4 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307 */

/* Insert values into OrderDetails table. */
INSERT INTO OrderDetails(order_id, food_id, order_qty, unit_price, line_total, unit_courier_fee, line_fee_total)
VALUES
(1, 1, 2, 18.63, 37.25, 1.49, 2.98),
(2, 2, 1, 75, 75, 6, 6),
(3, 3, 1, 12.5, 12.5, 1, 1),
(3, 4, 1, 25, 25, 2, 2)
;


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 4, Activity 4 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307 */

/* Insert values into Foods table. */
INSERT INTO Foods(restaurant_id, food_name, cost)
VALUES
(1, 'Labskaus', 14.9),
(2, 'Sushi Platter', 60),
(3, 'Curywurst', 10),
(3, 'Kasespatzle', 20)
;


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 4, Activity 4 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307 */

/* Insert values into Couriers table. */
INSERT INTO Couriers(first_name, last_name, email, street_1, street_2, city, state, zip_code, phone)
VALUES
('Lilly', 'Flower', 'Lflower@hotmail.com', '1355 Handel St', '', 'San Diego', 'CA', '92101', '555-121-1212'),
('Abdu', 'Azul', 'aazul23@gmail.com', '4556 Johnson Dr', '', 'San Diego', 'CA', '92142', '555-333-3333'),
('Mesut', 'Hibiscus', 'soccerflower@gmail.com', '3920 Ozil Avenue', '', 'San Diego', 'CA', '92104', '123-434-1295')
;


/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Module 4, Activity 4 */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307 */

/* Insert values into Restaurants table. */
INSERT INTO Restaurants(name, street_1, street_2, city, state, zip_code, phone, cuisine)
VALUES
('Schlemmerbude', '5678 Cloud Dr', '', 'San Diego', 'CA', '92107','555-999-6666','German'),
('Sushi Roll', '123 Sun Ave', '', 'San Diego', 'CA', '91944', '555-616-8888', 'Japanese'),
('Spatis Hipster Corner', '111 Rain Street', '', 'San Diego', 'CA', '92104', '555-829-8490', 'German')
;

/* Date: 02/08/24 */
/* Citation for the following function: Starter Code in Project Step 2 Draft Instructions */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456214?module_item_id=23809320 */

/* Enable commits and foreign key checks. */

SET FOREIGN_KEY_CHECKS=1;
COMMIT;