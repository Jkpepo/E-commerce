import { useContext } from "react";
import { ProductsContext } from "../context/UseContext";
import Filters from "../components/Filters";

export const Navbar = () => {
  const {search,setSearch} = useContext(ProductsContext);
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <div className="flex  mx-40 gap-10  justify-center  items-center h-16 ">
      <div className="w-xs ">
        <img className="max-w-30" src="../logo_png.png" alt="" />
        
      </div>

      <div className=" w-full">
        <form onSubmit={handleSubmit} className=" w-full flex text-zinc-70 pl-10">
          <input
            type="text"
            value={search}
            placeholder="Buscar productos, marcas y más..."
            onChange={(e)=> setSearch(e.target.value)}
            className="w-full  bg-white  focus:outline-none border-r-1 border-zinc-300 pl-4"
          />
          <button
            type="submit"
            className=" h-9 pl-4 pr-4  bg-white hover:cursor-pointer text-white"
          >
            
            <i className="fa fa-search  text-gray-400 "></i>
          </button>
        </form>
      </div>
        <Filters/>
      <div className="w-lg  text-center  flex justify-around ">
        

        <i className="fa-regular fa-user"></i>
        <i className="fa-solid fa-cart-shopping text-gray-700 hover:cursor-pointer "></i>

        
      </div>
    </div>
  );
};
