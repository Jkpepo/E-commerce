import ListProducts from "./components/ListProducts"
import { ProductsProvider } from "./context/UseContext"
function App() {


  return (
    <ProductsProvider>
    <ListProducts/>
     
    </ProductsProvider>
  )
}

export default App
