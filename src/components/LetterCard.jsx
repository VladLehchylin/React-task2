import { useState } from "react";

function LetterCard({ letter, hideLetter, message, setAttempts, gameInfo }) {
  const [showLetter, setShowLetter] = useState(false);

  const letterPosition = () =>
    gameInfo.lettersCopy.indexOf(gameInfo.correctLetter);

  const checkUserAnswer = () => {
    if (gameInfo.correctLetter !== letter) {
      setShowLetter(true);
      setAttempts((prev) => prev + 1);
      message("YOU LOSE");
    } else {
      setShowLetter(true);
      setAttempts((prev) => prev + 1);
      gameInfo.lettersCopy[letterPosition()] = "";

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

export default LetterCard;
