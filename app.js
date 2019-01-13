const calculator = document.querySelector("#calculator");
const keys = calculator.querySelector("#keypad");
const display = document.querySelector("#display");

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

    // Remove .is-depressed from all keys
    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove("is-depressed")
    );

    // NUMBER PRESSED
    /* 
      If button pressed does not have an action assigned,
      then it must be a number key.
      If the current display is '0', replace it with the new number.
      Else append the current display with the new number.
    */
    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = "none";
      } else {
        display.textContent += keyContent;
      }
    }
    // If button pressed is decimal AND there is no decimal point already
    if (action === "decimal" && !displayedNum.includes(".")) {
      if (previousKeyType === "operator") {
        display.textContent = "0.";
      } else {
        display.textContent += ".";
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
      key.classList.add("is-depressed");
      // Add custom attributes
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }
    // If button pressed is clear (CE)
    if (action === "clear") {
      console.log("clear!");
      calculator.dataset.previousKeyType = "clear";
    }
    // If button pressed is reset (C)
    if (action === "reset") {
      console.log("reset!");
      calculator.dataset.previousKeyType = "reset";
    }
    // If button pressed is backspace
    if (action === "backspace") {
      console.log("backspace!");
      calculator.dataset.previousKeyType = "backspace";
    }
    // If button pressed is calculate
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);

      calculator.dataset.previousKeyType = "decimal";
    }
  }
});

/*
  Calculate
*/
const calculate = (n1, operator, n2) => {
  let result = "";

  switch (operator) {
    case "add":
      result = parseFloat(n1) + parseFloat(n2);
      break;
    case "subtract":
      result = parseFloat(n1) - parseFloat(n2);
      break;
    case "multiply":
      result = parseFloat(n1) * parseFloat(n2);
      break;
    case "divide":
      result = parseFloat(n1) / parseFloat(n2);
      break;
  }

  return result;
};
