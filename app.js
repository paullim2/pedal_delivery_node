/* Date: 02/29/24 */
/* Citation for the following function: nodejs starter app */
/* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/ */


/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

// app.js - SETUP section

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


PORT        = 60028;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



/*
    ROUTES
*/

/*
    GET ROUTES
*/


app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM bsg_people;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


app.get('/customers', function(req, res)
    {  
        let getCustomers = "SELECT * FROM Customers;";          

        db.pool.query(getCustomers, function(error, rows, fields){   

            res.render('customers', {data: rows});                  
        })                                                      
    });                                                        


    

app.get('/couriers', function(req, res)
    {  
        let getCouriers = "SELECT * FROM Couriers;";          

        db.pool.query(getCouriers, function(error, rows, fields){   

            res.render('couriers', {data: rows});                  
        })                                                      
    });      

app.get('/restaurants', function(req, res)
    {  
        let getRestaurants = "SELECT * FROM Restaurants;";          

        db.pool.query(getRestaurants, function(error, rows, fields){   

            res.render('restaurants', {data: rows});                  
        })                                                      
    });      


app.get('/orders', function(req, res)
{  

    // Declare Query 1
    let query1 = "SELECT * FROM Orders;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Customers;";

    // Query 2 is the same in both cases
    let query3 = "SELECT * FROM Restaurants;";

    // Query 2 is the same in both cases
    let query4 = "SELECT * FROM Couriers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the foods
        let orders = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the foods
            let customers = rows;

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let customermap = {}
            customers.map(customer => {
                let customer_id = parseInt(customer.customer_id, 10);

                customermap[customer_id] = customer["user_id"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            orders = orders.map(order => {
                return Object.assign(order, {customer_id: customermap[order.customer_id]})
            })

            // Run the third query
            db.pool.query(query3, (error, rows, fields) => {
                
                // Save the foods
                let restaurants = rows;

                // BEGINNING OF NEW CODE

                // Construct an object for reference in the table
                // Array.map is awesome for doing something with each
                // element of an array.
                let restaurantmap = {}
                restaurants.map(restaurant => {
                    let restaurant_id = parseInt(restaurant.restaurant_id, 10);

                    restaurantmap[restaurant_id] = restaurant["name"];
                })

                // Overwrite the homeworld ID with the name of the planet in the people object
                orders = orders.map(order => {
                    return Object.assign(order, {restaurant_id: restaurantmap[order.restaurant_id]})
                })
            
                db.pool.query(query4, (error, rows, fields) => {
                    
                    // Save the foods
                    let couriers = rows;

                    // BEGINNING OF NEW CODE

                    // Construct an object for reference in the table
                    // Array.map is awesome for doing something with each
                    // element of an array.
                    let couriermap = {}
                    couriers.map(courier => {
                        let courier_id = parseInt(courier.courier_id, 10);

                        couriermap[courier_id] = courier["email"];
                    })

                    // Overwrite the homeworld ID with the name of the planet in the people object
                    orders = orders.map(order => {
                        return Object.assign(order, {courier_id: couriermap[order.courier_id]})
                    })

                    // END OF NEW CODE

                    return res.render('orders', {data: orders, customers: customers, restaurants: restaurants, couriers: couriers});
                }) 
            })
        })
    })                                           // will process this file, before sending the finished HTML to the client.
});  


  

app.get('/foods', function(req, res)
    {  

        // Declare Query 1
        let query1 = "SELECT * FROM Foods;";

        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Restaurants;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
            // Save the foods
            let foods = rows;
            
            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
                
                // Save the foods
                let restaurants = rows;

                // BEGINNING OF NEW CODE

                // Construct an object for reference in the table
                // Array.map is awesome for doing something with each
                // element of an array.
                let restaurantmap = {}
                restaurants.map(restaurant => {
                    let restaurant_id = parseInt(restaurant.restaurant_id, 10);

                    restaurantmap[restaurant_id] = restaurant["name"];
                })

                // Overwrite the homeworld ID with the name of the planet in the people object
                foods = foods.map(food => {
                    return Object.assign(food, {restaurant_id: restaurantmap[food.restaurant_id]})
                })

                // END OF NEW CODE

                return res.render('foods', {data: foods, restaurants: restaurants});
            })
        });                                           // will process this file, before sending the finished HTML to the client.
    });  



