import ListProducts from "./components/ListProducts";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductsProvider } from "./context/UseProductsContext";
import { CartProvider } from "./context/UseCartContext";
import { Layout } from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./components/Cart";
function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/listproducts" element={<ListProducts />} />
              <Route path="/categoria/:category" element={<CategoryPage />} />
              <Route path="/car" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
