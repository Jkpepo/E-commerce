import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";

export const CardOfCart = ({ product }) => {
  const { decrementProduct, incrementProduct, cleanProduct } =
    useContext(CartContext);

  return (
    <div className=" p-3 rounded-md shadow-xl bg-gray-200 flex justify-between items-center ">
      <img
        className="max-w-[100px] max-h-[100px]"
        src={product.image}
        alt={product.name}
        width={100}
        height={100}
      />
      <h2 className="font-semibold">{product.name}</h2>

      <div className="flex items-center gap-2">
        {product.quantity <= 1 ? (
          <button onClick={() => cleanProduct(product._id)}>🗑️</button>
        ) : (
          <button onClick={() => decrementProduct(product)}>-</button>
        )}

        <span>{product.quantity}</span>

        <button onClick={() => incrementProduct(product)}>+</button>
      </div>

      <p>{product.price}</p>
    </div>
  );
};
