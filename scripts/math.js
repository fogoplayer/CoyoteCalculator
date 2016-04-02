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
  //Scan equation
  for (i = 0; i < input.input.length; i++) {
    var char = input.input.substring(i,i+1);
    switch(char){
      case "=":
        e = i;
        break;
        
      case "x":
        x.push(i);
        break;
        
      case "|":
        vert.push(i);
        break;
        
      case "^":
        exp.push(i + 1);
        for (j = exp[0]; j < input.length; j++) {
          if (input.substring(j, j + 1) === "+") {
            p.push(j);
          }
        }
        break;
      
      default:
        break;
    }
  }
  //Find variables that every algorithm uses
  y = input.input.substring(0,e);
  
  
  if (x.length === 1 && vert.length === 0 && exp.length === 0) {
    linearAlgebra();
  } else if (x.length !== 0 && vert.length ===  2) {
    absoluteValueAlgebra();
  }
};

//Linear
var linearAlgebra = function () {
  var a = input.input.substring(e + 1, x[0]);
    if (a === "") {
      a = 1;
    }
  var b = input.input.substring(x[0] + 1);
    if (b === "") {
      b = 0;
    }
  input.output = (y-b)/a;
};
  
  
//Absolute value
var absoluteValueAlgebra = function () {
    //Determine variable placement
    var a = input.input.substring(e + 1, vert[0]);
      if (a === "") {
        a = 1;
      }
    var a1 = input.input.substring(vert[0] + 1, x[0]);
      if (a1 === "") {
        a1 = 1;
      }
      a1 = parseFloat(a1);
    var h = input.input.substring(x[0] + 1, vert[1]);
      if (h === "") {
        h = 0;
      }
      h = parseFloat(h);
    var k = input.input.substring(vert[1] + 1);
      if (k === "") {
        k = 0;
      }
      k = parseFloat(k);
    //If problem is a function
    if (y === "y") {
      console.log("It's a function");
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
        input.output = "x = " + o1 + "," + o2;
      }
    }
};

//Quadratic
var quadraticAlgebra = function () {
  if (x.length !== 0 && exp.length !== 0) {
    var y = input.substring(0,e);
    var a = input.substring(e + 1, x[0]);
      if (a === "") {
        a = 1;
      }
    var poly = parseFloat(input.substring(exp[0], p[0]));
    if (x.length > 1){
      var b = (input.substring(exp[0] + 1, x[1]));
        if (b === "") {
          b = 1;
        }
      var c = parseFloat(input.substring(x[1] + 1));
        if (c === "") {
          c = 0;
        }
    }else{
      var b = 0;
      var c = (input.substring(exp[0] + 1));
        if (c === "") {
          c = 0;
        }
        c = parseFloat(c);
    }
    if (y === "y") {
      var o1 = (-1*(b)+Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      var o2 = (-1*(b)-Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      if ((Math.pow(b, 2)- (4 * a * c)) < 0) {
        area.value = area.value + "\n" + input +"\n" + "No x intercepts";
        indicator = "";
        area.scrollTop = area.scrollHeight;
      }else if (o1 === o2) {
        area.value = area.value + "\n" + input +"\n" + "x intercept = " + o1;
        indicator = "";
        area.scrollTop = area.scrollHeight;
        area.style.textDecoration= "underline";
        output = o1;
      }else{
        area.value = area.value + "\n" + input +"\n" + "x intercepts = " + o1 + "," + o2;
        area.style.textDecoration= "underline";
        indicator = "";
        area.scrollTop = area.scrollHeight;
      }
    }else{
      c = c-y;
      var o1 = (-1*(b)+Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      var o2 = (-1*(b)-Math.sqrt(Math.pow(b, 2)- 4 * a * c))/(2 * a);
      if ((Math.pow(b, 2)- (4 * a * c)) < 0) {
        area.value = area.value + "\n" + input +"\n" + "No x intercepts";
        indicator = "";
        area.scrollTop = area.scrollHeight;
      }else if (o1 === o2) {
        area.value = area.value + "\n" + input +"\n" + "x = " + o1;
        area.scrollTop = area.scrollHeight;
        indicator = "";
        area.style.textDecoration= "underline";
        output = o1;
      }else{
        area.value = area.value + "\n" + input +"\n" + "x = " + o1 + "," + o2;
        area.style.textDecoration= "underline";
        indicator = "";
        area.scrollTop = area.scrollHeight;
      }
    }
  }
};

/*This commnent exists solely to prevent ACE's "..." bug*/
