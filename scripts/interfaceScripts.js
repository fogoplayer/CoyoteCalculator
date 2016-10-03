//Setup
setTimeout(
  function () {
    closeSplash();
    versionChecker();
    colorSetup();
  }, 2000);
console.log(document.cookie);
console.log("Version: " + version);

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
  document.getElementById(dropdownId + "Chevron").className = "dropdownChevron up";
  document.getElementById(dropdownId + "Content").className = "dropdownContent open";
  document.getElementById(dropdownId + "Header").onclick = function() {
    closeDropdown(dropdownId);
  };
};

var closeDropdown = function(dropdownId) {
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

var loadToDiv2 = function (elementID) {
  $('#div2').load(elementID, function() {
    hideHamburger();
  });
};

//Adds the clicked-on character to the end of the input string
var addToEnd = function(numberSymbol) {
  inputBox.innerHTML = inputBox.innerHTML + numberSymbol;
  inputBox.focus();
};

var addIndicator = function(indicator) {
  output.innerHTML = output.innerHTML + "<br>Switching to " + indicator + " mode";
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

var setVariable = function (variable, value) {
  document.getElementById("html").style.setProperty(variable, value);
      writeCookie(variable,value);
};

//Create and edit cookies
var writeCookie = function (name, value){
  document.cookie = name + "=" + value;
};

var findCookie = function (name) {
  //Find version # in cookie
  for (i = 0; i <= docCookie.length; i++) {
    if (docCookie.substring(i, i + name.length + 1) === name + "=") {
      var numberStart = i + name.length + 1;
      for (i = i + name.length + 1; docCookie.substring(i, i + 1) != ";" && i <= docCookie.length; i++) {
        var numberEnd = i + 1;
      }
    }
  }
  cookieValue = docCookie.substring(numberStart, numberEnd);
  console.log(cookieValue);
};

//Use cookies to check on the version
var versionChecker = function () {
  findCookie("Version");
  //Store cookie version as variable
  var cookieVersion = cookieValue;
  
  //Ask to open changelog if Coyote has been updated.
  if (cookieVersion != version) {
    if (cookieVersion.substring(4,5) != version.substring(4,5)) {
      var changeType = "a major change to Coyote's user interface.";
    } else if (cookieVersion.substring(6,7) != version.substring(6,7)) {
      var changeType = "new features you may want to use now or in the future.";
    } else if (cookieVersion.substring(8,9) != version.substring(8,9)) {
      var changeType = "primarily bug fixes.";
    }
    
    var openLog = confirm("Coyote Calculator has been updated from version " + cookieVersion + " to version " + version + ". This update includes " + changeType + " \n\n Would you like to open the changelog to see what is new?");
    if (openLog) {
      loadToDiv1("elements/changelog.html");
    }
  }
  writeCookie("Version", version); 
};

var colorSetup = function() {
  findCookie("--color1");
  if (cookieValue.length > 20) {
    writeCookie("--color1", "white");
  }
  findCookie("--color1");
  setVariable("--color1", cookieValue);
  
  findCookie("--color2");
  if (cookieValue.length > 20) {
    writeCookie("--color2", "darkblue");
  }
  findCookie("--color2");
  setVariable("--color2", cookieValue);
  
  findCookie("--textcolor");
  if (cookieValue.length > 20) {
    writeCookie("--textcolor", "gray");
  }
  findCookie("--textcolor");
  setVariable("--textcolor", cookieValue);
};
/*This commnent exists solely to prevent ACE's "..." bug*/