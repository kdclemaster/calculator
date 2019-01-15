//maybe not the best solution
var currentDisplay = document.getElementById("display");
var currentProgress = document.getElementById("progress");

function setButtons(){
	var numberButtons = document.getElementsByClassName('number');
	for (i = 0; i < numberButtons.length; i++){
	numberButtons[i].addEventListener('click', updateDisplay);
}
	var operatorButtons = document.getElementsByClassName('operator');
	for (i = 0; i < operatorButtons.length; i++){
		operatorButtons[i].addEventListener('click', updateDisplay);
	}
	var equalButton = document.getElementById('equal');
	equalButton.addEventListener('click', equals)
	var clearButton = document.getElementById('clear');
	clearButton.addEventListener('click', clearDisplay);
	var backspaceButton = document.getElementById('backspace');
	backspaceButton.addEventListener('click', backspace);
}
function add (x,y) {
	return x + y;
}
function subtract (x,y) {
	return x - y;
}
function multiply (x,y) {
	return x * y;
}
function divide (x,y) {
	if (y != 0){
		return x / y;
	} else 
		return 'DIV BY 0';
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function equals (){
	var x='';
	var xFull;
	var y='';
	var answer = '';
	var currentOperator='';
	for (i = 0; i < currentDisplay.innerHTML.length; i++){
		 if (!xFull){
			x = x + currentDisplay.innerHTML[i];
		} else  {
			y = y + currentDisplay.innerHTML[i];
		}
		if (isOperator(currentDisplay.innerHTML[i]) || i === currentDisplay.innerHTML.length - 1){
			if(currentOperator===''){
			currentOperator = currentDisplay.innerHTML[i];
			xFull = true;
		}
			else{
				answer = operate(x, currentOperator, y);
				x = '' + answer;
				y = '';
				currentOperator = currentDisplay.innerHTML[i];
			}
		}
	}
	currentDisplay.innerHTML='';
	if(answer.length > 9){
		currentProgress.innerHTML = round(answer, 2);
	} else {
		currentProgress.innerHTML = answer;
	}
	
}


function operate (x, op, y){
	x = x.replace(/[+-/*]/g,'');
	y = y.replace(/[+-/*]/g,'');
	x = Number(x);
	y = Number(y);
	if (op === "+"){
		return add(x,y);
	} else if (op === "-"){
		return subtract(x,y);
	} else if (op === "*"){
		return multiply(x,y);
	} else if (op === "/"){
		return divide(x,y);
	}	
}
function updateDisplay (){
	var displayHTML = currentDisplay.innerHTML;
	if ((isOperator(displayHTML[displayHTML.length-1]) && isOperator(this.innerHTML)) || displayHTML.length >= 9) {
		return;
	} else {
	var newDisplay = currentDisplay.innerHTML + this.innerHTML;
	currentDisplay.innerHTML = newDisplay;
}
}
function clearDisplay (){
	currentDisplay.innerHTML = '';
	currentProgress.innerHTML = '';
}
function isOperator(input){
	var operatorRE = /[+-/*]/g;
	if (operatorRE.test(input)){
		return true;
	} else {
		return false;
	}
}
function backspace (){
	currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0,-1);
}

setButtons();