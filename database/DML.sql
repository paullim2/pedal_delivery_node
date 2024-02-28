/* Names: Paul Lim, Sonja Hanemann */
/* Group: 108 */
/* Project Title: Pedal Box Delivery */
/* Class: CS340 400 Introduction to Databases */
/* Description: Project Step 3 Draft Version: Design HTML Interface + DML SQL */


/*Customer Page*/

/*Citation for the following functions:
Date: 02/13/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Get all data for the Customers page*/
SELECT Customers.customer_id, Customers.first_name, Customers.last_name, Customers.user_id, Customers.email, Customers.street_1, Customers.street_2, Customers.city, Customers.state, Customers.zip_code, Customers.phone 
FROM Customers;


/*Add new Customer*/ 
INSERT INTO Customers (first_name, last_name, user_id, email, street_1, street_2, city, state, zip_code, phone)
VALUES (:first_nameInput, :last_nameInput, :user_idInput, :emailInput, :street_1Input, :street_2Input, :cityInput, :stateInput, :zip_codeInput, :phoneInput);


/*Courier Page*/

/*Citation for the following functions:
Date: 02/13/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Get all data for the Couriers page*/
SELECT Couriers.couriers_id, Couriers.first_name, Couriers.last_name, Couriers.email, Couriers.street_1, Couriers.street_2, Couriers.city, Couriers.state, Couriers.zip_code, Couriers.phone
FROM Couriers;

/*Add a new courier*/ 
INSERT INTO Couriers (first_name, last_name, email, street_1, street_2, city, state, zip_code, phone)
VALUES (:first_nameInput, :last_nameInput, :emailInput, :street_1Input, :street_2Input, :cityInput, :stateInput, :zip_codeInput, :phoneInput);


/*Restaurants Page*/

/*Citation for the following functions:
Date: 02/13/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Get all data for the Restaurants page*/
SELECT Restaurants.restaurant_id, Restaurants.name, Restaurants.street_1, Restaurants.street_2, Restaurants.city, Restaurants.state, Restaurants.zip_code, Restaurants.phone, Restaurants.cuisine
FROM Restaurants;

/*Add a new restaurant*/ 
INSERT INTO Restaurants (name, street_1, street_2, city, state, zip_code, phone, cuisine)
VALUES (:nameInput, :street_1Input, :street_2Input, :cityInput, :stateInput, :zip_codeInput, :phoneInput, :cuisineInput);


/*Orders Page*/

/*Citation for the following functions:
Date: 02/13/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Get all data for the Orders page*/
SELECT Orders.order_id, Orders.customer_id, Orders.restaurant_id, Orders.courier_id, Orders.order_date, Orders.total_amount, Orders.courier_fee, Orders.delivery_status 
FROM Orders;

/*Add a new order*/ 
INSERT INTO Orders (customer_id, restaurant_id, courier_id, order_date, total_amount, courier_fee, delivery_status)
VALUES (:customer_idInput, :restaurant_idInput, :courier_idInput, :order_dateInput, :total_amountInput, :courier_feeInput, :delivery_statusInput);

/*Update order*/ 
UPDATE Orders 
SET 
WHERE order_id = :order_idInput; 


/*Foods Page*/

/*Citation for the following functions:
Date: 02/13/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Get all data for the Foods page*/
SELECT Foods.food_id, Foods.restaurant_id, Foods.food_name, Foods.cost
FROM Foods;

/*Add a new food*/ 
INSERT INTO Foods (restaurant_id, food_name, cost)
VALUES (:restaurant_idInput, :food_nameInput, :costInput);


/*Order Details Page*/

/*Citation for the following functions:
Date: 02/13/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Get all data for the Order Details page*/
SELECT OrderDetails.orderdetails_id, OrderDetails.order_id, OrderDetails.food_id, OrderDetails.order_qty, OrderDetails.unit_price, OrderDetails.line_total, OrderDetails.unit_courier_fee, OrderDetails.line_fee_total
FROM OrderDetails;

/*Add a new Order Details*/ 

INSERT INTO OrderDetails (order_id, food_id, order_qty, unit_price, line_total, unit_courier_fee, line_fee_total)
VALUES (:order_idInput, :food_idInput, :order_qtyInput, :unit_priceInput, :line_totalInput, :unit_courier_feeInput, :line_fee_totalInput);

/*Delete an Order Details*/
DELETE FROM OrderDetails WHERE order_id = :OrderDetails_ID_selected_from_browse_OrderDetails_page;

/*Update an OrderDetails's data based on submission of the Update OrderDetails form*/
UPDATE OrderDetails form 
SELECT OrderDetails.orderdetails_id, OrderDetails.order_id, OrderDetails.food_id, OrderDetails.order_qty, OrderDetails.unit_price, OrderDetails.line_total, OrderDetails.unit_courier_fee, OrderDetails.line_fee_total
   FROM OrderDetails;
   WHERE order_id = :OrderDetails_ID_selected_from_browse_OrderDetails_page;

UPDATE OrderDetails 
   SET order_id = :order_idInput, food_id = :food_idInput, order_qty = :order_qtyInput, unit_price = :unit_priceInput, line_total = :line_totalInput, unit_courier_fee = :unit_courier_feeInput, line_fee_total = :line_fee_totalInput
   WHERE order_id= :OrderDetails_ID_from_the_update_form;






