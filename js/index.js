var clearText = function() {
	$('.input').val('');
};

var diff = function() {
	var objs = [];
	objs[0] = $('#json1').val().trim();
	objs[1] = $('#json2').val().trim();

	$('.errors').text("");			
	$('.result').text("");			
	
	var result = convertToJson(objs);

	if(result["error"]) {
		$('.errors').text(result["error"]);			
		return;
	}

	var jsons = result["json"];

	display(compare(jsons[0], jsons[1]));
};

var beautify = function() {
	var objs = [];
	objs[0] = $('#json1').val().trim();
	objs[1] = $('#json2').val().trim();

	$('.errors').text("");			
	$('.result').text("");			
	
	var result = convertToJson(objs);

	if(result["error"]) {
		$('.errors').text(result["error"]);			
		return;
	}

	var jsons = result["json"];

	$('#json1').val(formateJson(jsons[0]));
	$('#json2').val(formateJson(jsons[1]));
}

var convertToJson = function(objs) {
	var error = "";
	var json = [] ;

	if(isEmptyStringArray(objs)) {
		return { 
			"error" : "Please enter two jsons to compare"
		}
	}

	for(var i = 0; i < objs.length; i++ ) {
		try {
			json[i] = JSON.parse(objs[i]) ;
		}catch(ex) {
			error = error + "Please give valid json " + (i+1) +" Reason: "+ ex +". ";
		}	
	}

	return {
		"error" : error,
		"json" : json
	};

}

var isEmptyStringArray = function(objs) {
	for(var i = 0; i < objs.length; i++ ) { 
		if(!objs[i]) {
			return true;
		}
	}
	return false;
}


