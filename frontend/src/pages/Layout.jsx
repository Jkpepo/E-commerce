import {Outlet} from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {

  return (
    // padre
    <div className="bg-gray-600  min-h-screen flex flex-col  "> 

        {/* Navabar */}
        <div className="bg-amber-200 p-4 shadow  ">
            <Navbar/>
        </div>
        {/* main */}
        <div className="flex-1 container mx-auto p-4">
           main

            <Outlet/>
        </div>

        {/* footer */}
        <div className="h-40 bg-amber-400 ">
            <div className="ml-20">
            footer

            </div>
        </div>

    </div>
  )
}
