import { createContext, useState } from "react";

export const BranchContext = createContext({
  data: [],
  setBranches: () => {},
});

export const BranchContextProvider = ({ children }) => {
  const [state, setState] = useState([]);

  const setBranches = (data) => {
    setState(data);
  };

  const value = {
    data: state,
    setBranches,
  };

  return (
    <BranchContext.Provider value={value}>{children}</BranchContext.Provider>
  );
};
