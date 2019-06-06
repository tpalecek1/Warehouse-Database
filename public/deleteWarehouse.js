function deleteWarehouse(id){
	$.ajax({
		url: '/warehouse/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
