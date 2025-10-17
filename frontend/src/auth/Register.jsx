import { useState,useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import {useNavigate} from "react-router-dom"

export const Register = () => {
    const {register} = useContext(AuthContext);
    const navigate = useNavigate();


    const [FormData,setFormData]= useState({name:"",email:"",password:"",role:""})
    const {name,email,password,role}= FormData
    

    const hadleChange = (e)=>{
        setFormData({...FormData,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const success = await register(name,email,password,role);
        if(success){
            console.log("Resgistro Correcto")
            navigate("/")
        }else{
            console.error("error al registrar")
        }
    }
  return (
    <div>
        <form 
        onSubmit={handleSubmit}
        >
            <h1>Registro </h1>
            <label> Nombre
                <input type="text" 
                name="name"
                value={name}
                onChange={hadleChange}
                required
                
                />
            </label>
                   <label> Email
                <input type="email" 
                name="email"
                value={email}
                onChange={hadleChange}
                required
                
                />
            </label>       
            <label> Contraseña
                <input type="password" 
                name="password"
                value={password}
                onChange={hadleChange}
                required
                
                />
            </label>       <label> role
                <input type="text" 
                name="role"
                value={role}
                onChange={hadleChange}
                required
                
                />
            </label>
            <button type="submit"> Registrar </button>
        </form>

    </div>
  )
}
