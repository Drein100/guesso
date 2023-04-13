function generateRandomNumber() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = "";
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * numbers.length);
      result += numbers[index];
      numbers.splice(index, 1);
    }
    return result;
  }
  
  let random = generateRandomNumber();
  let randomArray = random.split("");
  

let counter = 0;
const tbody = document.getElementById("tbody");
const submitBtn = document.getElementById("submit");

function resetGame() {
    const newRandom = generateRandomNumber();
    random = newRandom;
    randomArray = random.split("");
  
    // reset the guess counter and the table of guesses
    counter = 0;
    const tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
  
  
  const infoBtn = document.getElementById("infoBtn");
  const info = document.getElementById("info");
  const closeBtn = document.getElementById("btn")
  infoBtn.addEventListener("click", () => {
    info.classList.remove("hidden");
    closeBtn.addEventListener("click", () => {
      info.classList.add("hidden");
    })
  });
  
  window.addEventListener("click", (event) => {
    if (event.target === info) {
      info.classList.add("hidden");
    }
  });


submitBtn.addEventListener("click", () => {
  const guessInput = document.getElementById("guess");
  const guess = guessInput.value;
  const guessArray = String(guess).split("");
  let correctNumbers = 0;
  let correctPositions = 0;
  let guessString = "";


  const popup2 = document.getElementById("popup-2");
  const popupButton2 = document.querySelector(".popup__button-2");
  popupButton2.addEventListener("click", () => {
    popup2.classList.add("hidden");
});

  if (guess.length !== 4 || guess.includes("0") || hasDuplicates(guessArray)) {
    popup2.classList.remove("hidden");
    guessInput.value = "";
    return;
  }
  function hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
  }

  counter++;

  for (let i = 0; i < guessArray.length; i++) {
    if (randomArray.includes(guessArray[i])) {
      correctNumbers++;
      if (randomArray[i] === guessArray[i]) {
        correctPositions++;
      }
    }
  }

  guessString = guessArray.join("");

  const row = document.createElement("tr");
  const guessTd = document.createElement("td");
  const correctNumbersTd = document.createElement("td");
  const correctPositionsTd = document.createElement("td");

  guessTd.innerText = guessString;
  correctNumbersTd.innerText = correctNumbers;
  correctPositionsTd.innerText = correctPositions;

  row.appendChild(guessTd);
  row.appendChild(correctNumbersTd);
  row.appendChild(correctPositionsTd);

  tbody.appendChild(row);

  const popup = document.getElementById("popup");
  const popupTitle = document.querySelector(".popup__title");
  const popupMessage = document.querySelector(".popup__message");
  const popupButton = document.querySelector(".popup__button");
  popupButton.addEventListener("click", () => {
    resetGame();
    popup.classList.add("hidden");
});
if (correctPositions === 4) {
      popupTitle.innerText = "Congratulations!";
      popupMessage.innerText = `You guessed the number in ${counter} tries!`;
      popup.classList.remove("hidden");
  } else if (counter === 10) {
      popupTitle.innerText = "Sorry!";
      popupMessage.innerText = `You failed to guess the number in 10 tries. The number was ${random}.`;
      popup.classList.remove("hidden");
  }
  guessInput.value = "";
  guessInput.focus();
});