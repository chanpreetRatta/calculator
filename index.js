let display = document.getElementsByClassName("display");
let buttons = document.getElementsByClassName("button");
let FIRST_VALUE = "";
let SECOND_VALUE = "";
let OPERATOR = undefined;

function userInput() {
  let input = this.dataset.value;

  if (!OPERATOR && !isOperator(input)) {
    if (display[0].textContent === "0") {
      display[0].textContent = input;
      FIRST_VALUE += input;
    } else {
      display[0].textContent += input;
      FIRST_VALUE += input;
    }
  } else if (isOperator(input) && SECOND_VALUE === "") {
    OPERATOR = input;
    display[0].textContent = 0;
  } else if (input === "equals") {
    display[0].textContent = result(FIRST_VALUE, SECOND_VALUE, OPERATOR);
  } else {
    if (display[0].textContent === "0") {
      display[0].textContent = input;
      SECOND_VALUE += input;
    } else {
      display[0].textContent += input;
      SECOND_VALUE += input;
    }
  }

  console.log(FIRST_VALUE, SECOND_VALUE, OPERATOR);
}

function isOperator(value) {
  return (
    value === "plus" ||
    value === "minus" ||
    value === "multiply" ||
    value === "divide" ||
    value === "reminder"
  );
}

function result(firstValue, secondValue, operator) {
  if (operator === "plus") {
    return +firstValue + +secondValue;
  }
}

for (let button of buttons) {
  button.addEventListener("click", userInput);
}
