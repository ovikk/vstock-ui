import React, { useState, useEffect } from 'react';

const Stats = () => {
    
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://randomuser.me/api/?page=3&results=10&seed=abc'
      );
      const data = await response.json();
      setPersons(data.results);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      HUY
      {persons.map((o) => (
        <div style={{color: 'white'}}>{o.cell}</div>
      ))}
    </div>
  );
};

export default Stats;
