import { useState } from "react";

function LetterCard({ letter, hideLetter, message, setAttempts }) {
  const [showLetter, setShowLetter] = useState(false);

  const letterPosition = () => lettersCopy.indexOf(correctLetter);

  const checkUserAnswer = () => {
    if (correctLetter !== letter) {
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

export default LetterCard;
