import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    if (!email.trim()) {
      toast.error("El correo es obligatorio");
      return;
    }

    if (!email.includes("@")) {
      toast.error("El correo no es válido");
      return;
    }

    if (!password.trim()) {
      toast.error("La contraseña es obligatoria");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!role) {
      toast.error("El rol es requerido");
      return;
    }

    setLoading(true);
    toast.dismiss(); // elimina cualqueir toast que este activo
    try {
      const result = await register(name, email, password, role);

      if (result?.user) {
        toast.success(
          `Registro creado con éxito ${result.user?.name || "usuario"}`,
        );

        // pequeño delay para que se vea el toast
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(result?.error || "Error al registrar");
      }
    } catch (error) {
      toast.error("Error inesperado en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[400px] p-8 rounded-3xl bg-[#1e293b]/70 border border-[#334155] shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#f8fafc] transition-all duration-300 hover:shadow-cyan-400/40"
      >
        <h1 className="text-3xl font-bold uppercase text-[#00ffff] tracking-[4px] drop-shadow-[0_0_10px_#00ffff]">
          Registro
        </h1>

        <div className="flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300">
          <i className="fa-solid fa-user text-[#00ffff]"></i>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Nombre"
            autoComplete="off"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

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

        <div className="flex justify-between items-center w-full text-[#00ffff] mt-3">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#05acb8] transition-all">
            <input
              type="radio"
              name="role"
              value="comprador"
              checked={role === "comprador"}
              onChange={handleChange}
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
              className="accent-[#2bdce2]"
            />
            Vendedor
          </label>
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
          {loading ? "Cargando..." : "Registrarse"}
        </button>

        <h2 className="mt-4 text-sm text-gray-400">
          Ya tienes cuenta?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Ingresa
          </Link>
        </h2>
      </form>
    </div>
  );
};
