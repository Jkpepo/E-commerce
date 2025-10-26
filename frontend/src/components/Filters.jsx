import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../context/UseProductsContext";

function Filters() {
  const {category,setQuery,setCategory } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
     setCategory(value)
   
    
    if (value === "todos") {
      setCategory("")
      setQuery(""); 
      navigate("/listproducts");
      
    } else {
      navigate(`/categoria/${value}`); 
      setCategory("")
    }
  };

  return (
    <div>
      <div className="flex relative  ">
        <select
          value={category}
          onChange={handleChange}
          className=" 
            bg-gray-900 text-cyan-300  rounded-lg
            px-4 py-2 pr-8 appearance-none focus:outline-none
            focus:ring-0 focus:ring-cyan-400 
            shadow-[0_0_10px_rgba(0,255,255,0.4)]
            transition-all duration-300 cursor-pointer
          "
        >
          {/* uso hidden para que no se vea categorias como una opcion seleccionable */}
          <option value="" hidden>
            Categorias
          </option>

          <option value="todos">Todos</option>
          <option value="ropa">Ropa</option>
          <option value="electrodomesticos">Electrodomésticos</option>
          <option value="electronica">Electrónica</option>
          <option value="mascotas">Mascotas</option>
        </select>
         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400">
          ▼
        </div>
      </div>
    </div>
  );
}

export default Filters;
