var execute = function() {
input = out.value;
  console.log('input = "' + input + '"');
    checkSpecialFunction();
    //Do the math
    if (sfv !== true) {
      caretSwap();
      addParentheses();
      computations();
    }else if (sfv === true) {
      //Get rid of special function indicator if not continuation of earlier problem
      if (sf === "+" || sf === "-" || sf === "*" || sf === "/" || sf === "^"){
        input = output + input;
        caretSwap();
        computations();
      }else{
        input = input.substring(1);
        addParentheses();
        caretSwap();
        switch(sf){
            case "f":
                factoring();
                break;
            case "r":
                simpleRad();
                break;
            default:
                out.value = "Does not compute.";
        }
      }
  }
  out.focus();
};
//REFERENCES
  //Variables
    var input;
    var open;
    var close;
    var char;
    var cont;
    var sfv;
    var output;
    var sf;
    var functionArray;
    var open;
    var close;
    var factors;
    var ls;
    var out = document.getElementById("out");
    var exe = document.getElementById("execute");
    var adv = document.getElementById("adv");
    advPanel.style.visibility = "collapse";
    out.focus();
  
  //Functions
    
    //Check orientation
    //orient();
    window.addEventListener("resize", function(){
      orient();
    });
    var orient = function () {
      switch(window.innerHeight > window.innerWidth) {  
        case true:
          if (window.location.pathname === "/Calculator/SCalc-Portrait.html"){
          }else{
            window.location = "SCalc-Portrait.html";
          }
          break;
          
        default:
          if (window.location.pathname === "/Calculator/SCalc-Landscape.html"){
          }else{
            window.location = "SCalc-Landscape.html";
          }
          break; 
      }
    };
    
    //Simplify radicals
    var simpleRad = function(){
      //Do the actual computations
      input = eval(input);
      for (i = 0; i <= input; i++) {
          if (input % i === 0){
              if (Math.sqrt(i) % 1 === 0){
                  ls = i;
              }
          }
      }
      if (input/ls === 1) {
        out.value = Math.sqrt(ls);
        output = Math.sqrt(ls);
      }else{
        area.value = Math.sqrt(ls) + "\u221a" + input / ls;
        area.style.textDecoration= "underline";
        output = Math.sqrt(ls) + "\u221a" + input / ls;
      }
      area.scrollTop = area.scrollHeight;
      CE();
};
    //Caret swap
    var caretSwap = function() {
      input = input.replace(/(\d+)\^(\d+)/, "Math.pow($1, $2)");
};
    //Factoring
    var factoring = function() {
      //Do the actual computations
      input = eval(input);
      factors = [];
      for (i = 0; i <= input; i++) {
          if (input % i === 0){
              factors.push(i);
          }
      }
      area.value = "Factors of " + input + ": " + factors;
      area.style.textDecoration= "underline";
      output = "";
      area.scrollTop = area.scrollHeight;
      CE();
    };
    //See if it is a special function
    var checkSpecialFunction = function() {
      //If not, is it a special function?
          //Extract the first character
        var specialFunctionYesOrNo = input.substring(0,1);
        sf = specialFunctionYesOrNo;
        //list of all special functions
        var functionArray = ["f", "r", "d","*", "^", "/", "+", "-"];
        //Check to see if the first character matches anything in the list
        for (i = 0; i < functionArray.length; i++) {
          if (sf === functionArray[i]) {
            sfv = true;
            break;
          }else{
            sfv = false;
          }
        }
};
    //Calculate
    var computations = function() {
      area.value = area.value+"\n"+input+"=" + eval(input);
      area.style.textDecoration= "underline";
      area.scrollTop = area.scrollHeight;
      output = eval(input);
      console.log(eval(input));
      CE();
};
    //Add Parentheses
    var addParentheses = function() {
      var open = false;
      var close = false;
      for (i = 0; i < input.length + 1; i++){
        char = input.substring(i, i + 1);
        if (char === "(") {
          open = true;
        }else if (char === ")") {
          close = true;
        }
      }
      
      if(open === true && close === true) {
      }else if (open === true && close === false) {
        input = input + ")";
      }else if (open === false && close === true) {
        input = "(" + input;
      }
};
    //Help
    var help = function() {
      window.open("help.html", "", "width=500, height=500");
};
    //Show advanced functions
    var advShow = function() {
      if (window.innerHeight > window.innerWidth) {
        console.log("Showing vertical panel");
        advPanel.style.visibility = "visible";
        adv.textContent = "Hide Advanced Panel";
        adv.onclick = advHide;
        out.focus();
      }else{
        console.log("Showing horizontal panel");
        advPanel.style.visibility= "visible";
        adv.textContent = "Hide Advanced Panel";
        adv.onclick = advHide;
      }
    };
    //Hide Advanced Functions
    var advHide = function() {
      if (window.innerHeight > window.innerWidth) {
        advPanel.style.visibility = "collapse";
        //advPanel.style.border-collapse= "collapse";
        advPanel.style.width = "0%";
        adv.textContent = "Show Advanced Panel";
        adv.onclick = advShow;
        out.focus();
      }else{
        advPanel.style.visibility = "collapse";
        adv.textContent = "Show Advanced Panel";
        adv.onclick = advShow;
        out.focus();
      }
    };
    //Add a to the end
    var adda = function(a) {
      input = out.value + a;
        out.value = input;
        out.focus();
};
    //Add b to the front
    var addb = function(b) {
      input = b + out.value;
        out.value = input;
        out.focus();
};
    //Clear Input
    var CE = function() {
      input = "";
        out.value = input;
        out.focus();
};
    //Clear RAM
    var reset = function(){
      input = "";
      output = "";
      out.value = "";
      area.value = "";
      out.focus();
};
    //Backspace
    var backspace = function() {
      input = out.value;
      input = input.substring(0, input.length-1);
        out.value = input;
        out.focus();
};
    //Finish using enter press
    out.addEventListener("keypress", function() {
      if (event.keyCode == 13){
        exe.click();
      }
});

//html files

//var portrait = ""
