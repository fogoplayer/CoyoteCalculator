//Variables
var version = "web.4.3.0";
var inputBox = document.getElementById("input");
var outputBox = document.getElementById("output");
var splashScreen = document.getElementById("splash");
var largestSquare = "";
var equals = document.getElementById("equals");
var hamburger = document.getElementById("hamburger");
var overlay = document.getElementById("overlay");
var equalsCount = false;
var docCookie = document.cookie;
var cookieValue;
var input = {
  input:"",
  indicator:"",
  output:"",
  operatorArray:[],
  openParenthesesArray:[],
  closeParenthesesArray:[]
};

//Algebra Variables
var e = 0;
var x = [];
var verticalLine = [];
var openParentheses = [];
var closeParentheses = [];
var operator = [];
var y = "";
var a = "";
var exponent = [];

/*This commnent exists solely to prevent ACE's "..." bug*/
