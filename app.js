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


/*
    ROUTES
*/
app.get('/', function(req, res)
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
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});