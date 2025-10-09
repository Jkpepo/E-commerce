import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";

export const CardOfCart = ({ product }) => {
  const { decrementProduct, incrementProduct, cleanProduct,formatPrice} =
    useContext(CartContext);

  return (
    <div className="p-3 rounded-md shadow-xl bg-gray-200 grid md:grid-cols-[100px_1fr_120px_100px] grid-cols-2 md:items-center gap-4 w-full max-w-3xl mx-auto">
      {/* Imagen */}
      <div className="flex justify-center">
        <img
          className="w-[80px] h-[80px] object-contain"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Nombre */}
      <h2 className="font-semibold truncate text-center">{product.name}</h2>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2">
        {product.quantity <= 1 ? (
          <button
            className="bg-red-500 text-white rounded-full px-2 py-1"
            onClick={() => cleanProduct(product._id)}
          >
            🗑️
          </button>
        ) : (
          <button
            className="bg-gray-400 rounded-full px-2 py-1"
            onClick={() => decrementProduct(product)}
          >
            -
          </button>
        )}

        <span className="w-6 text-center font-semibold">
          {product.quantity}
        </span>

        <button
          className="bg-gray-400 rounded-full px-2 py-1"
          onClick={() => incrementProduct(product)}
        >
          +
        </button>
      </div>

      {/* Precio */}
      <p className="text-right font-medium">
        {formatPrice(product.price)}
      </p>
    </div>
  );
};
