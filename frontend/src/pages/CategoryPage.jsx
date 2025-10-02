import { useParams } from "react-router-dom"
import { useContext } from "react"
import { ProductsContext } from "../context/UseContext"

export const CategoryPage = ()=>{
    const {category} = useParams()
    const {products} = useContext(ProductsContext)

    const filteredProductsPage = products.filter((product)=>product.category.toLowerCase() === category.toLowerCase())

    return(
        <div>
            Categoria:{category}
            {filteredProductsPage.length >0 ?(
                filteredProductsPage.map((product)=>(
                     <div
              key={product._id}
              className="border-2 border-amber-700 w-[300px] min-h-[320px] p-4 rounded-md shadow-md bg-white m-2"
            >

              {/* Imagen */}
              <div className="flex justify-center mb-3">
                <img
                  className="w-full h-60 object-contain border-b-1"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <h2 className=" text-lg mb-2 ">{product.name}</h2>

              {/* Info */}
              <p className="text-gray-500 mb-2 overflow-hidden  max-h-12">{product.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Categoría: {product.category}
              </p>
              <p className="font-bold mb-2">$ {product.price}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <h3 className="text-green-600 font-semibold">Envio gratis</h3>
            </div>

                )


                )

            ):(
                <p> No Hay productos en esta categoria</p>

            )}
        </div>
    )
}
