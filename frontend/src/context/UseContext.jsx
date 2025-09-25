import { createContext,useState,useEffect } from "react";

export const ProductsContext= createContext();

export function ProductsProvider ({children}){

    const [products,setProducts]=useState([])
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
        <ProductsContext.Provider value={{products,fetchProducts}}>

            {children}
        </ProductsContext.Provider>
        
    )
}