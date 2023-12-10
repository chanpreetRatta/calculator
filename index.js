let display = document.getElementsByClassName("display");
let buttons = document.querySelectorAll(".button");
let clearButton = document.querySelector(`[data-value="clear"]`);
let numbers = document.querySelectorAll(`[data-value="numbers"]`);
let operators = document.querySelectorAll(`[data-value="operators"]`);
let result = document.querySelector(`[data-value="result"]`);
let positiveNegative = document.querySelector(
  `[data-value="positiveNegative"]`
);

let equation = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: "",
};

const calculator = (() => {
  const add = (a, b) => parseInt(a) + parseInt(b);
  const minus = (a, b) => parseInt(a) - parseInt(b);
  const divide = (a, b) => parseInt(a) / parseInt(b);
  const multiply = (a, b) => parseInt(a) * parseInt(b);

  return { add, minus, divide, multiply };
})();

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

function getNumbers(event) {
  let value = event.target.innerHTML;
  equation.operator
    ? (equation.secondNumber = equation.secondNumber + value)
    : (equation.firstNumber = equation.firstNumber + value);
  updateTheDisplay();
}

function changeNegation() {
  equation.operator
    ? (equation.secondNumber = equation.secondNumber * -1)
    : (equation.firstNumber = equation.firstNumber * -1);

  updateTheDisplay();
}

function getResult() {
  if (!(equation.firstNumber && equation.operator)) return;
  let result = calculator[equation.operator](
    equation.firstNumber,
    equation.secondNumber
  );

  equation.result = result;
  updateTheDisplay();
}

clearButton.addEventListener("click", clearDisplay);
numbers.forEach((number) => number.addEventListener("click", getNumbers));
operators.forEach((operator) =>
  operator.addEventListener("click", getOperator)
);

positiveNegative.addEventListener("click", changeNegation);
result.addEventListener("click", getResult);
