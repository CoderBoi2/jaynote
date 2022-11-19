import { useState } from "react";
const useToggle = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const toggle = () => {
    setState((prevState) => !prevState);
  };

  return [state, toggle];
};

export { useToggle };
