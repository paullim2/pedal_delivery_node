// Date: 02/29/24 */
// Citation for the following function: nodejs starter app */
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let addOrderDetailsForm = document.getElementById('add-foods-form-ajax');

// Modify the objects we need
addOrderDetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
  
    let inputRestaurantID = document.getElementById("input-restaurant_id");
    let inputFoodName = document.getElementById("input-food_name");
    let inputCost = document.getElementById("input-cost");
  

    // Get the values from the form fields
 
    let restaurantIDValue = inputRestaurantID.value;
    let foodNameValue = inputFoodName.value;
    let costValue = inputCost.value;
  

    // Put our data we want to send in a javascript object
    let data = {
      
        restaurant_id: restaurantIDValue,
        food_name: foodNameValue,
        cost: costValue
        
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-foods-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
           
            inputRestaurantID.value = '';
            inputFoodName.value = '';
            inputCost.value = '';
           

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
    let currentTable = document.getElementById("foods-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let foodIDCell = document.createElement("TD");
    let restaurantIDCell = document.createElement("TD");
    let foodNameCell = document.createElement("TD");
    let costCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    foodIDCell.innerText = newRow.food_id;
    restaurantIDCell.innerText = newRow.restaurant_id;
    foodNameCell.innerText = newRow.food_name;
    costCell.innerText = newRow.cost;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.food_id);
    };


    // Add the cells to the row 
    row.appendChild(foodIDCell);
    row.appendChild(restaurantIDCell); // LOOK into this to not have to refresh
    row.appendChild(foodNameCell);
    row.appendChild(costCell);
    
    row.appendChild(deleteCell);
  
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.food_id);

    
    // Add the row to the table
    currentTable.appendChild(row);
}