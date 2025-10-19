import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      console.log("No hay usuario, redirigiendo al login...");
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <h2>Bienvenido, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};
