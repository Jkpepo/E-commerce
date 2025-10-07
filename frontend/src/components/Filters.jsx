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
      <div className="flex ">
        <select
          value={category}
          onChange={handleChange}
          className=" rounded focus:outline-none focus:ring-0"
        >
          {/* uso hidden para que no se vea categorias como una opcion seleccionable */}
          <option value="" hidden>
            Categorias
          </option>

          <option value="todos">todos</option>
          <option value="ropa"> Ropa</option>
          <option value="electrodomesticos">electrodomesticos</option>
          <option value="electronica">electronica</option>
          <option value="mascotas">Mascotas</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
