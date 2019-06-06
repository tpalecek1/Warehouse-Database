function deleteOrder(id){
	$.ajax({
		url: '/order/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
