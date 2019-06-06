function deleteWarehouse_Product(id){
	$.ajax({
		url: '/warehouse_product/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
