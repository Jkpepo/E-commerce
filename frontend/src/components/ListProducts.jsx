import { useContext } from "react";
import { ProductsContext } from "../context/UseProductsContext";

import { ProductCard } from "./ProductCard";



function ListProducts() {
  const { products,query } = useContext(ProductsContext);
  

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
          <ProductCard key={product._id} product={product}/>
          ))}
          
        </div>
      ) : (
        <div className="text-center"> No hay productos </div>
      )}
    </div>
  );
}

export default ListProducts;
