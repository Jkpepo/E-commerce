import { useContext } from "react";

import React from 'react'
import { ProductsContext } from "../context/UseContext";


function ListProducts() {

    const {products}=useContext(ProductsContext);

  return (
  <div>
  <h1 className="text-3xl text-center">ListProducts</h1>

  {/* contenedor padre */}
  <div className="flex flex-wrap justify-center gap-4">
    {products.map((product) => (
      <div
        key={product._id}
        className="border-2 border-amber-700 w-[300px] h-[300px] p-3"
      >
        <h2 className="font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.category}</p>
        <p>{product.price}</p>
        <p>{product.stock}</p>
      </div>
    ))}
  </div>
</div>



  )
}

export default ListProducts
