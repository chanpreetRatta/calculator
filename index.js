let display = document.getElementsByClassName("display");
let buttons = document.querySelectorAll(".button");
let clearButton = document.querySelector(`[data-value="clear"]`);

let equation = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
};

function updateTheDisplay() {
  console.log("display Updated");
}

function clearDisplay() {
  display[0].removeChild(display[0].firstChild);
  display[0].appendChild(document.createTextNode("0"));
}

function isOperator(value) {
  let operators = ["divide", "multiply", "minus", "plus"];
  return operators.includes(value.target.dataset.value);
}

function getUserInput(event) {
  if (isOperator(event) && equation.firstNumber) {
    equation.operator = event.target.dataset.value;
  } else if (!equation.firstNumber) equation.firstNumber = event;
}

buttons.forEach((button) => {
  button.addEventListener("click", getUserInput);
});

clearButton.addEventListener("click", clearDisplay);
