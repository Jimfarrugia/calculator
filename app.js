/*
  Notes:

  - User can add more than one decimal point/period
*/

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
    const displayedNum = display.textContent;

    // NUMBER PRESSED
    /* 
      If button pressed does not have an action assigned,
      then it must be a number key.
      If the current display is '0', replace it with the new number.
      Else append the current display with the new number.
    */
    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent += keyContent;
      }
    }
    // If button pressed is decimal
    if (action === "decimal") {
      display.textContent += ".";
    }
    // If button pressed is an operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator!");
    }
    // If button pressed is clear (CE)
    if (action === "clear") {
      console.log("clear!");
    }
    // If button pressed is reset (C)
    if (action === "reset") {
      console.log("reset!");
    }
    // If button pressed is backspace
    if (action === "backspace") {
      console.log("backspace!");
    }
    // If button pressed is calculate
    if (action === "calculate") {
      console.log("calc!");
    }
  }
});
