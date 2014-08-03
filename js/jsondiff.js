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

var display = function(diff) {
	if(isEmpty(diff[0])) {
		$('.result').text("No difference");
		return;
	}

	var list1 = $("<div class='child'> </div>");
	var list2 = $("<div class='child'> </div>");
	
	var keys = _.union(Object.keys(diff[0]), Object.keys(diff[1])) ;
	keys.forEach(function(key){
		if(diff[0].hasOwnProperty(key) || diff[1].hasOwnProperty(key)) {
			if(diff[0][key] && diff[1][key]) {
				list1.append('<ul class="change"> '+ key + ":" + toString(diff[0][key])+ ' </ul>')
				list2.append('<ul class="change"> '+ key + ":" + toString(diff[1][key])+ ' </ul>') 
			}else if(diff[0][key]) {
				list1.append('<ul class="add"> + '+ key + ":" + toString(diff[0][key])+ ' </ul>')
				list2.append('<ul class="remove"> - </ul>') 
			}else {
				list1.append('<ul class="remove"> - </ul>') 
				list2.append('<ul class="add"> + '+ key + ":" + toString(diff[1][key])+ ' </ul>')
			}

		}
	});

	$('.result').append(list1);
	$('.result').append(list2);

};

var createListElement = function(arg) {

};


var compare = function (json1, json2) {
	var diff1 = {}, diff2 = {};

	
	var keys = _.union(Object.keys(json1), Object.keys(json2)) ;
	keys.forEach(function(key){
		if(json1.hasOwnProperty(key) || json2.hasOwnProperty(key) ) {
			if( typeof(json1[key]) == 'object' || typeof(json2[key]) == 'object') {
				
				var deepObjectDiffs = compare(json1[key], json2[key]);
				if(! isEmpty(deepObjectDiffs[0])) {
				diff1[key] = deepObjectDiffs[0];
				diff2[key] = deepObjectDiffs[1]; 
				}

			}else if(json1[key] != json2[key]) {
				diff1[key] = json1[key];
				diff2[key] = json2[key];
			}
		}
	});
	return [diff1, diff2] ;
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
			json[i] =JSON.parse(objs[i]);
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

var isEmpty = function(object) {
    for(var key in object) {
        if(object.hasOwnProperty(key))
            return false;
    }
    return true;
}

var toString = function(object) {
	if(typeof object != 'object')
		return object;
	
	var string = "{ " ;
    for(var key in object) {
        if(object.hasOwnProperty(key))
            string += key + ": " + object[key] + ", ";
    }
    string = string.substr(0, string.length-2);
   	string += " }";
   	return string;
}

