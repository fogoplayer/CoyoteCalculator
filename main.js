//Variables
var version = "web.1.3.1";
var helpPopUp = document.getElementById("helpPopUp");
var inputBox = document.getElementById("input");
var outputBox = document.getElementById("output");
var splashScreen = document.getElementById("splash");
var largestSquare = "";
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
setTimeout(function () {closeSplash();}, 4000);
console.log("Version: " + version);
inputBox.focus();

//Functions
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
    switch(input.indicator) {
      case "":
        arithmetic();
        break;
        
      case "factor":
        factor();
        break;
        
      case "simplifyRadical":
        simpleRad();
        break;
        
      default:
        break;
    }
    print();
    inputBox.focus();
  };
  
  //Math Functions
    //Basic Arithmetic
    var arithmetic = function () {
      var isItAStringCalc = input.input.substring(0,1);
      if (
        isItAStringCalc !== "+" &&
        isItAStringCalc !== "-" &&
        isItAStringCalc !== "*" &&
        isItAStringCalc !== "/" &&
        isItAStringCalc !== "^"  )
      {
        input.output = eval(input.input);
      } else {
        input.input = input.output + input.input;
        input.output = eval(input.input);
      }
    };
    
    //Factoring
    var factor = function() {
      inputValue = eval(input.input);
      
      //List all factors
      var factors = [];
      for (i = 0; i <= inputValue; i++) {
          if (inputValue % i === 0){
              factors.push(i);
          }
      }
      
      //Pair factors
      var factorPairs = [];
      for (i = 0; i < (factors.length / 2); i++) {
        var factorPair = " " + factors[i] + " and " + factors[factors.length - i - 1];
        factorPairs.push(factorPair);
      }
      
      //Prepare for printing
      input.input = "Factors of " + input.input;
      input.output = factorPairs;
    };
    
    //Simplify Radicals
    var simpleRad = function () {
      inputValue = eval(input.input);
      for (i = 0; i <= inputValue; i++) {
          //If it is a factor of inputValue
          if (inputValue % i === 0){
            //If it is a whole #
            if (Math.sqrt(i) % 1 === 0){
                largestSquare = i;
            }
          }
      }
      
      if (inputValue/largestSquare === 1) {
        input.output = Math.sqrt(largestSquare);
      }else if (largestSquare === 1) {
        input.output = "\u221a" + inputValue / largestSquare;
      }else{
        input.output = Math.sqrt(largestSquare) + "\u221a" + inputValue / largestSquare;
      }
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
    
  //GUI Functions
    //Spalsh screen
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

/*This commnent exists solely to prevent ACE's "..." bug*/
