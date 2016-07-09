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
  hamburger.className = "closed";
  overlay.style.display = "block";
};

//Close Hamburger Menu
var hideHamburger = function() {
  hamburger.className = "open";
  overlay.style.display = "none";
  inputBox.focus();
};

//Dropdowns
var openDropdown = function(dropdownId) {
  console.log("Opening dropdown");
  document.getElementById(dropdownId + "Chevron").className = "dropdownChevron up";
  document.getElementById(dropdownId + "Content").className = "dropdownContent open";
  document.getElementById(dropdownId + "Header").onclick = function() {
    closeDropdown(dropdownId);
  };
};

var closeDropdown = function(dropdownId) {
  console.log("Closing dropdown");
  document.getElementById(dropdownId + "Chevron").className = "dropdownChevron down";
  document.getElementById(dropdownId + "Content").className = "dropdownContent closed";
  document.getElementById(dropdownId + "Header").onclick = function() {
    openDropdown(dropdownId);
  };
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
  inputBox.innerHTML = inputBox.innerHTML + numberSymbol;
  inputBox.focus();
};

var addIndicator = function(indicator) {
  input.indicator = indicator;
};

//Removes the last character in the input
var backspace = function () {
  inputBox.innerHTML = inputBox.innerHTML.substring(0, inputBox.innerHTML.length-1);
  inputBox.focus();
};

//Clears current Entry
var CE = function () {
  //Reset algebra variables
  e = 0;
  x = [];
  verticalLine = [];
  openParentheses = [];
  closeParentheses = [];
  operator = [];
  y = "";
  a = "";
  exponent = [];
  b = "";
  c = "";
  //Reset input object, but not output
  inputBox.innerHTML = "";
  input.indicator = "";
  input.operatorArray = [];
  input.openParenthesesArray = [];
  input.closeParenthesesArray = [];
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
  output.scrollTop = output.scrollHeight;
};

/*This commnent exists solely to prevent ACE's "..." bug*/
