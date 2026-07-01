import { createContext, useState, useEffect } from 'react';
import { fetchBusinessData, updateBusinessData } from '../util/http';

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

  useEffect(() => {
    async function loadBusinessData() {
      try {
        const data = await fetchBusinessData();
        if (data) {
          setCategories(data.categories || []);
          setStocks(data.stocks || {});
        }
      } catch (error) {
        console.log('Error loading business data from Firebase:', error);
      }
    }
    loadBusinessData();
  }, []);

  function toggleBusinessMode() {
    setIsBusinessMode((prevMode) => !prevMode);
  }

  async function addCategory(category) {
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      const updatedStocks = { ...stocks, [category]: 0 };

      setCategories(updatedCategories);
      setStocks(updatedStocks);

      try {
        await updateBusinessData({
          categories: updatedCategories,
          stocks: updatedStocks,
        });
      } catch (error) {
        console.log('Error saving new category to Firebase:', error);
      }
    }
  }

  async function setStock(category, quantity) {
    const updatedStocks = { ...stocks, [category]: quantity };
    setStocks(updatedStocks);

    try {
      await updateBusinessData({
        categories: categories,
        stocks: updatedStocks,
      });
    } catch (error) {
      console.log('Error saving stock update to Firebase:', error);
    }
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
