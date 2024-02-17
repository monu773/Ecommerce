import { useContext, createContext, useState, useEffect } from "react";


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, saveUser, isLoggedIn, logout } = useProviderUser();
  return (
    <UserContext.Provider value={{ user, saveUser, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useProviderUser = () => {

  const [user, setUser] = useState(null);

  const saveUser = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const isLoggedIn = !!(user);

  const logout = () => {
    setUser(null);
    // const localTheme = localStorage.getItem("app-theme");
    window.localStorage.clear();
    window.sessionStorage.clear();
  };

  useEffect(() => {
    try {
      const localUser = JSON.parse(window.localStorage.getItem("user") || "{}");
      if (localUser) {
        setUser(localUser);
      }
    } catch (err) {
        logout();
    }
  }, []);

  return {
    user,
    saveUser,
    isLoggedIn,
    logout,
  };
};

export const useUser = () => {
  return useContext(UserContext);
};
