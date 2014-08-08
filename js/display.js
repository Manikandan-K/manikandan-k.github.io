function display(diff) {
	if(isEmpty(diff[0])) {
		$('.result').text("No difference");
		return;
	}

	$('.result').append(generateDifferenceElement(diff[0], diff[1], "root",0));
	init();

};

var generateDifferenceElement = function(diff1, diff2, root, level) {

	var classes = 'child level-'+level
	var anchorElement = "<a class='anchor-1'>" +root+ "</a>"
	var el = $("<div class='"+classes+"'></div>");
	el.append(anchorElement);
	
	var keys = _.union(Object.keys(diff1), Object.keys(diff2)) ;
	keys.forEach(function(key){
		if(diff1.hasOwnProperty(key) || diff2.hasOwnProperty(key)) {

			if(_.isArray(diff1[key]) || _.isArray(diff2[key]) ) {
				el.append('<ul class="change strike"> '+ key + ":" + arrayToString(diff1[key])+ ' </ul>')
				el.append('<ul class="change"> '+ key + ":" + arrayToString(diff2[key])+ ' </ul>') 
			}else if(_.isObject(diff1[key]) || _.isObject(diff2[key])) {
				el.append(generateDifferenceElement(diff1[key], diff2[key], key, level+1));
			}else if(diff1[key] && diff2[key]) {
				el.append('<ul class="change strike"> '+ key + ":" + diff1[key]+ ' </ul>')
				el.append('<ul class="change"> '+ key + ":" + diff2[key]+ ' </ul>') 
			}else if(diff1[key]) {
				el.append('<ul class="add">'+ key + ":" + diff1[key]+ ' </ul>')
			}else {
				el.append('<ul class="remove">'+ key + ":" + diff2[key]+ ' </ul>')
			}

		}
	});
	return el;
}

var formateJson = function(object, level) {
	if(!level) level = 0;
 	var outputString = "{ \n";
 	var tabString = getTabString(level);

	_.keys(object).forEach(function(key){
		outputString += tabString + "\t" + key + " : " + getValue(object, key, level+1) + ",\n";
	});
	outputString = outputString.substring(0, outputString.length-2);
	return outputString + "\n" + tabString + "}";
}	

var formatArray = function(array, level) {
	if(!level) level = 0;
	var outputString = "[ \n";
	var tabString = getTabString(level);

	for(var idx=0; idx < array.length; idx++) {
		outputString += tabString + "\t" + getValue(array, idx, level+1) + ",\n"; 			
	}
	outputString = outputString.substring(0, outputString.length-2);

	return outputString + "\n" + tabString + "]";
}

var getValue = function(object, key, level) {
	var value = object[key];
	if( _.isArray(object[key]) )
		value = formatArray(object[key], level)
	else if( _.isObject(object[key]) )
		value = formateJson(object[key], level);

	return value;
}

var getTabString = function(n) {
	var string="";
	for(var i=0; i<n; i++)
		string +="\t";
	return string;
}

var init = function() {
	$(".anchor-1").click(function(el){
		console.log(el);
		$(el.currentTarget).siblings().slideToggle(100);		
	});
};


var arrayToString = function(array) {
	return "[" + array.toString() + "]";
} 

