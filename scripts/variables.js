//Variables
var version = "web.1.5.0";
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

//Algebra Variables
var x = [];
var plus = [];
var vert = [];
var exp = [];
var p = [];
var e;
var y;
/*This commnent exists solely to prevent ACE's "..." bug*/
