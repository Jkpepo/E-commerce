
export const CartModal = ({ recentProduct, onClose,formatPrice}) => {
   
      if (!recentProduct) return null;
  return (
  <div className="fixed   inset-0 bg-black/80 flex justify-end z-50 ">
      <div className="bg-[#1e293b] p-6 m-8 rounded-xl shadow-2xl border border-cyan-400/40 w-[70%] max-w-sm h-[250px] text-white ">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          Producto agregado al carrito
        </h2>

        <div className="flex gap-4">
          <img
            src={recentProduct.image}
            alt={recentProduct.name}
            className="w-20 h-20 object-contain rounded-md"
          />
          <div>
            <p className="font-semibold">{recentProduct.name}</p>
            <p className="font-semibold">{recentProduct.category}</p>
      
            <p className="text-gray-400 text-sm"> {formatPrice(recentProduct.price)}
              
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold tracking-wide shadow-[0_0_10px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
