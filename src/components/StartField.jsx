function StartField() {
  const startField = ["L", "E", "T", "'", "S", " ", "P", "L", "E", "Y"];

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

export default StartField;
