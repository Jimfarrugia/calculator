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

      if (firstValue && operator && previousKeyType !== "operator") {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        // calcValue is new firstValue
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
