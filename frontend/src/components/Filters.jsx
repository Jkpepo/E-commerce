import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ProductsContext } from "../context/UseContext"

function Filters(){
   const {category,products,setCategory}=useContext(ProductsContext)
   const navigate = useNavigate()

    const handleChange = (e) => {
    const value = e.target.value;
    if(category){
         navigate(`/categoria/${value}`)
    }
}

    return(
        
    <div>
        filtros
        <select value={category} onChange={handleChange}>
        <option value="">Todos</option>
        <option value="ropa">Ropa</option>
        <option value="electrodomesticos">electrodomesticos</option>
        <option value="electronica">electronica</option>
        <option value="mascotas">Mascotas</option>
      </select>

      
    </div>
)
}

export default Filters