import { useParams } from "react-router-dom"
import { useContext } from "react"
import { ProductsContext } from "../context/UseProductsContext"
import { ProductCard } from "../components/ProductCard"

export const CategoryPage = ()=>{
    const {category} = useParams()
    const {products} = useContext(ProductsContext)

    const filteredProductsPage = products.filter((product)=>product.category?.toLowerCase() === category.toLowerCase())

    return(
        <div className=" ">
          <div className="flex flex-wrap justify-center gap-6">
          
     
            {filteredProductsPage.length >0 ?(
                filteredProductsPage.map((product)=>(
                     
                  <ProductCard key={product._id} product={product}/>
                )


                )

            ):(
                <p> No Hay productos en esta categoria</p>

            )}
              
          </div>
        </div>
    )
}
