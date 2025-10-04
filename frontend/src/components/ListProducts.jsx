import { useContext } from "react";
import { ProductsContext } from "../context/UseProductsContext";
import { CarContext } from "../context/UseCarContext";



function ListProducts() {
  const { products,query } = useContext(ProductsContext);
  const {addToCart } = useContext(CarContext);
 

const filteredProducts = query.trim() === "" || query.toLowerCase() === "todos"
  ? products
  : products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

     

  return (
    <div>
   

      {/* contenedor padre */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border-2 border-amber-700 w-[300px] min-h-[320px] p-4 rounded-md shadow-md bg-white m-2"
            >

              {/* Imagen */}
              <div className="flex justify-center mb-3">
                <img
                  className="w-full h-60 object-contain border-b-1"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <h2 className=" text-lg mb-2 ">{product.name}</h2>

              {/* Info */}
              <p className="text-gray-500 mb-2 overflow-hidden  max-h-12">{product.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Categoría: {product.category}
              </p>
              <p className="font-bold mb-2">$ {product.price}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <h3 className="text-green-600 font-semibold">Envio gratis</h3>
              <button onClick={()=>addToCart(product)} className="hover:cursor-pointer border-2 rounded-lg p-2 w-full mt-4">Agregar al Carrito</button>
            </div>
          ))}
          
        </div>
      ) : (
        <div className="text-center"> No hay productos </div>
      )}
    </div>
  );
}

export default ListProducts;
