import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/UseProductsContext";
import { useNavigate, Link, redirect } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import {toast} from "sonner"

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { getProductBySeller } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  useEffect(() => {
    if (!user || user.role !== "vendedor") {
      navigate("/login");
      return
    }
    
  
    
  
  
    const fetchMyProducts = async () => {
      const data = await getProductBySeller();
      setProducts(data || []);
    };

    fetchMyProducts();
  }, [user, getProductBySeller]);

  // useEffect(() => {
  //   if (!user) {
  //     console.log("No hay usuario, redirigiendo al login...");
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400 bg-[#0e0e10]">
        <p>Cargando perfil...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex text-white gap-5 p-6 ">
      
      <div className="w-[260px] min-h-[600px] border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.1)] rounded-2xl p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <p className="text-xl font-bold text-cyan-400 mb-6">Panel</p>

          <p>
            <span className="font-semibold text-cyan-300">Nombre:</span>{" "}
            <span className="text-gray-300">{user.name}</span>
          </p>

          <p>
            <span className="font-semibold text-cyan-300">Email:</span>{" "}
            <span className="text-gray-300">{user.email}</span>
          </p>

          <p>
            <span className="font-semibold text-cyan-300">Rol:</span>{" "}
            <span className="capitalize text-gray-300">{user.role}</span>
          </p>
        </div>
        <button
          onClick={logout}
          className="  w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer"
        >
         
          Cerrar sesión
        </button>
      </div>

      
      {user?.role === "vendedor" && (
        <div className="flex-1 border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.1)] rounded-2xl p-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-cyan-400">Mis Productos</h2>

            <Link to="/createproduct">
              <button className="w-[200px] py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:cursor-pointer">
                Agregar producto
              </button>
            </Link>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-cyan-500/20">
              <p className="text-gray-400 text-sm">Total Productos</p>
              <h2 className="text-2xl text-cyan-400 font-bold">
                {totalProducts}
              </h2>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/20">
              <p className="text-gray-400 text-sm">Stock Total</p>
              <h2 className="text-2xl text-blue-400 font-bold">{totalStock}</h2>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/20">
              <p className="text-gray-400 text-sm">Valor Inventario</p>
              <h2 className="text-2xl text-green-400 font-bold">
                ${totalValue.toLocaleString()}
              </h2>
            </div>
          </div>

          
          <div className="rounded-xl border border-cyan-500/20 overflow-hidden">
            <div className="grid grid-cols-6 p-4 border-b border-cyan-500/10 text-sm text-gray-400">
              <span>Imagen</span>
              <span>Producto</span>
              <span>Precio</span>
              <span>Stock</span>
              <span>Valor</span>
              <span>Acciones</span>
            </div>
            <div className="min-h-[400px]">
              {currentProducts.map((p) => (
                <div
                  key={p._id}
                  className="grid grid-cols-6 p-4 border-b border-cyan-500/10 items-center hover:bg-[#1a1a1a] text-xs"
                >
                  <img
                    src={p.image || "/logo_png.png"}
                    alt={p.name}
                    className="w-8 h-8 rounded"
                  />

                  <span>{p.name}</span>
                  <span>${p.price}</span>
                  <span>{p.stock}</span>

                  <span className="text-green-400">
                    ${(p.price * p.stock).toLocaleString()}
                  </span>

                  <div className="flex gap-3 text-sm">
                    <button className="text-cyan-400 hover:underline">
                      Editar
                    </button>
                    <button className="text-red-400 hover:underline">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
