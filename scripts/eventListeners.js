body.addEventListener("keypress", 
  function(event) {
    switch (event.keyCode) {
      //Execute on Enter or equals sign
      case 13:
          equals.click();
        break;
        
      case 61:
        if (input.indicator != "algebra") {
          equals.click();
          equalsCount = false;
        }else if (input.indicator === "algebra" && equalsCount === true) {
          equals.click();
        }else{
          addToEnd("=");
          equalsCount = true;
        }
        break;
        
      //Numbers/Symbols
      
        //0
        case 48:
          addToEnd("0");
          break;
        //1
        case 49:
          addToEnd("1");
          break;
        //2
        case 50:
          addToEnd("2");
          break;
        //3
        case 51:
          addToEnd("3");
          break;
        //4
        case 52:
          addToEnd("4");
          break;
        //5
        case 53:
          addToEnd("5");
          break;
        //6
        case 54:
          addToEnd("6");
          break;
        //7
        case 55:
          addToEnd("7");
          break;
        //8
        case 56:
          addToEnd("8");
          break;
        //9
        case 57:
          addToEnd("9");
          break;
          
        case 112:
          addToEnd("π");
          break;
      
      //Operators
        //+
        case 43:
          addToEnd("+");
          break;
        
        //-
        case 45:
          addToEnd("-");
          break;
        //*
        case 42:
          addToEnd("*");
          break;
        
        // /
        case 47:
          addToEnd("/");
          break;
        
        //^
        case 94:
          addToEnd("/");
          break;
      
      //Functions
        //Clear
        case 99:
          CE();
          break;
          
        case 114:
          reset();
          break;
          
      //Modes
        case 104:
          loadToDiv1("elements/help.html");
          break;
          
        case 115:
          loadToDiv1("elements/settings.html");
          break;
        
        case 33:
          loadToDiv1("elements/standardKeypad.html");
          break;
        
        case 64:
          loadToDiv1("elements/advancedFunctionKeypad.html");
          break;
          
        case 102:
          input.indicator = "factor";
          break;
          
        case 114:
          input.indicator = "simplifyRadical";
          break;
          
        case 97:
          input.indicator = "algebra";
          break;
          
      default:
        console.log("Key not recognized. KeyCode = " + event.keyCode);
        break;
    }
  }
);

/*This commnent exists solely to prevent ACE's "..." bug*/
