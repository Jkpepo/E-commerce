import ListProducts from "./components/ListProducts";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductsProvider } from "./context/UseProductsContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/UseCartContext";
import { Layout } from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./components/Cart";
import { Register } from "./auth/Register";
import { Login } from "./auth/Login";
import { Profile } from "./auth/Profile";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { CreateProduct } from "./components/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/listproducts" element={<ListProducts />} />
                <Route path="/categoria/:category" element={<CategoryPage />} />
                <Route path="/car" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/createproduct" element={<CreateProduct />} />
           
              </Route>
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
