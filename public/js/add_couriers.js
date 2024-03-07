// Date: 02/29/24 */
// Citation for the following function: nodejs starter app */
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let addCouriersForm = document.getElementById('add-couriers-form-ajax');

// Modify the objects we need
addCouriersForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    
    let inputFirstName = document.getElementById("input-first_name");
    let inputLastName = document.getElementById("input-last_name");
    let inputEmail = document.getElementById("input-email");
    let inputStreet1 = document.getElementById("input-street_1");
    let inputStreet2 = document.getElementById("input-street_2");
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");
    let inputZipCode = document.getElementById("input-zip_code");
    let inputPhone = document.getElementById("input-phone");

    // Get the values from the form fields
  
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let street1Value = inputStreet1.value;
    let street2Value = inputStreet2.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipCodeValue = inputZipCode.value;
    let phoneValue = inputPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        street_1: street1Value,
        street_2: street2Value,
        city: cityValue,
        state: stateValue,
        zip_code: zipCodeValue,
        phone: phoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-couriers-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
    
            inputFirstName.value  = '';
            inputLastName.value= '';
            inputEmail.value= '';
            inputStreet1.value= '';
            inputStreet2.value= '';
            inputCity.value= '';
            inputState.value= '';
            inputZipCode.value= '';
            inputPhone.value='';

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
    let currentTable = document.getElementById("couriers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let courierIDCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let street1Cell = document.createElement("TD");
    let street2Cell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipCodeCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    courierIDCell.innerText = newRow.courier_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    emailCell.innerText = newRow.email;
    street1Cell.innerText = newRow.street_1;
    street2Cell.innerText = newRow.street_2;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipCodeCell.innerText = newRow.zip_code;
    phoneCell.innerText = newRow.phone;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.courier_id);
    };


    // Add the cells to the row 
    row.appendChild(courierIDCell);
    row.appendChild(firstNameCell); // LOOK into this to not have to refresh
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(street1Cell);
    row.appendChild(street2Cell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipCodeCell);
    row.appendChild(phoneCell);

    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.courier_id);

    
    // Add the row to the table
    currentTable.appendChild(row);
}