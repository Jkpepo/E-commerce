import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { email, password } = formLogin;

  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Completa todos los campos");
      return;
    }

    setLoading(true);
    toast.dismiss();

    try {
      const loginValid = await login(email, password);

      if (loginValid?.user) {
        toast.success(
          `Bienvenid@ ${loginValid.user?.name || "usuario"}`
        );
        navigate("/");
      } else {
        toast.error(
          loginValid?.error || "Error al iniciar sesión"
        );
      }
    } catch (error) {
      toast.error("Error inesperado en el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[380px] h-[400px] p-8 rounded-3xl bg-[#1e293b]/70 border border-[#334155] shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#f8fafc] transition-all duration-300 hover:shadow-cyan-400/40"
      >
        <h1 className="text-3xl mb-4 font-bold uppercase text-[#00ffff] tracking-[4px] drop-shadow-[0_0_10px_#00ffff]">
          Login
        </h1>

      
        <div className="flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300">
          <i className="fa-solid fa-envelope text-[#00ffff]"></i>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            autoComplete="off"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

     
        <div className="flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300">
          <i className="fa-solid fa-lock text-[#00ffff]"></i>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className={`w-60 mt-6 py-2 rounded-xl font-semibold tracking-wide shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-300
            ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:scale-[1.02] cursor-pointer"
            }
          `}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        <h2 className="mt-4 text-sm text-gray-400">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Regístrate
          </Link>
        </h2>
      </form>
    </div>
  );
};