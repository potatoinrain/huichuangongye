function ajaxGet(url, params, callback){
	var result = "";
	$.ajax({
		url: url,
		dataType: "json",
		data: params,
		async:false,
		success: function(data) {
			result = data;
		}
	})
	return result
}