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
        PRIMARY KEY (orderdetails_id)
        -- FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
        -- FOREIGN KEY (food_id) REFERENCES Foods(food_id)
    );

----------------------------------------------------
--Input data
----------------------------------------------------

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
/* Citation for the following function: Starter Code in Project Step 2 Draft Instructions */
/* Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456214?module_item_id=23809320 */

/* Enable commits and foreign key checks. */

SET FOREIGN_KEY_CHECKS=1;
COMMIT;