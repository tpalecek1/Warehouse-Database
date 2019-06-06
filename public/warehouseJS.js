//Changes table cells into input fields to allow the user to change values
var updateWarehouse = function(id){
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
        var productButton = cell.nextElementSibling.nextElementSibling;
        //Remove the delete button for the row
        var delButton = cell.nextElementSibling;
        delButton.parentNode.removeChild(delButton);
        //Change Size cell
        cell = cell.previousElementSibling;
        var newSize = document.createElement("input");
        newSize.type = "number";
        newSize.name = "size";
        newSize.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newSize);
        //Change State cell
        cell = cell.previousElementSibling;
        var newState = document.createElement("input");
        newState.type = "text";
        newState.name = "state";
        newState.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newState);
        //Change City cell
        cell = cell.previousElementSibling;
        var newCity = document.createElement("input");
        newCity.type = "text";
        newCity.name = "city";
        newCity.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newCity);
        //Change FAddress cell
        cell = cell.previousElementSibling;
        var newAddress = document.createElement("input");
        newAddress.type = "text";
        newAddress.name = "address";
        newAddress.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newAddress);
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
        row.insertBefore(newUpdate, productButton);
    }
}