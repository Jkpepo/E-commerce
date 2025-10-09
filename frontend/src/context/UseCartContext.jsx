import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [car, setCar] = useState([]);
  console.log("carrito" + car.length);

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

      // sino existe agrega el producto con una cantidad de 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  // disminuir producto en el carrito
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
  // incrementar producto en el carrito
  const incrementProduct = (product) => {
    setCar((prev) => {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  //eliminar producto carrito
  const cleanProduct = (id) => {
    setCar((prev) => prev.filter((item) => item._id !== id));
  };

  // total items para que cada vez que agregue item me sume en el carrito y tambien si el producto lo pongo 2 o 3 veces
  const totalItems = car.reduce((acc, item) => acc + item.quantity, 0);

  // precio total * cantidad de producto
  const totalPrice = car.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // si el carrito esta vacio no cobra envio
  const shipment = car.length === 0 ? 0 : totalPrice < 200 ? 1000 : 0;

  // total + envio
  const totalToPay = totalPrice + shipment;
  // formateo para los valores de precio se vean mejor con sus puntos o comas en moneda Colombiana

  const formatPrice = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <CartContext.Provider
      value={{
        addToCart,
        decrementProduct,
        car,
        incrementProduct,
        cleanProduct,
        totalItems,
        totalPrice,
        shipment,
        totalToPay,
        formatPrice
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
