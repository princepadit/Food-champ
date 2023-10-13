// CounterProvider.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const CounterContext = createContext();

// Create the provider component
const CounterProvider = ({ children }) => {
  const [resId, setresId] = useState();
  const [items,setItems] = useState([]);

  const setresumeid = (res) => {
    setresId(res);
  };

  const setitemsvalue = (res) => {
    setItems(res);
  };

  return (
    <CounterContext.Provider value={{ resId, items, setresumeid,setitemsvalue }}>
      {children}
    </CounterContext.Provider>
  );
};

export { CounterProvider, CounterContext };
