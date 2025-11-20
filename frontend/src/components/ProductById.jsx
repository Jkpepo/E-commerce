import { useContext, useEffect } from "react";
import { ProductsContext } from "../context/UseProductsContext";
import { useParams } from "react-router-dom";

export const ProductById = () => {
  const { id } = useParams();
  const { getProductById, product, error } = useContext(ProductsContext);

  useEffect(() => {
    getProductById(id);
  }, [id]);

  if (!product ) return <p>Cargando...</p>;

  if (error) return <h1> Producto no encontrado</h1>;

  return (
    <div>
      <h1>Detalles del producto</h1>
      <h2>{product.name}</h2>
      <img src={product.image} width={200} />
      <p>{product.description}</p>
      <p>Precio: {product.price}</p>
    </div>
  );
};
