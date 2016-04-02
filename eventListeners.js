//Execute using enter
  inputBox.addEventListener("keypress", 
    function(event) {
      if (event.keyCode === 13){
        equals.click();
      }
    }
  );

/*This commnent exists solely to prevent ACE's "..." bug*/