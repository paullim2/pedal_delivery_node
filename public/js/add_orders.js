// Date: 02/29/24 */
// Citation for the following function: nodejs starter app */
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let addOrdersForm = document.getElementById('add-orders-form-ajax');

// Modify the objects we need
addOrdersForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
  
    let inputCustomerID = document.getElementById("input-customer_id");
    let inputRestaurantID = document.getElementById("input-restaurant_id");
    let inputCourierID = document.getElementById("input-courier_id");
    let inputOrderDate = document.getElementById("input-order_date");
    let inputTotalAmount = document.getElementById("input-total_amount");
    let inputCourierFee = document.getElementById("input-courier_fee");
    let inputDeliveryStatus = document.getElementById("input-delivery_status");

    // Get the values from the form fields
 
    let customerIDValue = inputCustomerID.value;
    let restaurantIDValue = inputRestaurantID.value;
    let courierIDValue = inputCourierID.value;
    let orderDateValue = inputOrderDate.value;
    let totalAmountValue = inputTotalAmount.value;
    let courierFeeValue = inputCourierFee.value;
    let deliveryStatusValue = inputDeliveryStatus.value;
  

    // Put our data we want to send in a javascript object
    let data = {
      
        restaurant_id: customerIDValue,
        food_name: restaurantIDValue,
        courier_id: courierIDValue,
        order_date: orderDateValue,
        total_amount: totalAmountValue,
        courier_fee: courierFeeValue,
        delivery_status: deliveryStatusValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orders-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
           
            inputCustomerID.value = '';
            inputRestaurantID.value = '';
            inputCourierID.value = '';
            inputOrderDate.value = '';
            inputTotalAmount.value = '';
            inputCourierFee.value = '';
            inputDeliveryStatus.value = '';
           

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orders-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let orderIDCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let restaurantIDCell = document.createElement("TD");
    let courierIDCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let totalAmountCell = document.createElement("TD");
    let courierFeeCell = document.createElement("TD");
    let deliveryStatusCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIDCell.innerText = newRow.order_id;
    customerIDCell.innerText = newRow.customer_id;
    restaurantIDCell.innerText = newRow.restaurant_id;
    courierIDCell.innerText = newRow.courier_id;
    orderDateCell.innerText = newRow.order_date;
    totalAmountCell.innerText = newRow.total_amount;
    courierFeeCell.innerText = newRow.courier_fee;
    deliveryStatusCell.innerText = newRow.delivery_status;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.order_id);
    };


    // Add the cells to the row 
    row.appendChild(orderIDCell);
    row.appendChild(customerIDCell); // LOOK into this to not have to refresh
    row.appendChild(restaurantIDCell);
    row.appendChild(courierIDCell);
    row.appendChild(orderDateCell);
    row.appendChild(totalAmountCell);
    row.appendChild(courierFeeCell);
    row.appendChild(deliveryStatusCell);
    
    row.appendChild(deleteCell);
  
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.order_id);

    
    // Add the row to the table
    currentTable.appendChild(row);
}