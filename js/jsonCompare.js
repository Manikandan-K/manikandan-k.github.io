var compare = function (json1, json2) {
	var diff1 = {}, diff2 = {};

	if(json1 instanceof Array || json2 instanceof Array) {
		if(_.isEqual(json1, json2)) 
			return [{}, {}]
		return [json1, json2]
	} 

	
	var keys = _.union(Object.keys(json1), Object.keys(json2)) ;
	keys.forEach(function(key){
		if(json1.hasOwnProperty(key) || json2.hasOwnProperty(key) ) {
			
			if( _.isObject(json1[key]) && _.isObject(json2[key]) ) {
				var deepObjectDiffs = compare(json1[key], json2[key]);
				if(! isEmpty(deepObjectDiffs[0])) {
				diff1[key] = deepObjectDiffs[0];
				diff2[key] = deepObjectDiffs[1]; 
				}
			}else if ( _.isObject(json1[key]) || _.isObject(json2[key]) || json1[key] != json2[key] ) {
				diff1[key] = json1[key];
				diff2[key] = json2[key];
			}
		}
	});
	return [diff1, diff2] ;
}

var isEmpty = function(object) {
    for(var key in object) {
        if(object.hasOwnProperty(key))
            return false;
    }
    return true;
}




