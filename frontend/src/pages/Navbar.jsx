import React from 'react'

export const Navbar = () => {
  return (
    <div className='flex  mx-40 gap-10 '>
        <div className='w-xs bg-amber-400'>

            Logo
        </div>

        <div className='bg-green-500 w-full'>
             <form className=" w-full flex text-zinc-70 pl-10">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            className="w-full  bg-white  focus:outline-none border-r-1 border-zinc-300"
            />
          <button
            type="submit"
            className=" h-9 pl-4 pr-4  bg-white hover:cursor-pointer text-white"
            >
            <i className="fa fa-search  text-gray-400 "></i>
          </button>
        </form>
        </div>

<div className='w-lg bg-amber-700 text-center'>
    carrito

</div>


    </div>
  )
}
