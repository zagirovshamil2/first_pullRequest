import { useState } from "react";

export const Counter = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter((prev) => prev + 1)
    };

    const decrement = () => {
        setCounter((prev) => prev - 1);
    }


  return (
    <div>
        {counter}
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
  )
}
