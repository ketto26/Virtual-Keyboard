let englishKeys = [
  "`",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "Delete",
  "Tab",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "[",
  "]",
  "\\",
  "CapsLock",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  ";",
  "'",
  "Return",
  "Shift",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  ",",
  ".",
  "/",
  "▲",
  "Shift",
  "Ctrl",
  "Alt",
  "Command",
  "Space",
  "Alt",
  "◄",
  "▼",
  "►",
  "🌐",
];

let russianKeys = [
  "`",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "Delete",
  "Tab",
  "Й",
  "Ц",
  "У",
  "К",
  "Е",
  "Н",
  "Г",
  "Ш",
  "Щ",
  "З",
  "[",
  "]",
  "\\",
  "CapsLock",
  "Ф",
  "Ы",
  "В",
  "А",
  "П",
  "Р",
  "О",
  "Л",
  "Д",
  ";",
  "'",
  "Return",
  "Shift",
  "Я",
  "Ч",
  "С",
  "М",
  "И",
  "Т",
  "Ь",
  ",",
  ".",
  "/",
  "▲",
  "Shift",
  "Ctrl",
  "Alt",
  "Command",
  "Space",
  "Alt",
  "◄",
  "▼",
  "►",
  "🌐",
];

const inputDiv = document.createElement("div");
const textArea = document.createElement("textarea");
inputDiv.className = "input";
textArea.id = "input";

inputDiv.appendChild(textArea);
document.body.appendChild(inputDiv);

let keys = englishKeys;

let keyboard = document.createElement("div");
let capsLock = false;
keyboard.classList.add("keyboard");
document.body.appendChild(keyboard);

let replacementValues = [")", "!", "@", "#", "$", "%", "^", "&", "*", "("];

const keyEvent = (button, key) => {
  let input = document.getElementById("input");

  if (["Shift", "Command", "Alt", "Ctrl", "Fn"].includes(key)) {
    return;
  }

  if (key.match(/[0-9]/) && capsLock) {
    input.value += replacementValues[Number(key)];
    return;
  }

  switch (key) {
    case "Return":
      input.value += "\n";
      break;
    case "CapsLock":
      capsLock = !capsLock;
      break;
    case "Space":
      input.value += " ";
      break;
    case "Tab":
      input.value += "    ";
      break;
    case "Delete":
      input.value = input.value.slice(0, -1);
      break;
    case "🌐":
      keys = keys === englishKeys ? russianKeys : englishKeys;
      loadKeyboard(keys);
      break;
    default:
      input.value += capsLock
        ? button.innerText
        : button.innerText.toLowerCase();
  }
};

const loadKeyboard = (keys) => {
  keyboard.innerHTML = "";

  for (let key of keys) {
    let button = document.createElement("button");
    button.id = key.toLowerCase();
    button.innerText = key;
    button.classList.add("key");
    button.classList.add(key.toLowerCase());
    button.addEventListener("click", () => keyEvent(button, key));
    keyboard.appendChild(button);
  }
};

document.addEventListener("keydown", (ev) => {
  let key = String(ev.key);
  let button = document.getElementById(key);
  button.click();
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
});

loadKeyboard(keys);
