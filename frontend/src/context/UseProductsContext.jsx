import { createContext, useState, useEffect,useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { token } =useContext(AuthContext)

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  // este estado basicamente lo que me maneja es "una busqueda local " ya que si lo hago directamente cada que digite una
  // tecla el estado de search va a cambiar
  // y este me almacena lo que digite y me ayuda para controlar la busqueda
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const BASE_URL = "http://localhost:5000/api/products/";

  const fetchProducts = async () => {
    try {
      const result = await fetch(BASE_URL);
      const data = await result.json();
      setProducts(data);
    } catch (error) {
      console.error(`Error al obtener datos ${error}`);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (
    name,
    price,
    stock,
    quantity,
    category,
    description,
    image
  ) => {
    try {
      const result = await fetch("http://localhost:5000/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //para poder obtener el token y crear el producto
        },
        body: JSON.stringify({
          name,
          price,
          stock,
          quantity,
          category,
          description,
          image,
        }),
      });
      const data = await result.json();
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        search,
        setSearch,
        category,
        setCategory,
        query,
        setQuery,
        createProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
