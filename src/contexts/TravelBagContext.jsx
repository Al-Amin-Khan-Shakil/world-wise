import {
  createContext, useContext, useEffect, useState,
} from 'react';

const TravelBagContext = createContext();

function TravelBagProvider({ children }) {
  const savedItems = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [];

  const [items, setItems] = useState(savedItems);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItems = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
  };

  const handleToggleItems = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }

      return item;
    });

    setItems(updatedItems);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?',
    );

    if (confirmed) setItems([]);
  };

  return (
    <TravelBagContext.Provider
      value={{
        items,
        handleAddItems,
        handleToggleItems,
        handleDeleteItem,
        handleClearList,
      }}
    >
      {children}
    </TravelBagContext.Provider>
  );
}

function useTravelBag() {
  const context = useContext(TravelBagContext);

  if (context === undefined) { throw new Error('Travel bag context used outside the travel bag context'); }

  return context;
}

export { TravelBagProvider, useTravelBag };
