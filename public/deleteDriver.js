function deleteDriver(id){
	$.ajax({
		url: '/driver/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
