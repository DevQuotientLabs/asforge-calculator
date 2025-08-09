const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resultDisplayed = false;

// Fungsi untuk membacakan teks dengan screen reader
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID"; // Bisa diganti ke 'en-US' jika ingin bahasa Inggris
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
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
        speak("Hapus satu karakter");
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
        // Jika hasil sudah ditampilkan dan user mulai input baru
        if (resultDisplayed && /[0-9.]/.test(value)) {
          currentInput = value;
          resultDisplayed = false;
        } else {
          currentInput += value;
        }

        display.value = currentInput;

        // Bacakan input yang ditekan
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
