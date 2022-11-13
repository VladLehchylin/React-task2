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

export default AllLetters;
