const availableLetters = {
  1: "A",
  2: "B",
  3: "C",
};

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const init = () => {
  let info = {
    letters: [],
    lettersCopy: [],
    correctLetter: "",
  };

  for (let i = 0; i < 9; i++) {
    info.letters.push(availableLetters[randomNumber(1, 3)]);
  }

  info.lettersCopy = [...info.letters];

  info.correctLetter = info.letters[randomNumber(0, info.letters.length - 1)];

  return info;
};

export default init;
