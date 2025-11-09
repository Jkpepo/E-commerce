
export const CartModal = ({ recentProduct, onClose,formatPrice}) => {
   
      if (!recentProduct) return null;
  return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50">
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-2xl border border-cyan-400/40 w-[90%] max-w-md text-white">
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
          className="mt-6 w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
