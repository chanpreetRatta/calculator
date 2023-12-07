let display = document.getElementsByClassName("display");
let buttons = document.querySelectorAll(".button");
let clearButton = document.querySelector(`[data-value="clear"]`);
let numbers = document.querySelectorAll(`[data-value="numbers"]`);
let operators = document.querySelectorAll(`[data-value="operators"]`);

let equation = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
};

function updateTheDisplay() {
  display[0].removeChild(display[0].firstChild);
  display[0].appendChild(document.createTextNode(value));
}

function clearDisplay() {
  display[0].removeChild(display[0].firstChild);
  display[0].appendChild(document.createTextNode("0"));
  equation = {};
}

function getNumbers(event) {
  updateTheDisplay();
}

function getOperator(event) {
  if (equation.firstNumber) equation.operator = event.target.innerHTML;
}

clearButton.addEventListener("click", clearDisplay);
numbers.forEach((number) => number.addEventListener("click", getNumbers));
operators.forEach((operator) =>
  operator.addEventListener("click", getOperator)
);
