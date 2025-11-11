import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("No hay usuario, redirigiendo al login...");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400 bg-[#0e0e10]">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-white gap-5">
      <div className=" border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.1)] rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2 tracking-wide">
          Perfil de Usuario
        </h1>
        <p className="text-gray-400 mb-8">Información de tu cuenta</p>

        <div className="text-left space-y-3">
          <p>
            <span className="font-semibold text-cyan-300">Nombre:</span>{" "}
            <span className="text-gray-300">{user.name}</span>
          </p>
          <p>
            <span className="font-semibold text-cyan-300">Email:</span>{" "}
            <span className="text-gray-300">{user.email}</span>
          </p>
          <p>
            <span className="font-semibold text-cyan-300">Rol:</span>{" "}
            <span className="capitalize text-gray-300">{user.role}</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-4 w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
      

      
      {user?.role === "vendedor"&&(
       <div className=" border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.1)] rounded-2xl p-10   w-full max-w-md text-center">
      <h1 className="text-xl font-bold text-cyan-400 mb-2 tracking-wide">Acciones</h1>
      <Link to="/createproduct">
    <button  className="mt-4 w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer"
      >
      Agregar producto
    </button>
  </Link>
      </div>)}
    </div>
  );
};
