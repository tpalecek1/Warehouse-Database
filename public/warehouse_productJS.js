//Changes table cells into input fields to allow the user to change values
var updateWarehouse_Product = function(productID, warehouseID){
    var updateSelected = document.getElementById("update");
    //make sure an update button isn't already pressed
    if(updateSelected == null){
        var update = document.getElementById("update" + productID);
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
        //Change Quantity cell
        cell = cell.previousElementSibling;
        var newQuantity = document.createElement("input");
        newQuantity.type = "number";
        newQuantity.name = "quantity";
        newQuantity.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newQuantity);
        //Get product id From productID cell, add it to hidden input
        cell = cell.previousElementSibling;
        var hiddenId = document.createElement("input");
        hiddenId.type = "hidden";
        hiddenId.name = "productID";
        hiddenId.value = cell.innerHTML;
        row.appendChild(hiddenId);
        //Get warehouse id From productID cell, add it to hidden input
        var whID = document.getElementById("whID");
        var hiddenId = document.createElement("input");
        hiddenId.type = "hidden";
        hiddenId.name = "warehouseID";
        hiddenId.value = whID.value;
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

var deleteWarehouse_Product = function(id){

}