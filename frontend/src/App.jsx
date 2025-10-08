import ListProducts from "./components/ListProducts";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductsProvider } from "./context/UseProductsContext";
import { CarProvider } from "./context/UseCarContext";
import { Layout } from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./components/Cart";
function App() {
  return (
    <ProductsProvider>
      <CarProvider>
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
      </CarProvider>
    </ProductsProvider>
  );
}

export default App;
