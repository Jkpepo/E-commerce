import ListProducts from "./components/ListProducts";
import { ProductsProvider } from "./context/UseContext";
import { Layout } from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ListProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;
