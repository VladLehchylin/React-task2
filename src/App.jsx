import { useState, useEffect } from "react";
import "./App.css";

const startField = ["L", "E", "T", "'", "S", " ", "P", "L", "E", "Y"];

const availableLetters = {
  1: "A",
  2: "B",
  3: "C",
};

let letters = [];
let lettersCopy = [];
let correctLatter = "";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomLetter = () => availableLetters[randomNumber(1, 3)];

const initLetters = () => {
  for (let i = 0; i < 9; i++) {
    letters[i] = randomLetter();
  }

  correctLatter = letters[randomNumber(0, letters.length - 1)];
  lettersCopy = [...letters];
};

function Timer() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return <div>Time: {counter}</div>;
}

function AllLetters() {
  return (
    <>
      {letters.map((item, index) => (
        <button key={index} className="letter-button">
          {item}
        </button>
      ))}
    </>
  );
}

function StartField() {
  return (
    <div className="flex">
      {startField.map((item, index) => (
        <span key={index} className="letter">
          {item}
        </span>
      ))}
    </div>
  );
}

function LetterCard({ letter, hideLetter, message, setAttempts }) {
  const [showLetter, setShowLetter] = useState(false);

  const letterPosition = () => lettersCopy.indexOf(correctLatter);

  const checkUserAnswer = () => {
    if (correctLatter !== letter) {
      setShowLetter(true);
      setAttempts((prev) => prev + 1);
      message("YOU LOSE");
    } else {
      setShowLetter(true);
      setAttempts((prev) => prev + 1);
      lettersCopy[letterPosition()] = "";

      if (letterPosition() === -1) {
        message("YOU WIN");
      }
    }
  };

  return (
    <>
      {hideLetter && !showLetter ? (
        <button className="letter-button" onClick={checkUserAnswer}>
          *
        </button>
      ) : (
        <button className="letter-button">{letter}</button>
      )}
    </>
  );
}

function Message({ message, startGame }) {
  return (
    <>
      <div className="message">
        {message === "YOU WIN" ? (
          <p>&#128526;&#128526;&#128526;</p>
        ) : (
          <p>&#128549;&#128549;&#128549;</p>
        )}
        <p>{message}</p>
        <p>Press Restart To Play Again</p>
        <button className="btn" onClick={startGame}>
          Rstart
        </button>
      </div>
    </>
  );
}

function App() {
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [hideLetter, setHideLetter] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      setHideLetter(true);
      setTimer(false);
    }, 5000);

    if (start) {
      setHideLetter(false);
      setTimer(true);
      setMessage("");
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const startGame = () => {
    initLetters();
    setStart(true);
    setTimeLeft(1);
  };

  const exitGame = () => {
    setStart(false);
    setAttempts(0);
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
              <span>Find All The Letters &#8594; {correctLatter}</span>
              <span>{timer ? <Timer /> : "GO"}</span>
              <span>Attempts: {attempts}</span>
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
      </>
      {!start ? (
        <button className="btn" onClick={startGame}>
          Start
        </button>
      ) : (
        <button className="btn" onClick={exitGame}>
          Exit
        </button>
      )}
    </div>
  );
}

export default App;
