/* Date: 02/29/24 */
/* Citation for the following function: nodejs starter app */
/* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/ */

// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT        = 60028;                 // Set a port number at the top so it's easy to change in the future
var db      = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.set('views', './views');

/*
    ROUTES
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
        let getCustomers = "SELECT customer_id as 'Customer ID', first_name as 'First Name', last_name as 'Last Name', \
        user_id as 'User ID', email as 'Email', street_1 as 'Street 1', street_2 as 'Street 2', city as 'City',\
        state as 'State', zipcode as 'Zip Code', phone as 'Phone' FROM Customers;";          

        db.pool.query(getCustomers, function(error, rows, fields){   

            res.render('customers', {data: rows});                  
        })                                                      
    });                                                        



app.get('/couriers', function(req, res)
    {  
        let getCouriers = "SELECT courier_id as 'Courier ID', first_name as 'First Name', last_name as 'Last Name', \
        email as 'Email', street_1 as 'Street 1', street_2 as 'Street 2', city as 'City',\
        state as 'State', zipcode as 'Zip Code', phone as 'Phone' FROM Couriers;";          

        db.pool.query(getCouriers, function(error, rows, fields){   

            res.render('couriers', {data: rows});                  
        })                                                      
    });      

      
app.get('/restaurants', function(req, res)
    {  
        let getRestaurants = "SELECT restaurant_id as 'Restaurant ID', name as 'Name', street_1 as 'Street 1', street_2 as 'Street 2', city as 'City',\
        state as 'State', zipcode as 'Zip Code', phone as 'Phone', cuisine as 'Cuisine' FROM Restaurants;";          

        db.pool.query(getRestaurants, function(error, rows, fields){   

            res.render('restaurants', {data: rows});                  
        })                                                      
    });      
                                                         


app.get('/orders', function(req, res)
    {  
        let getOrders = "SELECT order_id as 'Order ID', customer_id as 'Customer ID', restaurant_id as'Restaurant ID', courier_id as 'Courier ID', order_date as 'Order Date',\
        total_amount as 'Total Amount', courier_fee as 'Courier Fee', delivery_status as 'Delivery Status' FROM Orders;";          

        db.pool.query(getOrders, function(error, rows, fields){   

            res.render('orders', {data: rows});                  
        })                                                      
    });      
  
    


app.get('/foods', function(req, res)
    {  
        let getFoods = "SELECT food_id as 'Food ID', restaurant_id as 'Restaurant ID', food_name as 'Food Name', cost as 'Cost' FROM Foods;";              

        db.pool.query(getFoods, function(error, rows, fields){   

            res.render('foods', {data: rows});                  
        })                                                      
    });       
       


app.get('/', function(req, res)
    {  
        // Declare Query 1
        let query1 = "SELECT orderdetails_id as 'Order Details ID', order_id as 'Order ID', food_id as 'Food ID',\
        order_qty as 'Order Qty', unit_price as 'Unit Price', line_total as 'Line Total', unit_courier_fee as 'Unit Courier Fee',\
        line_fee_total as 'Line Fee Total' FROM OrderDetails;";

        // Query 2 is the same in both cases
        let query2 = "SELECT food_id as 'Food ID', restaurant_id as 'Restaurant ID', food_name as 'Food Name', cost as 'Cost' FROM Foods;";   

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

                return res.render('index', {data: orderdetails, foods: foods});
            })
        });                                           // will process this file, before sending the finished HTML to the client.
    });  

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
    query1 = `INSERT INTO OrderDetails (order_id, food_id, order_qty, unit_price, line_total, unit_courier_fee, line_fee_total) VALUES (${data.order_id}, ${data.food_id}, ${data.order_qty}, ${data.unit_price}, ${data.line_total}, ${data.unit_courier_fee}, ${data.line_fee_total} )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT orderdetails_id as 'Order Details ID', order_id as 'Order ID', food_id as 'Food ID',\
            order_qty as 'Order Qty', unit_price as 'Unit Price', line_total as 'Line Total', unit_courier_fee as 'Unit Courier Fee',\
            line_fee_total as 'Line Fee Total' FROM OrderDetails ;`;
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


/* DELETE ROUTES*/

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

  /*UPDATE ROUTES*/

  app.put('/put-orderdetails-ajax', function(req,res,next){
    let data = req.body;
  
    let orderdetailsID = parseInt(data.orderdetails_id);
    let foodID = parseInt(data.food_id);
  
    let queryUpdateFood= `UPDATE OrderDetails SET food_id = ? WHERE OrderDetails.orderdetails_id = ?`;
    let selectFood = `SELECT * FROM orderdetailsID WHERE orderdetails_ID = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateFood, [foodID, orderdetailsID], function(error, rows, fields){
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
                  db.pool.query(selectFood, [orderdetailsID], function(error, rows, fields) {
  
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