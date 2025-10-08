import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";
import { CardOfCart } from "./CardOfCart";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  const { car } = useContext(CartContext);

  return (
    <div className=" min-h-screen py-10">
      <div className="max-w-6xl mx-auto h-full flex gap-10 p-6">
        <div className="w-2/3 h-full shadow-2xl rounded-lg p-4 bg-white">
          <h1 className="text-xl font-bold mb-4">Tus productos</h1>
          <div className="flex flex-col gap-4">
            {/* Productos del carro */}
            {car && car.length > 0 ? (
              car.map((product) => (
                <CardOfCart key={product._id} product={product} />
              ))
            ) : (
              <h1>no hay productos</h1>
            )}
          </div>
        </div>

        {/* Resumen de compra */}
        <CartSummary />
      </div>
    </div>
  );
};
