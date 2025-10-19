import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  console.log("usuario",user)

  // si hay token guardado, recupera el usuario del backend (opcional)
  useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.msg || "Error en el login");

      // guarda en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };


  const register = async(name,email,password,role)=>{
    try{
        const res = await fetch("http://localhost:5000/api/auth/register",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({name,email,password,role})  
        })
        const data = await res.json()
        console.log("registro",data)
        if(!res.ok) throw new Error(data.message || "Error en Register");

     
        return data;

    }catch(error){
        console.error(error.message)

    }

  }

  const profile =async()=>{
    try{
      const res =await fetch("http://localhost:5000/api/auth/profile",{
         headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      });
      if(!res.ok) throw new Error("Error al obtener el perfil")
        const data = await res.json()
      setUser(data)
      localStorage.setItem("user",JSON.stringify(data))
      console.log("localstorager",localStorage)
      return data
    }catch(error){
      console.error(message.error)

    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout,register,profile }}>
      {children}
    </AuthContext.Provider>
  );
};
