let display = document.getElementsByClassName("display");
let buttons = document.querySelectorAll(".button");
let clearButton = document.querySelector(`[data-value="clear"]`);
let numbers = document.querySelectorAll(`[data-value="numbers"]`);
let operators = document.querySelectorAll(`[data-value="operators"]`);
let result = document.querySelector(`[data-value="result"]`);
let positiveNegative = document.querySelector(
  `[data-value="positiveNegative"]`
);

// this object will save the get the numbers, operator and store the result.
// this object will also help updateDisplay() to update the DOM.
let equation = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: "",
};

//this function will only calculate the results life an idiot calculator, but this is IIFE function.
const calculator = (() => {
  const add = (a, b) => parseFloat(a) + parseFloat(b);
  const minus = (a, b) => parseFloat(a) - parseFloat(b);
  const divide = (a, b) => parseFloat(a) / parseFloat(b);
  const multiply = (a, b) => parseFloat(a) * parseFloat(b);

  return { add, minus, divide, multiply };
})();

//updates the display, get the data from equation and manipulate the ""display" DOM object.
function updateTheDisplay() {
  display[0].removeChild(display[0].firstChild);

  if (equation.result) {
    display[0].appendChild(document.createTextNode(equation.result));
    return;
  }
  let pointer = equation.operator
    ? equation.secondNumber
    : equation.firstNumber;
  display[0].appendChild(document.createTextNode(pointer));
}

function clearDisplay() {
  display[0].removeChild(display[0].firstChild);
  display[0].appendChild(document.createTextNode("0"));
  equation = {
    firstNumber: "",
    secondNumber: "",
    operator: "",
  };
}

// this function will convert the input values like "+" to "plus" so that we can store them in equation.
// then later on its easier to use them to call a function.
function getOperator(event) {
  let signMeaning = {
    "+": "add",
    "-": "minus",
    "÷": "divide",
    x: "multiply",
    "%": "reminder",
  };

  if (equation.firstNumber)
    equation.operator = signMeaning[`${event.target.innerHTML}`];
}

// to get numbers only from the DOM.
// this function is trigged on number DOM that we declared at the start of the document
function getNumbers(event) {
  let value = event.target.innerHTML;
  if (
    value === "." &&
    (equation.firstNumber.includes(".") || equation.secondNumber.includes("."))
  )
    return;
  equation.operator
    ? (equation.secondNumber = equation.secondNumber + value)
    : (equation.firstNumber = equation.firstNumber + value);
  updateTheDisplay();
}

// trigged from -/+ operator to change number to negative
function changeNegation() {
  equation.operator
    ? (equation.secondNumber = equation.secondNumber * -1)
    : (equation.firstNumber = equation.firstNumber * -1);

  updateTheDisplay();
}

// get the result and then call the updateTheDisplay to update
function getResult() {
  if (!(equation.firstNumber && equation.operator)) return;
  let result = calculator[equation.operator](
    equation.firstNumber,
    equation.secondNumber
  );

  equation.result = result;
  updateTheDisplay();
}

// all the onClick event are below
clearButton.addEventListener("click", clearDisplay);
numbers.forEach((number) => number.addEventListener("click", getNumbers));
operators.forEach((operator) =>
  operator.addEventListener("click", getOperator)
);

positiveNegative.addEventListener("click", changeNegation);
result.addEventListener("click", getResult);
