import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";

export const CartSummary = () => {
  const { totalItems,totalPrice,shipment,totalToPay } = useContext(CartContext);


  return (
    <div className="w-1/3 h-fit  p-6 rounded-lg bg-white shadow-xl">
      <h1 className="text-lg font-bold mb-4">Resumen de la compra</h1>
      <hr />
      <div className="flex justify-between mt-4">
        <h2>
          Productos <span className="text-gray-500">({totalItems})</span>
        </h2>
        <p className="">${totalPrice}</p>
      </div>
      <div className="flex justify-between mt-4">
        <h2>
          Envio <span className="text-gray-500"></span>
        </h2>
        <p className="">${shipment}</p>
      </div>
      <div className="flex justify-between mt-4 font-semibold text-lg">
        <h1>Total</h1>
        <p>${totalToPay}</p>
      </div>
      <button className="mt-6 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition cursor-pointer">
        Continuar Compra
      </button>
    </div>
  );
};
