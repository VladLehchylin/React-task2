function ControlButtons({ start, exitGame, startGame }) {
  return (
    <>
      {start ? (
        <button className="btn" onClick={exitGame}>
          Exit
        </button>
      ) : (
        <button className="btn" onClick={startGame}>
          Start
        </button>
      )}
    </>
  );
}

export default ControlButtons;
