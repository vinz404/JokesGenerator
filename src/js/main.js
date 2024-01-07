const fetchWithTimeout = (url, options, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error("Timeout"));
    }, timeout)
  );

  const fetchPromise = fetch(url, { ...options, signal: controller.signal });

  return Promise.race([fetchPromise, timeoutPromise]);
};

const getJokes = () => {
  const url = "https://candaan-api.vercel.app/api/text/";

  return fetchWithTimeout(url)
    .then((res) => res.json())
    .then((result) => {
      const dataJoke =
        result.data[Math.floor(Math.random() * result.data.length)];
      return dataJoke;
    })
    .catch((error) => {
      throw error;
    });
};

const tambahInput = (event) => {
  if (event.key === "Enter") {
    createInput();
  }
};
let lastcreatedInput;
const createInput = () => {
  const existingInputs = document.querySelectorAll(".textInput");
  const lastInput = existingInputs[existingInputs.length - 1];
  const newInput = document.createElement("input");
  console.log(newInput);
  console.log(lastInput);

  newInput.className = "textInput styledInput";

  newInput.addEventListener("keydown", tambahInput);

  const h1Element = document.createElement("h1");
  h1Element.classList.add("sysh1", "font-courier", "flex", "flex-row");

  // Buat elemen span untuk 'users'
  const usersSpan = document.createElement("span");
  usersSpan.classList.add("text-[#1A8E63]");
  usersSpan.textContent = "users";

  // Buat elemen span untuk '@jokesystem'
  const atJokeSystemSpan = document.createElement("span");
  atJokeSystemSpan.classList.add("text-[#5E468C]");
  atJokeSystemSpan.textContent = "jokesystem";

  // Buat elemen span untuk ' :~$'
  const terminalSpan = document.createElement("span");
  terminalSpan.classList.add("text-[#666A6B]");
  terminalSpan.textContent = " :~$";

  // Masukkan semua elemen span ke dalam elemen h1
  h1Element.appendChild(usersSpan);
  h1Element.appendChild(document.createTextNode("@"));
  h1Element.appendChild(atJokeSystemSpan);
  h1Element.appendChild(document.createTextNode(" "));
  h1Element.appendChild(terminalSpan);

  const inputsContainer = document.createElement("div");
  inputsContainer.className = "inputsContainer flex flex-row font-courier";

  inputsContainer.appendChild(h1Element);
  inputsContainer.appendChild(newInput);

  newInput.focus();
  lastInput.disabled = true;

  const jokeElement = document.createElement("p");
  if (lastInput.value === "humorize -me") {
    getJokes()
      .then((result) => {
        jokeElement.textContent = result;
        jokeElement.className = "result font-courier";
        containerapalah.appendChild(jokeElement);
        containerapalah.appendChild(inputsContainer);
      })
      .catch((error) => {
        jokeElement.textContent = "gagal mendapatkan jokes..."; // Menampilkan pesan error timeout
        jokeElement.className = "result font-courier";
        containerapalah.appendChild(jokeElement);
        containerapalah.appendChild(inputsContainer);
      });
  } else {
    //Error: Command not found. Please type
    const jokeElementError = document.createElement("p");
    jokeElementError.classList.add("font-courier");

    const jokeElementErrorSpan1 = document.createElement("span");
    jokeElementErrorSpan1.classList.add("text-[#F8818E]");
    jokeElementErrorSpan1.textContent = "Error: ";

    const jokeElementErrorSpan2 = document.createElement("span");
    jokeElementErrorSpan2.classList.add("text-[#92D3A2]");
    jokeElementErrorSpan2.textContent = "humorize -me";

    jokeElementError.appendChild(jokeElementErrorSpan1);
    jokeElementError.appendChild(
      document.createTextNode("Command not found. Please type  ")
    );
    jokeElementError.appendChild(jokeElementErrorSpan2);

    jokeElement.className = "result font-courier";
    containerapalah.appendChild(jokeElementError);
    containerapalah.appendChild(inputsContainer);
  }

  lastCreatedInput = newInput; // Set input terakhir ke variabel lastCreatedInput

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && lastCreatedInput === newInput) {
      newInput.value = lastInput.value; // Set nilai hanya jika ini input terakhir
    } else if (event.key === "ArrowDown" && lastCreatedInput === newInput) {
      newInput.value = ""; // Kosongkan nilai hanya jika ini input terakhir
    }
  });
};

document.addEventListener("DOMContentLoaded", function (event) {
  // const containerapalah = document.querySelector("#containerapalah");
  // const lastinputsContainer = containerapalah.lastElementChild;
  // const "lastTextInput" = lastinputsContainer.lastElementChild;

  const textInputs = document.querySelectorAll(".textInput");

  textInputs.forEach((input) => {
    input.addEventListener("keydown", tambahInput);
  });
});
