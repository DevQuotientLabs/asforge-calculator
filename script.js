const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const voiceToggle = document.getElementById("voiceToggle");

let currentInput = "";
let resultDisplayed = false;

function speak(text) {
  if (!voiceToggle.checked) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  speechSynthesis.speak(utterance);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    switch (value) {
      case "c":
        currentInput = "";
        display.value = "";
        speak("Dihapus semua");
        break;

      case "back":
        const deletedChar = currentInput.slice(-1);
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;

        let spokenChar = deletedChar;
        if (deletedChar === "+") spokenChar = "tambah";
        else if (deletedChar === "-") spokenChar = "kurang";
        else if (deletedChar === "*") spokenChar = "kali";
        else if (deletedChar === "/") spokenChar = "bagi";
        else if (deletedChar === ".") spokenChar = "titik";

        if (spokenChar) speak(`${spokenChar} dihapus`);
        break;

      case "=":
        try {
          const result = eval(currentInput);
          display.value = result;
          currentInput = result.toString();
          resultDisplayed = true;
          speak(`Hasilnya adalah ${result}`);
        } catch (error) {
          display.value = "Error";
          currentInput = "";
          speak("Terjadi kesalahan");
        }
        break;

      default:
        // Jika hasil sudah ditampilkan dan user menekan operator
        if (resultDisplayed && /[+\-*/]/.test(value)) {
          currentInput = display.value + value;
          resultDisplayed = false;
        }
        // Jika hasil sudah ditampilkan dan user menekan angka/desimal
        else if (resultDisplayed && /[0-9.]/.test(value)) {
          currentInput = value;
          resultDisplayed = false;
        } else {
          currentInput += value;
        }

        display.value = currentInput;

        let spokenValue = value;
        if (value === "+") spokenValue = "tambah";
        else if (value === "-") spokenValue = "kurang";
        else if (value === "*") spokenValue = "kali";
        else if (value === "/") spokenValue = "bagi";
        else if (value === ".") spokenValue = "titik";

        speak(spokenValue);
        break;
    }
  });
});
