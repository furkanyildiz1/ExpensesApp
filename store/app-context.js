import { createContext, useState } from 'react';

export const AppContext = createContext({
  isBusinessMode: false,
  toggleBusinessMode: () => {},
  categories: [],
  addCategory: (category) => {},
  stocks: {},
  setStock: (category, quantity) => {},
});

function AppContextProvider({ children }) {
  const [isBusinessMode, setIsBusinessMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState({});

  function toggleBusinessMode() {
    setIsBusinessMode((prevMode) => !prevMode);
  }

  function addCategory(category) {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
      setStocks((prev) => ({ ...prev, [category]: '' }));
    }
  }

  function setStock(category, quantity) {
    setStocks((prev) => ({ ...prev, [category]: quantity }));
  }

  const value = {
    isBusinessMode,
    toggleBusinessMode,
    categories,
    addCategory,
    stocks,
    setStock,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
