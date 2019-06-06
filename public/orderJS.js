//Changes table cells into input fields to allow the user to change values
var updateOrder = function(id){
    var updateSelected = document.getElementById("update");
    //make sure an update button isn't already pressed
    if(updateSelected == null){
        var update = document.getElementById("update" + id);
        //Create the form for updating the row
        var updateForm = document.createElement("form");
        updateForm.id = "update";
        updateForm.method= "POST";
        //Attach the form to the table
        var row = update.parentElement.parentElement;
        var table = row.parentElement.parentElement;
        table.parentNode.insertBefore(updateForm, table);
        updateForm.appendChild(table.parentNode.removeChild(table));
        //Variable to traverse through table cells
        var cell = update.parentElement;
        //Remove the delete button for the row
        var delButton = cell.nextElementSibling;
        delButton.parentNode.removeChild(delButton);
        //Change DriverID cell
        cell = cell.previousElementSibling;
        var newDriverID = document.createElement("input");
        newDriverID.type = "number";
        newDriverID.name = "driverID";
        newDriverID.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newDriverID);
        //Change targetDel cell
        cell = cell.previousElementSibling;
        var newtargetDel = document.createElement("input");
        newtargetDel.type = "date";
        newtargetDel.name = "targetDel";
        newtargetDel.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newtargetDel);
        //Change Quantity cell
        cell = cell.previousElementSibling;
        var newQuantity = document.createElement("input");
        newQuantity.type = "number";
        newQuantity.name = "quantity";
        newQuantity.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newQuantity);
        //Change productID cell
        cell = cell.previousElementSibling;
        var newProductID = document.createElement("input");
        newProductID.type = "number";
        newProductID.name = "productID";
        newProductID.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newProductID);
        //Change Status cell
        cell = cell.previousElementSibling;
        var newStatus = document.createElement("input");
        newStatus.type = "text";
        newStatus.name = "status";
        newStatus.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newStatus);
        //Change CustomerID cell
        cell = cell.previousElementSibling;
        var newCustomerID = document.createElement("input");
        newCustomerID.type = "number";
        newCustomerID.name = "customerID";
        newCustomerID.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newCustomerID);
        //Get id From ID cell, add it to hidden input
        cell = cell.previousElementSibling;
        var hiddenId = document.createElement("input");
        hiddenId.type = "hidden";
        hiddenId.name = "id";
        hiddenId.value = cell.innerHTML;
        row.appendChild(hiddenId);
        //Change the update button into a submit button for the update form
        row.removeChild(update.parentNode);
        var newUpdate = document.createElement("button");
        newUpdate.type = "submit";
        newUpdate.textContent = "Submit";
        newUpdate.name = "update";
        newUpdate.value = "update";
        row.appendChild(newUpdate);
    }
}

var deleteOrder = function(id){

}