import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";
import { CardOfCart } from "./CardOfCart";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  const { car } = useContext(CartContext);

  return (
    <div className="min-h-screen py-10 bg-[#0f172a] text-[#f8fafc]">
      <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row gap-10 p-6">
        <div className="w-full md:w-2/3 shadow-2xl rounded-2xl p-6 bg-[#1e293b] border border-[#334155] backdrop-blur-md transition-all duration-300 hover:shadow-blue-500/30">
          <h1 className="text-2xl font-bold mb-6 text-[#22d3ee] tracking-wide">Tus productos</h1>
          <div className="flex flex-col gap-4 ">
            {/* Productos del carro */}
            {car && car.length > 0 ? (
              car.map((product) => (
                <CardOfCart key={product._id} product={product} />
              ))
            ) : (
              <h1 className="text-gray-400 text-center italic">no tienes productos aun en tu carrito</h1>
            )}
          </div>
        </div>

        {/* Resumen de compra */}
        <CartSummary />
      </div>
    </div>
  );
};
