let display = document.getElementsByClassName("display");
let buttons = document.getElementsByClassName("button");
let FIRST_VALUE = "0";
let SECOND_VALUE = "0";
let OPERATOR = undefined;

function userInput() {
  let input = this.dataset.value;
  console.log(input);
  let className = this.className.split(" ").includes("number");
  let emptyDisplay = display[0].textContent === "0" ? true : false;

  if (input === "clear") {
    display[0].textContent = 0;
    FIRST_VALUE = 0;
    SECOND_VALUE = 0;
    OPERATOR = undefined;
  }

  if (input === "positiveNegative") {
    if (OPERATOR) {
      SECOND_VALUE[0] === "0"
        ? (SECOND_VALUE[0] = "-")
        : (SECOND_VALUE[0] = "0");
    } else {
      FIRST_VALUE[0] === "0" ? (FIRST_VALUE[0] = "-") : (FIRST_VALUE[0] = "0");
    }
  }

  if (!OPERATOR && !isOperator(input) && className) {
    if (emptyDisplay) {
      display[0].textContent = input;
      FIRST_VALUE += input;
    } else {
      display[0].textContent += input;
      FIRST_VALUE += input;
    }
  } else if (isOperator(input) && SECOND_VALUE === 0) {
    OPERATOR = input;
    display[0].textContent = 0;
  } else if (input === "equals") {
    display[0].textContent = result(FIRST_VALUE, SECOND_VALUE, OPERATOR);
  } else if (className) {
    if (emptyDisplay) {
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
  } else if (operator === "multiply") {
    return +firstValue * +secondValue;
  } else if (operator === "divide") {
    return +firstValue / +secondValue;
  } else if (operator === "minus") {
    return +firstValue - +secondValue;
  } else if (operator === "reminder") {
    return +firstValue + +secondValue;
  }
}

for (let button of buttons) {
  button.addEventListener("click", userInput);
}
