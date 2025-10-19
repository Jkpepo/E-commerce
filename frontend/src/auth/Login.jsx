import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const {login} = useContext(AuthContext)
const [formRegister,setFormRegister]=useState({email:"",password:""})

const {email,password}=formRegister
const navigate=useNavigate()

const handleChange  = (e)=>{
  setFormRegister({...formRegister,[e.target.name]:e.target.value})
}

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const loginValid = await login(email,password)
    if (loginValid) navigate("/")
    else console.error("error en el login")
    
  }


  return (
    <div  >
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label > email
          <input type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required

          />
        </label>
            <label > contraseña
          <input type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required

          />
        </label>
        <button type="submit">Ingresar</button>

      </form>

    </div>
  )
}
