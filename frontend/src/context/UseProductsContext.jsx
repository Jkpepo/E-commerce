import { createContext,useState,useEffect} from "react";

export const ProductsContext= createContext();

export function ProductsProvider ({children}){

    const [products,setProducts]=useState([])
    const [search,setSearch]=useState("")
    // este estado basicamente lo que me maneja es "una busqueda local " ya que si lo hago directamente cada que digite una 
    // tecla el estado de search va a cambiar
    // y este me almacena lo que digite y me ayuda para controlar la busqueda
    const [query, setQuery] = useState("")
    const [category,setCategory]=useState("all")

    const BASE_URL="http://localhost:5000/api/products/"

    const fetchProducts = async ()=> {
        try{
            const result = await fetch(BASE_URL)
            const data = await result.json()
            setProducts(data)

        }catch (error){
            console.error(`Error al obtener datos ${error}`)
        }

    }
        useEffect(()=>{
            fetchProducts()
        },[])

    
    return(
        <ProductsContext.Provider value={{products,fetchProducts,search,setSearch,category,setCategory,query,setQuery}}>
            {children}
        </ProductsContext.Provider>
        
    )
}