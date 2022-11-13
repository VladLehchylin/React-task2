import { useState, useEffect } from "react";

import AllLetters from "./components/AllLetters";
import Attempts from "./components/Attempts";
import ControlButtons from "./components/ControlButtons";
import CorrectLetter from "./components/CorrectLetter";
import LetterCard from "./components/LetterCard";
import Message from "./components/Message";
import StartField from "./components/StartField";
import Timer from "./components/Timer";

import "./App.css";

let letters = [];
let correctLetter = "";
let lettersCopy = [];

function App() {
  const [letters, setLetters] = useState([]);
  const [correctLetter, setCorrectLetter] = useState("");

  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [hideLetter, setHideLetter] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHideLetter(true);
      setTimer(false);
    }, 5000);

    if (start) {
      setHideLetter(false);
      setTimeLeft(null);
      setTimer(true);
      setMessage("");
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const availableLetters = {
    1: "A",
    2: "B",
    3: "C",
  };

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomLetter = () => availableLetters[randomNumber(1, 3)];

  const initLetters = () => {
    for (let i = 0; i < 9; i++) {
      letters[i] = randomLetter();
    }

    correctLetter = letters[randomNumber(0, letters.length - 1)];
    lettersCopy = [...letters];
  };

  const startGame = () => {
    initLetters();
    setStart(true);
    setTimeLeft(true);
  };

  const exitGame = () => {
    setStart(false);
    setAttempts(0);
    setTimeLeft(null);
  };

  return (
    <div className="App">
      <>
        {start ? (
          <>
            {message ? (
              <Message message={message} startGame={startGame} />
            ) : null}
            <div className="flex info">
              <CorrectLetter correctLetter={correctLetter} />
              <Attempts attempts={attempts} />
              {timer ? <Timer /> : <span>"GO"</span>}
            </div>
            <div className="game-field">
              {message ? (
                <AllLetters />
              ) : (
                letters.map((item, index) => (
                  <LetterCard
                    key={index}
                    letter={item}
                    hideLetter={hideLetter}
                    message={setMessage}
                    setAttempts={setAttempts}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          <StartField />
        )}
        <ControlButtons
          start={start}
          exitGame={exitGame}
          startGame={startGame}
        />
      </>
    </div>
  );
}

export default App;
