import { createContext, useState } from "react";

export const CarContext = createContext();

export function CarProvider({ children }) {
  const [car, setCar] = useState([]);
  //Agregar productos al carro

  const addToCart = (product) => {
    setCar((prev) => {
      // find me ayuda a encontrar el elemento que coincida, si ya existe le aumenta +1 a la cantidad
      const itemFound = prev.find((item) => item._id === product._id);
      if (itemFound) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log("agregado");
      // sino existe agrega el producto con una cantidad de 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decrementProduct = (product) => {
    setCar((prev) => {
      return prev.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      );
    });
  };

  const incrementProduct = (product) => {
    setCar((prev) => {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const cleanProduct = (id) => {
    setCar((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CarContext.Provider
      value={{
        addToCart,
        decrementProduct,
        car,
        incrementProduct,
        cleanProduct,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