app.get('/orderdetails', function(req, res)
    {  
        // Declare Query 1
        let query1 = "SELECT * FROM OrderDetails;";

        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Foods;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
            // Save the orderdetails
            let orderdetails = rows;
            
            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
                
                // Save the foods
                let foods = rows;

                // BEGINNING OF NEW CODE

                // Construct an object for reference in the table
                // Array.map is awesome for doing something with each
                // element of an array.
                let foodmap = {}
                foods.map(food => {
                    let food_id = parseInt(food.food_id, 10);

                    foodmap[food_id] = food["food_name"];
                })

                // Overwrite the homeworld ID with the name of the planet in the people object
                orderdetails = orderdetails.map(orderdetail => {
                    return Object.assign(orderdetail, {food_id: foodmap[orderdetail.food_id]})
                })

                // END OF NEW CODE

                return res.render('orderdetails', {data: orderdetails, foods: foods});
            })
        });                                           // will process this file, before sending the finished HTML to the client.
    });  



/*
    ADD ROUTES
*/


/*
OrderDetails page
*/
app.post('/add-orderdetails-ajax', function(req, res) 
{
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Capture NULL values
   let order_id = parseInt(data.order_id);
   if (isNaN(order_id))
   {
       order_id = 'NULL'
   }

   let food_id = parseInt(data.food_id);
   if (isNaN(food_id))
   {
       food_id = 'NULL'
   }

   let order_qty = parseInt(data.order_qty);
   if (isNaN(order_qty))
   {
       order_qty = 'NULL'
   }

   let unit_price = parseFloat(data.unit_price);
   if (isNaN(unit_price))
   {
       unit_price = 'NULL'
   }

   let line_total = parseFloat(data.line_total);
   if (isNaN(line_total))
   {
       line_total = 'NULL'
   }

   let unit_courier_fee = parseFloat(data.unit_courier_fee);
   if (isNaN(unit_courier_fee))
   {
       unit_courier_fee = 'NULL'
   }

   let line_fee_total = parseFloat(data.line_fee_total);
   if (isNaN(line_fee_total))
   {
       line_fee_total = 'NULL'
   }


    // Create the query and run it on the database
    query1 = `INSERT INTO OrderDetails (order_id, food_id, order_qty, unit_price, line_total, unit_courier_fee, line_fee_total) VALUES ('${data.order_id}', '${data.food_id}', '${data.order_qty}', '${data.unit_price}', '${data.line_total}', '${data.unit_courier_fee}', '${data.line_fee_total}' )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
       
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM OrderDetails;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

/*
Customers page
*/
app.post('/add-customers-ajax', function(req, res) 
{
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Capture NULL values
   let customer_id = parseInt(data.customer_id);
   if (isNaN(customer_id))
   {
    customer_id = 'NULL'
   }

   let first_name = parseInt(data.first_name);
   if (isNaN(first_name))
   {
    first_name = 'NULL'
   }

   let last_name = parseInt(data.last_name);
   if (isNaN(last_name))
   {
    last_name = 'NULL'
   }

   let user_id = parseFloat(data.user_id);
   if (isNaN(user_id))
   {
    user_id = 'NULL'
   }

   let email = parseFloat(data.email);
   if (isNaN(email))
   {
    email = 'NULL'
   }

   let street_1 = parseFloat(data.street_1);
   if (isNaN(street_1))
   {
    street_1 = 'NULL'
   }

   let street_2 = parseFloat(data.street_2);
   if (isNaN(street_2))
   {
    street_2 = 'NULL'
   }

   let city = parseFloat(data.city);
   if (isNaN(city))
   {
    city = 'NULL'
   }

   let state = parseFloat(data.state);
   if (isNaN(state))
   {
    state = 'NULL'
   }

   let zip_code = parseFloat(data.zip_code);
   if (isNaN(zip_code))
   {
    zip_code = 'NULL'
   }

   let phone = parseFloat(data.phone);
   if (isNaN(phone))
   {
    phone = 'NULL'
   }


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customer_id, first_name, last_name, user_id, email, street_1, street_2, city, state, zip_code, phone) VALUES ('${data.customer_id}', '${data.first_name}', '${data.last_name}', '${data.user_id}', '${data.email}', '${data.street_1}', '${data.street_2}', '${data.city}', '${data.state}', '${data.zip_code}','${data.phone}'  )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
       
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



/*
Foods page
*/
app.post('/add-foods-ajax', function(req, res) 
{
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Capture NULL values
   let food_id = parseInt(data.food_id);
   if (isNaN(food_id))
   {
    food_id = 'NULL'
   }

   let restaurant_id = parseInt(data.restaurant_id);
   if (isNaN(restaurant_id))
   {
    restaurant_id = 'NULL'
   }

   let food_name = parseInt(data.food_name);
   if (isNaN(food_name))
   {
    food_name = 'NULL'
   }

   let cost = parseFloat(data.cost);
   if (isNaN(cost))
   {
    cost = 'NULL'
   }

   

    // Create the query and run it on the database
    query1 = `INSERT INTO Foods (food_id, restaurant_id, food_name, cost) VALUES ('${data.food_id}', '${data.restaurant_id}', '${data.food_name}', '${data.cost}'  )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
       
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Foods;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

/*
Couriers page
*/
app.post('/add-couriers-ajax', function(req, res) 
{
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Capture NULL values
   let courier_id = parseInt(data.courier_id);
   if (isNaN(courier_id))
   {
    courier_id = 'NULL'
   }

   let first_name = parseInt(data.first_name);
   if (isNaN(first_name))
   {
    first_name = 'NULL'
   }

   let last_name = parseInt(data.last_name);
   if (isNaN(last_name))
   {
    last_name = 'NULL'
   }

   let email = parseFloat(data.email);
   if (isNaN(email))
   {
    email = 'NULL'
   }

   let street_1 = parseFloat(data.street_1);
   if (isNaN(street_1))
   {
    street_1 = 'NULL'
   }

   let street_2 = parseFloat(data.street_2);
   if (isNaN(street_2))
   {
    street_2 = 'NULL'
   }

   let city = parseFloat(data.city);
   if (isNaN(city))
   {
    city = 'NULL'
   }

   let state = parseFloat(data.state);
   if (isNaN(state))
   {
    state = 'NULL'
   }

   let zip_code = parseFloat(data.zip_code);
   if (isNaN(zip_code))
   {
    zip_code = 'NULL'
   }

   let phone = parseFloat(data.phone);
   if (isNaN(phone))
   {
    phone = 'NULL'
   }


    // Create the query and run it on the database
    query1 = `INSERT INTO Couriers (courier_id, first_name, last_name, email, street_1, street_2, city, state, zip_code, phone) VALUES ('${data.courier_id}', '${data.first_name}', '${data.last_name}', '${data.email}', '${data.street_1}', '${data.street_2}', '${data.city}', '${data.state}', '${data.zip_code}','${data.phone}'  )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
       
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Couriers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

/*
Restaurants page
*/
app.post('/add-restaurants-ajax', function(req, res) 
{
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Capture NULL values
   let restaurant_id = parseInt(data.restaurant_id);
   if (isNaN(restaurant_id))
   {
    restaurant_id = 'NULL'
   }

   let name = parseInt(data.name);
   if (isNaN(name))
   {
    name = 'NULL'
   }

   let street_1 = parseFloat(data.street_1);
   if (isNaN(street_1))
   {
    street_1 = 'NULL'
   }

   let street_2 = parseFloat(data.street_2);
   if (isNaN(street_2))
   {
    street_2 = 'NULL'
   }

   let city = parseFloat(data.city);
   if (isNaN(city))
   {
    city = 'NULL'
   }

   let state = parseFloat(data.state);
   if (isNaN(state))
   {
    state = 'NULL'
   }

   let zip_code = parseFloat(data.zip_code);
   if (isNaN(zip_code))
   {
    zip_code = 'NULL'
   }

   let phone = parseFloat(data.phone);
   if (isNaN(phone))
   {
    phone = 'NULL'
   }

   let cuisine = parseFloat(data.cuisine);
   if (isNaN(cuisine))
   {
    cuisine = 'NULL'
   }


    // Create the query and run it on the database
    query1 = `INSERT INTO Restaurants (restaurant_id, name, street_1, street_2, city, state, zip_code, phone, cuisine) VALUES ('${data.restaurant_id}', '${data.name}', '${data.street_1}', '${data.street_2}', '${data.city}', '${data.state}', '${data.zip_code}','${data.phone}',  '${data.cuisine}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
       
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Restaurants;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

/*
Orders page
*/
app.post('/add-orders-ajax', function(req, res) 
{
   // Capture the incoming data and parse it back to a JS object
   let data = req.body;

   // Capture NULL values
   let order_id = parseInt(data.order_id);
   if (isNaN(order_id))
   {
    order_id = 'NULL'
   }

   let customer_id = parseInt(data.customer_id);
   if (isNaN(customer_id))
   {
    customer_id = 'NULL'
   }

   let restaurant_id = parseFloat(data.restaurant_id);
   if (isNaN(restaurant_id))
   {
    restaurant_id = 'NULL'
   }

   let courier_id = parseFloat(data.courier_id);
   if (isNaN(courier_id))
   {
    courier_id = 'NULL'
   }

   let order_date = parseFloat(data.order_date);
   if (isNaN(order_date))
   {
    order_date = 'NULL'
   }

   let total_amount = parseFloat(data.total_amount);
   if (isNaN(total_amount))
   {
    total_amount = 'NULL'
   }

   let courier_fee = parseFloat(data.courier_fee);
   if (isNaN(courier_fee))
   {
    courier_fee = 'NULL'
   }

   let delivery_status = parseFloat(data.delivery_status);
   if (isNaN(delivery_status))
   {
    delivery_status = 'NULL'
   }


    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (order_id, customer_id, restaurant_id, courier_id, order_date, total_amount, courier_fee, delivery_status) VALUES ('${data.order_id}', '${data.customer_id}', '${data.restaurant_id}', '${data.courier_id}', '${data.order_date}', '${data.total_amount}', '${data.courier_fee}','${data.delivery_status}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
       
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Orders;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});







/*
/*
    DELETE ROUTES
*/


app.delete('/delete-orderdetails-ajax/', function(req,res,next){
    let data = req.body;
    let orderDetailsID = parseInt(data.orderdetails_id);
    let deleteOrderDetails = `DELETE FROM OrderDetails WHERE orderdetails_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteOrderDetails, [orderDetailsID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

})});

/*
Customers page
*/

app.delete('/delete-customers-ajax/', function(req,res,next){
let data = req.body;
let customerID = parseInt(data.customer_id);
let deleteCustomerID = `DELETE FROM Customers WHERE customer_id = ?`;


      // Run the 1st query
      db.pool.query(deleteCustomerID, [customerID], function(error, rows, fields){
          if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
          }

})});





/*
    UPDATE ROUTES
*/


  app.put('/put-orderdetails-ajax', function(req,res,next){
    let data = req.body;
  
    let orderDetailsID = parseInt(data.orderdetails_id);
    let foodID = parseInt(data.food_id);
    let unitPrice = parseInt(data.unit_price);
    let lineTotal = parseInt(data.line_total);
    let unitCourierFee= parseInt(data.unit_courier_fee);
    let lineFeeTotal= parseInt(data.line_fee_total);
  
    let queryUpdateFood= `UPDATE OrderDetails SET food_id = ? WHERE OrderDetails.orderdetails_id = ?`;
    let selectFood = `SELECT * FROM OrderDetails WHERE orderdetails_ID = ?`
   
  
          // Run the 1st query
          db.pool.query(queryUpdateFood, [orderDetailsID, foodID, unitPrice, lineTotal,unitCourierFee,lineFeeTotal ], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectFood, [orderDetailsID, foodID, unitPrice, lineTotal,unitCourierFee, lineFeeTotal ], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
