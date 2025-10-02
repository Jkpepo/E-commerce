import { createContext,useState,useEffect, use } from "react";

export const ProductsContext= createContext();

export function ProductsProvider ({children}){

    const [products,setProducts]=useState([])
    const [search,setSearch]=useState("")
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