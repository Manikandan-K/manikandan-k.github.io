var calculate = function() {
  var numbersString = document.getElementsByClassName("number_input")[0].value;
  var numbers = numbersString.split(",").map(function(b) { return parseInt(b); });

  const cumsum = numbers.map(function(value, index) {
    return numbers.slice(0, index + 1).reduce((a, b) => a + b, 0);
  });

$('#cumsum_value').text(cumsum);
  console.log(cumsum)

}
