import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";

export const CardOfCart = ({ product }) => {
  const { decrementProduct, incrementProduct, cleanProduct, formatPrice } =
    useContext(CartContext);

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gray-900/70 border border-indigo-500/20 grid md:grid-cols-[100px_1fr_150px_100px] grid-cols-2 md:items-center gap-4 w-full max-w-3xl mx-auto text-gray-100 backdrop-blur-md">

      {/* Imagen */}
      <div className="flex justify-center">
        <img
          className="w-[80px] h-[80px] object-contain drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]"
          src={product.productId.image}
          alt={product.productId.name}
        />
      </div>

      {/* Nombre */}
      <h2 className="font-semibold truncate text-center text-indigo-300 tracking-wide">
        {product.productId.name}
      </h2>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2">
        {product.quantity <= 1 ? (
          <button
            className="bg-red-500/80 hover:bg-red-600 text-white rounded-full px-3 py-1 shadow-[0_0_10px_rgba(239,68,68,0.6)] transition-all hover:cursor-pointer"
            onClick={() => cleanProduct(product)}
          >
            X
          </button>
        ) : (
          <button
            className="bg-cyan-500/80 hover:bg-cyan-700 text-white rounded-full px-3 py-1 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all"
            onClick={() => decrementProduct(product)}
          >
            -
          </button>
        )}

        <span className="w-full rounded-4xl text-center font-semibold text-indigo-400 bg-amber-50">
          {product.quantity}
        </span>

        <button
          className="bg-cyan-500/80 hover:bg-cyan-700 text-white rounded-full px-3 py-1 shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all"
          onClick={() => incrementProduct(product)}
        >
          +
        </button>
      </div>

      {/* Precio */}
      <p className="text-right font-semibold text-indigo-400">
        {/* {formatPrice(product.productId.precio)} */}
      </p>
    </div>
  );
};
