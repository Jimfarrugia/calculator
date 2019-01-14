const calculator = document.querySelector("#calculator");
const keys = calculator.querySelector("#keypad");
const display = document.getElementById("display");

// Listen for click
keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    // Get key pressed
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    // Get display
    const displayedNum = display.textContent;
    // Get previous key
    const previousKeyType = calculator.dataset.previousKeyType;

    // Check/adjust display font size
    if (displayedNum.length > 25) {
      display.textContent = backspace(displayedNum);
      return alert("Sorry! Maximum 25 digits.");
    } else if (displayedNum.length >= 16) {
      display.style.fontSize = "1.2rem";
      display.style.padding = "30px";
    } else if (displayedNum.length >= 7) {
      display.style.fontSize = "2rem";
      display.style.padding = "20px";
    } else {
      display.style.fontSize = "4rem";
    }

    // Remove .is-depressed from all keys
    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove("is-depressed")
    );

    // If logo is clicked, navigate to portfolio
    if (action === "portfolio") {
      window.location.href = "http://jimfarrugia.com";
    }

    // NUMBER PRESSED
    /* 
      If button pressed does not have an action assigned,
      then it must be a number key.
      If the current display is '0', replace it with the new number.
      Else append the current display with the new number.
    */
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }
    // If button pressed is decimal AND there is no decimal point already
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }
    // If button pressed is an operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      // Add custom attributes
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }
    // If button pressed is clear (CE)
    if (action === "clear") {
      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }
    // If button pressed is reset (C)
    if (action === "reset") {
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
      display.textContent = 0;
    }
    // If button pressed is backspace
    if (action === "backspace") {
      display.textContent = backspace(displayedNum);
      calculator.dataset.previousKeyType = "backspace";
    }
    // If button pressed is calculate
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // set modValue attribute
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

/*
  FUNCTION - Calculate
*/
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};
/*
  FUNCTION - Backspace
*/
const backspace = input => {
  if (input != "0") {
    if (input.length < 2) {
      return "0";
    } else {
      return input.substring(0, input.length - 1);
    }
  } else {
    return input;
  }
};
/*
  FUNCTION - Adjust font
*/
const adjustFont = () => {};
