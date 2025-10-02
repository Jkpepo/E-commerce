import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    // padre
    <div className="bg-gray-200  min-h-screen flex flex-col  ">
      {/* Navabar */}
      <div className=" shadow-xl/7  ">
        <Navbar />
      </div>
      {/* main */}
      <div className="flex-1 container mx-auto p-4 ">
        <Outlet />
      </div>

      {/* footer */}
      <div className="h-40 bg-gray-300 ">
        <div className="ml-20">footer</div>
      </div>
    </div>
  );
};
