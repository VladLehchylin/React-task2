import { useState, useEffect } from "react";
import "./App.css";

const startBoard = ["L", "E", "T", "'", "S", " ", "P", "L", "E", "Y"];

const availableLetters = {
  1: "A",
  2: "B",
  3: "C",
};

let letters = [];
let lettersCopy = [];
let corectLatter = "";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomLetter = () => availableLetters[randomNumber(1, 3)];

const initLetters = () => {
  for (let i = 0; i < 9; i++) {
    letters[i] = randomLetter();
  }

  corectLatter = letters[randomNumber(0, letters.length - 1)];
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
      {letters.map((item) => (
        <button className="button">{item}</button>
      ))}
    </>
  );
}

function StartBord() {
  return (
    <div className="flex">
      {startBoard.map((item) => (
        <button className="button btn-start">{item}</button>
      ))}
    </div>
  );
}

function LetterCard({ letter, hideLetter, message, setAttempts }) {
  const [showLetter, setShowLetter] = useState(false);
  const [classBtn, setClassBtn] = useState("");

  const letterPosition = () => lettersCopy.indexOf(corectLatter);

  const checkUserAnswer = () => {
    if (corectLatter !== letter) {
      setShowLetter(true);
      setAttempts((prev) => prev + 1);
      setClassBtn("wrong");
      message("YOU LOSE");
      setHideLetter({ hideAll: true });
    } else {
      setShowLetter(true);
      setClassBtn("correct");
      setAttempts((prev) => prev + 1);
      lettersCopy[letterPosition()] = "";

      if (letterPosition() === -1) {
        message("YOU WIN");
        setHideLetter({ hideAll: true });
      }
    }
  };

  return (
    <>
      {hideLetter.hideAll && !showLetter ? (
        <button className="button" onClick={checkUserAnswer}>
          *
        </button>
      ) : (
        <button className="button">{letter}</button>
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
  const [start, setStart] = useState({ start: false });
  const [timer, setTimer] = useState({ startTimer: true, key: 0 });
  const [timeLeft, setTimeLeft] = useState(null);
  const [hideLetter, setHideLetter] = useState({ hideAll: false });
  const [attempts, setAttempts] = useState(0);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      setHideLetter({ hideAll: true });
      setTimer({ startTimer: false, key: 0 });
    }, 5000);

    if (start) {
      setHideLetter({ hideAll: false });
      setTimer({ startTimer: true, key: timer.key + 1 });
      setMessage("");
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const startGame = () => {
    initLetters();
    setStart({ start: true, title: "Restart" });
    setTimeLeft(1);
  };

  return (
    <div className="App">
      <div>
        {start.start ? (
          <>
            {message ? (
              <Message message={message} startGame={startGame} />
            ) : null}
            <div className="flex info">
              <p>Find All The Letters &#8594; {corectLatter}</p>
              <p className="time">
                {timer.startTimer ? <Timer key={timer.key} /> : "GO"}
              </p>
              <p>Attempts {attempts}</p>
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
          <StartBord />
        )}
      </div>
      {!start.start ? (
        <button className="btn" onClick={startGame}>
          Play Game
        </button>
      ) : null}
    </div>
  );
}

export default App;
