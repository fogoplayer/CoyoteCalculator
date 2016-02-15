var version = "web.1.0.0";
//Variables
var helpPopUp = document.getElementById("helpPopUp");
var inputBox = document.getElementById("input");
var outputBox = document.getElementById("output");
var splashScreen = document.getElementById("splash");
var splashImage = document.getElementById("splashImage");
var output = "";
var equals = document.getElementById("equals");
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
console.log(version);
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
      $('#div1').load('elements/standardKeypad.html', function() {} );
      $('#div2').load('elements/inputOutput.html', function() {} );
      inputBox.focus();
    };
    
    //Help dialogue
    var openHelp = function () {
      if (helpPopUp.style.display === "block") {
        helpPopUp.style.display = "none";
        inputBox.focus();
      }else{
        helpPopUp.style.display = "block";
      }
    };
    
    var openSettings = function () {
      if (settingsPopUp.style.display === "block") {
        settingsPopUp.style.display = "none";
        inputBox.focus();
      }else{
        settingsPopUp.style.display = "block";
      }
    };
    
    //Show advanced functions panel
    var showAdvancedFunctions = function () {
      $('#div1').load('elements/advancedFunctionKeypad.html', function() {
      });
      
      inputBox.focus();
    };
    
    var hideAdvancedFunctions = function () {
      $('#div1').load('elements/standardKeypad.html', function() {
      });
      
      inputBox.focus();
    };

/*This commnent exists solely to prevent ACE's "..." bug*/
