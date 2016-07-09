//On Execute
var execute = function () {
  input.input = inputBox.innerHTML;
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
      
    case "algebra":
      algebra();
      break;
      
    default:
      break;
  }
  print();
  inputBox.focus();
};

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
  //Determine which factor is the largest square
  for (i = 0; i <= inputValue; i++) {
    //If it is a factor of inputValue
    if (inputValue % i === 0){
      //If it is a whole #
      if (Math.sqrt(i) % 1 === 0){
          largestSquare = i;
      }
    }
  }

  //Determine output based on if input was a square, an unsimplified root, or a simplified root
  if (inputValue/largestSquare === 1) {
    input.output = Math.sqrt(largestSquare);
  }else if (largestSquare === 1) {
    input.output = "\u221a" + inputValue / largestSquare;
  }else{
    input.output = Math.sqrt(largestSquare) + "\u221a" + inputValue / largestSquare;
  }
};
  
//Determine the type of algebra
var algebra = function(){
  //Search for specific symbols
  for (i = 0; i < input.input.length; i++) {
    switch (input.input.substring(i,i + 1) ) {
      case "=":
        e = i;
        break;
        
      case "x":
        x.push(i);
        break;
        
      case "|":
        verticalLine.push(i);
        break;
        
      case "(":
        openParentheses.push(i);
        break;
        
      case ")":
        closeParentheses.push(i);
        break;
        
      case "^":
        exponent.push(i);
        break;
      
      case "+":
      case "-":
      case "*":
      case "/":
        operator.push(i);
        break;
    }
  }
  
  //Determine values of variables all three equations use.
  y = input.input.substring(0,e);
  a = input.input.substring(e + 1, x[0] - 1);
    if (a === "") {
      a = 1;
    }
    a= parseFloat(a);
  
  //Go to a specific function for further analysis
  if (x.length === 1 && verticalLine.length === 0 && exponent.length === 0) {
    linearAlgebra();
  } else if (verticalLine.length ===  2) {
    absoluteValueAlgebra();
  } else if (exponent.length === 1) {
    quadraticAlgebra();
  }
};

//Linear
var linearAlgebra = function () {
  var b = input.input.substring(x[0] + 1);
    if (b === "") {
      b = 0;
    }
  input.output = "x = " +(y-b)/a;
};

//Absolute value
var absoluteValueAlgebra = function () {
    //Determine variable placement
    var a1 = input.input.substring(verticalLine[0] + 1, x[0]);
      if (a1 === "") {
        a1 = 1;
      }
      a1 = parseFloat(a1);
    var h = input.input.substring(x[0] + 1, verticalLine[1]);
      if (h === "") {
        h = 0;
      }
      h = parseFloat(h);
    var k = input.input.substring(verticalLine[1] + 1);
      if (k === "") {
        k = 0;
      }
      k = parseFloat(k);
    //If problem is a function
    if (y === "y") {
      var o1 = (((0-k)/a)-h)/a1;
      var o2 = ((-1*(0-k)/a)-h)/a1;
      if (k>0) {
        input.output = "Vertex = (" + h + "," + k + ")<br>" + "No x intercepts";
      }else if (o1 === o2) {
        input.output = "Vertex = (" + h + "," + k + ")<br>" + "x intercept = " + o1;
      }else{
        input.output = "Vertex = (" + h + "," + k + ")<br>" + "x intercepts = " + o1 + "," + o2;
      }
    }
    
    //If problem is solving for x
    else{
      var o1 = (((y-k)/a)-h)/a1;
      var o2 = ((-1*(y-k)/a)-h)/a1;
      if (o1 === o2) {
        input.output = "x = " + o1;
      }else{
        input.output = "x = " + o1 + ", " + o2;
      }
    }
};

//Quadratic
var quadraticAlgebra = function () {
  //Variables
  var b;
  var c;
  if (x.length !== 0 && exponent.length !== 0) {
    if (x.length > 1){
      var b = ( input.input.substring(exponent[0] + 4, x[1]));
        if (b === "") {
          b = 1;
        }
      var c = parseFloat( input.input.substring(x[1] + 1));
        if (c === "") {
          c = 0;
        }
    }else{
      b = 0;
      c = ( input.input.substring(exponent[0] + 4));
        if (c === "") {
          c = 0;
        }
        c = parseFloat(c);
    }
    
    if (y === "y") {
      console.log("a = " + a + "b = " + b + "c = " + c);
      var o1 = ((b)+Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      var o2 = (-1*(b)-Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      if ((Math.pow(b, 2)- (4 * a * c)) < 0) {
        input.output = "No x intercepts";
      }else if (o1 === o2) {
        input.output =  "x intercept = " + o1;
      }else{
        input.output = "x intercepts = " + o1 + ", " + o2;
      }
    }else{
      c = c-y;
      var o1 = ((b)+Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      var o2 = (-1*(b)-Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      if ((Math.pow(b, 2)- (4 * a * c)) < 0) {
        input.output = "No x intercepts";
      }else if (o1 === o2) {
        input.output = "x = " + o1;
      }else{
        input.output = "x = " + o1 + "," + o2;
      }
    }
  }
};

/*This commnent exists solely to prevent ACE's "..." bug*/
