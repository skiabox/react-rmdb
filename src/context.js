import React, { useState, createContext } from 'react';

export const Context = createContext();

//create the provider
//it will wrap our application and make sure we provide the context value to all of our components
const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default UserProvider;
