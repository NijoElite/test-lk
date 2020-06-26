import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { getAccessToken } from '../services/auth';
import { parseJwt } from '../helpers/helpers';

export const authContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [savedUser, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = useCallback(async ({ email, password }) => {
    const user = await getAccessToken({ email, password });

    if (user.error) {
      return user;
    }

    const jwt = user.data.accessToken;
    const userData = {
      accessToken: jwt,
      payload: parseJwt(jwt),
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  useEffect(() => {
    document.addEventListener('jwt:expired', logout);
    return () => document.removeEventListener(logout);
  }, [logout]);

  const contextValue = useMemo(() => {
    return { login, logout, user: savedUser };
  }, [login, logout, savedUser]);

  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  );
};

