import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Navigate } from "react-router-dom";

export const Register = () => {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/profile" replace />;
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { name, email, password, role } = FormData;

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(name, email, password, role);
    if (success) {
      console.log("Registro Correcto");
      navigate("/");
    } else {
      console.error("Error al registrar");
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[400px] p-8 rounded-3xl   bg-[#1e293b]/70 border border-[#334155] shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#f8fafc] transition-all duration-300 hover:shadow-cyan-400/40"
      >
        <h1 className="text-3xl font-bold uppercase text-[#00ffff] tracking-[4px] drop-shadow-[0_0_10px_#00ffff]">
          Registro
        </h1>

        {/* Nombre */}
        <div className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300">
          <i className="fa-solid fa-user text-[#00ffff]"></i>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Nombre"
            autoComplete="off"
            required
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

        {/* Email */}
        <div className="flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300">
          <i className="fa-solid fa-envelope text-[#00ffff]"></i>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            autoComplete="off"
            required
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

        {/* Password */}
        <div className="flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300">
          <i className="fa-solid fa-lock text-[#00ffff]"></i>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

        {/* Rol */}
        <div className="flex justify-between items-center w-full text-[#00ffff] mt-3">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#05acb8] transition-all">
            <input
              type="radio"
              name="role"
              value="comprador"
              checked={role === "comprador"}
              onChange={handleChange}
              required
              className="accent-[#2bdce2]"
            />
            Comprador
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-[#05acb8] transition-all">
            <input
              type="radio"
              name="role"
              value="vendedor"
              checked={role === "vendedor"}
              onChange={handleChange}
              required
              className="accent-[#2bdce2]"
            />
            Vendedor
          </label>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-60 mt-6 py-2  bg-gradient-to-r from-cyan-500 to-blue-600 text-white  rounded-xl font-semibold tracking-wide shadow-[0_0_10px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
