import { useState, useEffect } from 'react';

export const currencies = ['RUB', 'USD'];
export const currencySymbols = {
  RUB: '₽',
  USD: '$',
};
export const isItemPublicSelections = ['Виден всем', 'Виден только себе'];
export const sizes = [
  'US 3',
  'US 3.5',
  'US 4',
  'US 4.5',
  'US 5',
  'US 5.5',
  'US 6',
  'US 6.5',
  'US 7',
  'US 7.5',
  'US 8',
  'US 8.5',
  'US 9',
  'US 9.5',
  'US 10',
  'US 10.5',
  'US 11',
  'US 11.5',
  'US 12',
  'US 12.5',
  'US 13',
  'US 13.5',
  'US 14',
  'US 14.5',
  'US 15',
  'US 15.5',
  'US 16',
];

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
