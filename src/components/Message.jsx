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

export default Message;
