import { useState, useEffect } from "react";

import AllLetters from "./components/AllLetters";
import Attempts from "./components/Attempts";
import ControlButtons from "./components/ControlButtons";
import CorrectLetter from "./components/CorrectLetter";
import LetterCard from "./components/LetterCard";
import Message from "./components/Message";
import StartField from "./components/StartField";
import Timer from "./components/Timer";

import init from "./utils";

import "./App.css";

function App() {
  const [gameInfo, setGameInfo] = useState({
    letters: [],
    lettersCopy: [],
    correctLetter: "",
  });

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

  const startGame = () => {
    setGameInfo(init);
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
              <CorrectLetter correctLetter={gameInfo.correctLetter} />
              <Attempts attempts={attempts} />
              {timer ? <Timer /> : <span>"GO"</span>}
            </div>
            <div className="game-field">
              {message ? (
                <AllLetters letters={gameInfo.letters} />
              ) : (
                gameInfo.letters.map((item, index) => (
                  <LetterCard
                    key={index}
                    letter={item}
                    hideLetter={hideLetter}
                    message={setMessage}
                    setAttempts={setAttempts}
                    gameInfo={gameInfo}
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
