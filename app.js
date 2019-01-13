const calculator = document.getElementById("calculator");
const keys = calculator.querySelector("#keypad");
const display = document.getElementById("display");

// Listen for click
keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    // Get key pressed
    const key = e.target;
    const action = key.dataset.action;

    // If button pressed does not have an action assigned,
    // it must be a number key
    if (!action) {
      console.log("number!");
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
    // If button pressed is decimal
    if (action === "decimal") {
      console.log("decimal!");
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
