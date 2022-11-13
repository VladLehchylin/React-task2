import { useState, useEffect } from "react";

function Timer() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return <span>Time: {counter}</span>;
}

export default Timer;
