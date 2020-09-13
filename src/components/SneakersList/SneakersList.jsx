import React from 'react'
import { Sneaker } from '../Sneaker'

export const SneakersList = ({ itemArray, ...otherProps }) => {
  if (itemArray === undefined) return <div>Spinner</div>;

  if (!itemArray) return null;

  itemArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return itemArray.map((item) => <Sneaker key={item.id} item={item} {...otherProps} />);
};
