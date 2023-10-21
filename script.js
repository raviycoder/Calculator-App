const keys = document.querySelectorAll(".key1");
const display_input = document.querySelector(".answer");
const myoutput = document.querySelector(".entering");
const symbol = document.querySelector(".numberx");
const display = document.querySelector(".output");
const button = document.querySelector(".dot");
const toggle = document.querySelector(".toggle");
const calculator = document.querySelector(".calculator");
const remove = document.querySelector(".delete");
const body = document.body;
const hello = document.querySelector(".myname");
const moon = document.querySelector(".icon");

toggle.addEventListener("click", () => {
  button.classList.toggle("active");
  toggle.classList.toggle("active");
  body.classList.toggle("active");
  moon.classList.toggle("active");
  calculator.classList.toggle("dark");
  display.classList.toggle("dark");
  display_input.classList.toggle("dark");
  hello.classList.toggle("dark");
  myoutput.classList.toggle("dark");
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      keys[i].classList.toggle("dark");
      remove.classList.toggle("dark");
    }
  }
});

let string = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "cancel") {
      string = "";
      display_input.innerHTML = "";
      myoutput.innerHTML = "";
      display_input.style.fontSize = "40px";
      display_input.style.bottom = "8px";
    } else if (value == "delete") {
      string = string.slice(0, -1);
      display_input.innerHTML = CleanInput(string);
    } else if (value == "=") {
      let result = eval(PrepareInput(string));
      myoutput.innerHTML = CleanOutput(result);
      display_input.style.fontSize = "20px";
      display_input.style.bottom = "20px";
      // } else if (value == "=") {
    } else {
      if (ValidateInput(value)) {
        string += value;
        display_input.innerHTML = CleanInput(string);
      }
    }
  });
  key.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      let result = eval(PrepareInput(string));
      myoutput.innerHTML = CleanOutput(result);
      display_input.style.fontSize = "20px";
      display_input.style.bottom = "20px";
    } else if (e.key === "Backspace") {
      string = string.slice(0, -1);
      display_input.innerHTML = CleanInput(string);
    } else if (e.key === "Delete") {
      string = "";
      display_input.innerHTML = "";
      myoutput.innerHTML = "";
      display_input.style.fontSize = "40px";
    }
  });
}

function CleanInput(string) {
  let input_array = string.split("");
  let input_array_length = input_array.length;

  try {
    for (let i = 0; i < input_array_length; i++) {
      if (input_array[i] == "*") {
        input_array[i] = `×`;
      } else if (input_array[i] == "/") {
        input_array[i] = `÷`;
      } else if (input_array[i] == "+") {
        input_array[i] = `+`;
      } else if (input_array[i] == "-") {
        input_array[i] = `-`;
      }
    }
  } catch (error) {
    alert("This not a valid problem");
  }
  return input_array.join("");
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }
  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function ValidateInput(value) {
  let last_input = string.slice(-1);
  let operators = ["+", "-", "*", "/"];
  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(string) {
  let input_array = string.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
