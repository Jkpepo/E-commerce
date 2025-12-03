import { useContext } from "react";
import { CartContext } from "../context/UseCartContext";
import { useNavigate } from "react-router-dom";



export const ProductCard = ({product}) => {
    const {addToCart,formatPrice}= useContext(CartContext)
   
    const navigate= useNavigate()
   
  return (
    <div className="mt-10 flex justify-center">
      
      <div className="w-[300px] min-h-[360px] p-4 rounded-2xl bg-[#1e293b]/80 border border-cyan-400/30 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md text-[#e2e8f0] transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:-translate-y-1">
        {/* Imagen */}
        <div className="flex justify-center mb-4" onClick={() => navigate(`/product/${product._id}`)}>
          <img
            className="w-full h-56 object-contain rounded-md"
            src={product.image}
            alt={product.name}
          />
        </div>
        <h2 className=" text-lg font-semibold mb-1 text-cyan-400 truncate ">{product.name}</h2>

        {/* Info */}
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="flex justify-between text-sm text-gray-400 mb-2">
          Categoría: {product.category}
        </p>
        {/* <p className="font-bold text-lg text-white mb-1">{formatPrice(product.price)}</p> */}
        <p className="text-sm">Stock: {product.stock}</p>
        <h3 className="text-emerald-400 text-sm font-medium">Envio gratis</h3>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer"
        >
          Agregar al Carrito
        </button>
  
      </div>
    </div>
  );
};
