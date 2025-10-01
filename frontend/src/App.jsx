import ListProducts from "./components/ListProducts";
import CategoryPage from "./pages/CategoryPage";
import { ProductsProvider } from "./context/UseContext";
import { Layout } from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListProducts />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;
