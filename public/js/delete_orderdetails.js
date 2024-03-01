function deleteOrderDetails(orderDetailsID) {
    let link = '/delete-orderdetails-ajax/';
    let data = {
        orderdetails_id: orderDetailsID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(orderDetailsID);
      }
    });
  }
  
  function deleteRow(orderDetailsID){
      let table = document.getElementById("orderdetails-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == orderDetailsID) {
              table.deleteRow(i);
              break;
         }
      }
  }
