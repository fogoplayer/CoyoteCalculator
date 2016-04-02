//Variables
var version = "web.1.3.3";
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

/*This commnent exists solely to prevent ACE's "..." bug*/
