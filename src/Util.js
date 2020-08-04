import { useState, useEffect } from 'react';

export function useKeyPress(plusKey, minusKey) {
  // State for keeping track of whether key is pressed
  const [index, setIndex] = useState(0);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === plusKey) {
      setIndex((i) => i + 1);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === minusKey) {
      setIndex((i) => i - 1);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return index;
}
