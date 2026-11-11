"use client";
import { useEffect, useState } from "react";

interface CounterProps {
  label: string;
}

const Counter = ({ label }: CounterProps) => {
  const [count, setCount] = useState(() => {
    console.log(`init counter <${label}>`);
    return 0;
  });

  const onIncrement = () => {
    setCount(c => {
      return c + 1
    });
  };

  useEffect(() => {
    console.log(`setup counter <${label}>`);

    return () => {
      console.log(`cleanup counter <${label}>`);
    };
  // we do not include label to dependency array because it is not going to change, and because we want to see logs only on first mount and unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(`render counter <${label}> <${count}>`)

  return (
    <div>
      <label>{label}</label>
      <p>
        Counter: <span>{count}</span>
      </p>
      <button onClick={onIncrement}>+1</button>
    </div>
  );
};

export default Counter;
