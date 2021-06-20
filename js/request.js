function request(url , params){
	var result = $.ajax({
	    url: url,
	    data: params,
	    type: "POST",
	    dataType: "json",
	    success: function(data) {
			console.log(data)
			return data;
	    }
	});
	return result;
}
