//Variables
var version = "web.2.0.0";
var helpPopUp = document.getElementById("helpPopUp");
var inputBox = document.getElementById("input");
var outputBox = document.getElementById("output");
var splashScreen = document.getElementById("splash");
var output = "";
var equals = document.getElementById("equals");
var hamburger = document.getElementById("hamburger");
var overlay = document.getElementById("overlay");
var input = {
  input:"",
  indicator:"",
  output:"",
  operatorArray:[],
  openParenthesesArray:[],
  closeParenthesesArray:[]
};

//Setup
setTimeout(function () {closeSplash();}, 2500);
console.log("Version: " + version);
inputBox.focus();

//Functions
  //Hide OS Keyboard on mobile.
  /*var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    inputBox.addEventListener("focus", function(){
      inputBox.blur();
    });
  }*/
  
  //Execute using enter
  inputBox.addEventListener("keypress", 
    function(event) {
      if (event.keyCode === 13){
        equals.click();
      }
    }
  );
  
  
  //On Execute
  var execute = function () {
    input.input = inputBox.value;
    parse();
    switch(input.indicator) {
      case "":
        arithmetic();
        break;
      default:
        break;
    }
    print();
    inputBox.focus();
  };
  
  //Math Functions
    //Break down formula so that everything can be analyzed later
    var parse = function () {
      for (i = 0; i < input.input.length; i++) {
        if (j === "x") {
          input.input = input.input.substring(0, i-1) + "*" + input.input.substring(i);
        }
        
        var j = input.input.substring(i, i+1);

        if (j === "(") {
          input.openParenthesesArray.push(i);
        }
        
        if (j === ")") {
          input.closeParenthesesArray.push(i);
        }
        
        if (j === "x" || j === "/" || j === "+" || j === "-") {
          input.operatorArray.push(i);
        }

        if (j === "^") {
          if (input.input.substring(i - 1, i) === ")") {
            for (k = 0; k<=input.openParenthesesArray.length; k++) {
              if (input.openParenthesesArray[k] > i) {
                var base = input.substring(k, i - 1);
              }
            }
          }          
        }
      }
    };
    
    //Basic Arithmetic
    var arithmetic = function () {
      var output = eval(input.input);
      input.output = output;
    };
  
  
  //input functions
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
      inputBox.focus();
    };
    
    //Clears everything
    var reset = function () {
      CE();
      outputBox.innerHTML = "";
      inputBox.focus();
    };
    
    var print = function (){
      if (outputBox.innerHTML === "") {
        outputBox.innerHTML = input.input + "=<br>" + input.output;
      }else{
        outputBox.innerHTML = outputBox.innerHTML + "<br>" + input.input + "=<br>" + input.output;
      }
      
      CE();
    };
    
  //GUI Functions
    //Spalsh screen
    var closeSplash = function () {
      splash.style.display = "none";
      inputBox.focus();
    };
    
    var openHamburger = function() {
      hamburger.style.display = "block";
      overlay.style.display = "block";
    }
    
    var hideHamburger = function() {
      hamburger.style.display = "none";
      overlay.style.display = "none";
      inputBox.focus();
    }
    
    var loadToDiv1 = function (elementID) {
      $('#div1').load(elementID, function() {
        hideHamburger();
      });
    }
    
    var switchChannel = function (channel) {
      if (channel === "stable") {
        location = "http://fogoplayer.github.io/sCalc/";
      }else if (channel = "beta") {
        confirm("WARNING: You are attempting to switch to the Beta channel, which features code that is still in development. Do you still wish to proceed?");
        location = "http://fogoplayer.github.io/sCalc/beta";
      }
    }
/*This commnent exists solely to prevent ACE's "..." bug*/
