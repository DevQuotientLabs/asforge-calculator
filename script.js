const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const voiceToggle = document.getElementById("voice-toggle");

// Pastikan daftar suara sudah tersedia
let availableVoices = [];
speechSynthesis.onvoiceschanged = () => {
  availableVoices = speechSynthesis.getVoices();
};

// Fungsi untuk bicara
function speak(text) {
  if (!voiceToggle.checked) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const userLang = navigator.language || "en-US";
  utterance.lang = userLang;

  const matchedVoice = availableVoices.find((v) => v.lang === userLang);
  if (matchedVoice) utterance.voice = matchedVoice;

  speechSynthesis.speak(utterance);
}

// Mapping operator sesuai bahasa
function getSpokenOperator(value) {
  const lang = navigator.language;
  const map = {
    id: { "+": "tambah", "-": "kurang", "*": "kali", "/": "bagi" },
    en: { "+": "plus", "-": "minus", "*": "times", "/": "divided by" },
  };
  const key = lang.startsWith("id") ? "id" : "en";
  return map[key][value] || value;
}

// Event listener untuk tombol
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
      case "C":
        display.textContent = "";
        break;

      case "=":
        try {
          const result = eval(display.textContent);
          display.textContent = result;
          speak(`${result}`); // Tanpa 'Hasilnya adalah'
        } catch {
          display.textContent = "Error";
          speak("Terjadi kesalahan");
        }
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        display.textContent += value;
        speak(getSpokenOperator(value));
        break;

      case "←":
        display.textContent = display.textContent.slice(0, -1);
        break;

      default:
        display.textContent += value;
        speak(value);
        break;
    }
  });
});
