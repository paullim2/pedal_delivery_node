// Get the objects we need to modify
let addOrderDetailsForm = document.getElementById('add-orderdetails-form-ajax');

// Modify the objects we need
addOrderDetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-order_id");
    let inputFoodID = document.getElementById("input-food_id");
    let inputOrderQty = document.getElementById("input-order_qty");
    let inputUnitPrice = document.getElementById("input-unit_price");
    let inputLineTotal = document.getElementById("input-line_total");
    let inputUnitCourierFee = document.getElementById("input-unit_courier_fee");
    let inputLineFeeTotal = document.getElementById("input-line_fee_total");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let foodIDValue = inputFoodID.value;
    let orderQtyValue = inputOrderQty.value;
    let unitPriceValue = inputUnitPrice.value;
    let lineTotalValue = inputLineTotal.value;
    let unitCourierFeeValue = inputUnitCourierFee.value;
    let lineFeeTotalValue = inputLineFeeTotal.value;

    // Put our data we want to send in a javascript object
    let data = {
        order_id: orderIDValue,
        food_id: foodIDValue,
        order_qty: orderQtyValue,
        unit_price: unitPriceValue,
        line_total: lineTotalValue,
        unit_courier_fee: unitCourierFeeValue,
        line_fee_total: lineFeeTotalValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orderdetails-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputFoodID.value = '';
            inputOrderQty.value = '';
            inputUnitPrice.value = '';
            inputLineTotal.value = '';
            inputUnitCourierFee.value = '';
            inputLineFeeTotal.value = '';

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
    let currentTable = document.getElementById("orderdetails-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let orderDetailsIDCell = document.createElement("TD");
    let orderIDCell = document.createElement("TD");
    let foodIDCell = document.createElement("TD");
    let orderQtyCell = document.createElement("TD");
    let unitPriceCell = document.createElement("TD");
    let lineTotalCell = document.createElement("TD");
    let unitCourierFee = document.createElement("TD");
    let lineFeeTotalCell = document.createElement("TD");


    // Fill the cells with correct data
    orderDetailsIDCell.innerText = newRow.orderdetails_id;
    orderIDCell.innerText = newRow.order_id;
    foodIDCell.innerText = newRow.food_id;
    orderQtyCell.innerText = newRow.order_qty;
    unitPriceCell.innerText = newRow.unit_price;
    lineTotalCell.innerText = newRow.line_total;
    unitCourierFee.innerText = newRow.unit_courier_fee;
    lineFeeTotalCell.innerText = newRow.line_fee_total;


    // Add the cells to the row 
    row.appendChild(orderDetailsIDCell);
    row.appendChild(orderIDCell);
    row.appendChild(foodIDCell);
    row.appendChild(orderQtyCell);
    row.appendChild(unitPriceCell);
    row.appendChild(lineTotalCell);
    row.appendChild(unitCourierFee);
    row.appendChild(lineFeeTotalCell);

    
    // Add the row to the table
    currentTable.appendChild(row);
}