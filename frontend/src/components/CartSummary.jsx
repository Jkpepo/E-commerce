import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";

export const CartSummary = () => {
  const { totalItems,totalPrice,shipment,totalToPay,formatPrice } = useContext(CartContext);


  return (
    <div className="w-1/3 h-fit  p-6 rounded-lg bg-[#1e293b]/70 border border-[#334155] shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#f8fafc] transition-all duration-300 hover:shadow-cyan-400/40">
      <h1 className="text-lg  font-bold mb-6 text-[#22d3ee] tracking-wide">Resumen de la compra</h1>
      <hr className="border-[#334155]" />
      {/* <div className="flex justify-between  mt-6 text-sm sm:text-base">
        <h2>
          Productos <span className="text-gray-500">({totalItems})</span>
        </h2>
        <p className="">{formatPrice(totalPrice)}</p>
      </div>
      <div className="flex justify-between mt-4 text-sm sm:text-base">
        <h2>
          Envio <span className="text-gray-500"></span>
        </h2>
        <p className="">{formatPrice(shipment)}</p>
      </div>
      <div className="flex justify-between mt-4 font-semibold text-lg">
        <h1>Total</h1>
        <p>{formatPrice(totalToPay)}</p>
      </div> */}
      <button className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold tracking-wide shadow-[0_0_10px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        Continuar Compra
      </button>
    </div>
  );
};
