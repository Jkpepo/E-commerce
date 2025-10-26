import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    // padre
    <div className=" min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 ">
      {/* Navabar */}
      <header className="backdrop-blur-md bg-gray-800 border-b border-white/10 shadow-lg sticky top-0 z-50">
        <Navbar />
      </header>
      {/* main */}
      <main className=" flex-1 p-6 sm:p-10">
        <Outlet />
      </main >

      {/* footer */}
       <footer className="h-32 bg-white/10 border-t border-white/10 flex items-center justify-center text-sm text-gray-400">
        <p>© 2025 TechStore — Todos los derechos reservados</p>
      </footer>
    </div>
  );
};
