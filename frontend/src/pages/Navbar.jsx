import React from "react";

export const Navbar = () => {
  return (
    <div className="flex  mx-40 gap-10  justify-center  items-center h-16 ">
      <div className="w-xs ">
        <img className="max-w-30" src="../logo_png.png" alt="" />
        
      </div>

      <div className=" w-full">
        <form className=" w-full flex text-zinc-70 pl-10">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
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
      <div className="w-lg  text-center  flex justify-around ">
        

        <i class="fa-regular fa-user"></i>
        <i className="fa-solid fa-cart-shopping text-gray-700 hover:cursor-pointer "></i>

        
      </div>
    </div>
  );
};
