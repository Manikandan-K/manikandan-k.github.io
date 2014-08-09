var clearText = function() {
	$('.input').val('');
	clearNonInputValues();
};

var diff = function() {
	var input1 = getInput("json1");
	var input2 = getInput("json2");

	clearNonInputValues();			

	if( !input1 || !input2 ) {
		setError("Please enter two jsons to compare");
		return;
	}

	var result1 = convertToJson(input1);
	var result2 = convertToJson(input2);

	if( result1["error"] || result2["error"]) {
		setError(result1["error"]+ result2["error"]);
		return;
	}

	var diff = compare(result1["json"], result2["json"])
	display(diff);
}

var beautify = function() {
	clearNonInputValues();

	var isElementOneProcessed = processElement("json1", "Left");
	var isElementTwoProcessed = processElement("json2", "Right");
	
	if ( ! (isElementOneProcessed || isElementTwoProcessed) ) {
		setError("Give json to format");
	}
}

var processElement = function(elementId, position) {
	var input = getInput(elementId);
	if(input) {
		format(input, elementId, position);
		return true;
	}
	return false;
}

var format = function(object, elementId, position) {
	var result = convertToJson(object);

	if(result["error"]) {
		setError(position + result["error"]);
	}else {
		$('#' + elementId).val(formateJson(result["json"]));
	}

}

var clearNonInputValues = function() {
	clearError();
	clearResult();
}

var setError = function(msg) {
	$('.errors').text(msg);
}

var clearError = function() {
	setError("");
}

var clearResult = function() {
	$('.result').text("");
}

var getInput = function(elementId) {
	return $("#"+elementId).val().trim();
}

var convertToJson = function(object) {
	var json; 
	var error  ="";

	try {
		json = JSON.parse(object) ;
	}catch(ex) {
		error =" Json is invalid. Reason: "+ ex +". ";
	}

	return {
		"json"  : json,
		"error" : error
	};	
}
