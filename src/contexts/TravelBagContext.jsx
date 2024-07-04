import { createContext, useContext } from "react";

const TravelBagContext = createContext();

function TravelBagProvider({ children }) {
  const handleAddItems = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
  };

  return (
    <TravelBagContext.Provider value={{ handleAddItems }}>
      {children}
    </TravelBagContext.Provider>
  );
}

function useTravelBag() {
  const context = useContext(TravelBagContext);

  if (context === undefined)
    throw new Error("Travel bag context used outside the travel bag context");

  return context;
}

export { TravelBagProvider, useTravelBag };
