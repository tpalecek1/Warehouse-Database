//Changes table cells into input fields to allow the user to change values
var updateDriver = function(id){
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
        //Change currState cell
        cell = cell.previousElementSibling;
        var newCurrState = document.createElement("input");
        newCurrState.type = "text";
        newCurrState.name = "currState";
        newCurrState.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newCurrState);
        //Change currCity cell
        cell = cell.previousElementSibling;
        var newCurrCity = document.createElement("input");
        newCurrCity.type = "text";
        newCurrCity.name = "currCity";
        newCurrCity.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newCurrCity);
        //Change last name cell
        cell = cell.previousElementSibling;
        var newLastName = document.createElement("input");
        newLastName.type = "text";
        newLastName.name = "lastName";
        newLastName.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newLastName);
        //Change First name cell
        cell = cell.previousElementSibling;
        var newFirstName = document.createElement("input");
        newFirstName.type = "text";
        newFirstName.name = "firstName";
        newFirstName.value = cell.innerHTML;
        cell.innerHTML = "";
        cell.appendChild(newFirstName);
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




