import { ProductsContext } from "../context/UseProductsContext";
import { Link, useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import { useContext } from "react";
export const Navbar = () => {
  const { search, setSearch, setQuery } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      // Si no escribió nada, redirige al home
      navigate("/");
    } else {
      // Si hay búsqueda, guarda y manda a listproducts lo envia cuando hago click o enter en el formulario y lo envia a listproducts
      //lo recibo desde el context como query y ya me trae el valor del search
      setQuery(search);
      navigate("/listproducts");
    }
  };
  return (
    <div className="flex  mx-40 gap-10  justify-center  items-center h-16 ">
      <div className="w-xs ">
        <Link to={"/"}>
          <img className="max-w-30" src="../logo_png.png" alt="logotipo " />
        </Link>
      </div>

      <div className=" w-full">
        <form
          onSubmit={handleSubmit}
          className=" w-full flex text-zinc-70 pl-10 "
        >
          <input
            type="text"
            value={search}
            placeholder="Buscar productos, marcas y más..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-1.5 bg-gray-900 focus:outline-none border-r-1 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#00ffff] transition-all duration-300 hover:shadow-cyan-400/40"
          />
          <button
            type="submit"
            className=" h-9 pl-4 pr-4 bg-gray-900 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#00ffff] transition-all duration-300 hover:shadow-cyan-400/40 hover:cursor-pointer"
          >
            <i className="fa fa-search  text-[#00ffff] "></i>
          </button>
        </form>
      </div>
      <Filters />

      <div className="w-lg  text-center  flex justify-around ">
        <Link to={"/profile"}>
          <i className="fa-regular fa-user shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#00ffff] transition-all duration-300 hover:shadow-cyan-400/80"></i>
        </Link>
        <Link to={"/car"}>
          <i className="fa-solid fa-cart-shopping  shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#00ffff] transition-all duration-300 hover:shadow-cyan-400/80"></i>
        </Link>
      </div>
    </div>
  );
};
