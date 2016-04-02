//Setup
setTimeout(function () {closeSplash();}, 4000);
console.log("Version: " + version);
inputBox.focus();

//Splash screen
  var closeSplash = function () {
    splash.style.display = "none";
    inputBox.focus();
  };

//Open Hamburger Menu
var openHamburger = function() {
  hamburger.style.display = "block";
  overlay.style.display = "block";
};

//Close Hamburger Menu
var hideHamburger = function() {
  hamburger.style.display = "none";
  overlay.style.display = "none";
  inputBox.focus();
};

//Loads keypads to Div1
//May eventually be modified to accept a Div as an argument for increased flexibility.
var loadToDiv1 = function (elementID) {
  $('#div1').load(elementID, function() {
    hideHamburger();
  });
};

//Adds the clicked-on character to the end of the input string
var addToEnd = function(numberSymbol) {
  inputBox.value = inputBox.value + numberSymbol;
  inputBox.focus();
};

var addIndicator = function(indicator) {
  input.indicator = indicator;
};

//Removes the last character in the input
var backspace = function () {
  inputBox.value = inputBox.value.substring(0, inputBox.value.length-1);
  inputBox.focus();
};

//Clears current Entry
var CE = function () {
  inputBox.value = "";
  input.indicator = "";
  inputBox.focus();
};

//Clears everything
var reset = function () {
  CE(); 
  outputBox.innerHTML = "";
  inputBox.focus();
};

//Print
var print = function (){
  if (outputBox.innerHTML === "") {
    outputBox.innerHTML = input.input + "=<br>" + input.output;
  }else{
    outputBox.innerHTML = outputBox.innerHTML + "<br>" + input.input + "=<br>" + input.output;
  }
  
  CE();
  input.indicator = "";
};

/*This commnent exists solely to prevent ACE's "..." bug*/
