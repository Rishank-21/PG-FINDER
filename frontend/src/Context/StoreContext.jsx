
import React, { createContext, useState, useContext } from "react";

const StoreContext = createContext();


export const StoreProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  
  const toggleFavorite = (item) => {
    const exists = favorites.find(f => f.id === item.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };


  return (
    <StoreContext.Provider value={{ favorites, toggleFavorite, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);


export default StoreContext;
