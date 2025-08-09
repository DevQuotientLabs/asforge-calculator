const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    switch (value) {
      case "c":
        currentInput = "";
        display.value = "";
        break;

      case "back":
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
        break;

      case "=":
        try {
          // Evaluasi ekspresi matematika
          const result = eval(currentInput);
          display.value = result;
          currentInput = result.toString();
          resultDisplayed = true;
        } catch (error) {
          display.value = "Error";
          currentInput = "";
        }
        break;

      default:
        // Jika hasil sudah ditampilkan dan user mulai input baru
        if (resultDisplayed && /[0-9.]/.test(value)) {
          currentInput = value;
          resultDisplayed = false;
        } else {
          currentInput += value;
        }
        display.value = currentInput;
        break;
    }
  });
});
