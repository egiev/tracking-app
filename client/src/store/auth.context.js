import { createContext, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  authenticate: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(initialState);

  const authenticate = (data) => {
    setUser(data);

    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
