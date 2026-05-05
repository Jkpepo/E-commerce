import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/UseProductsContext";
import { useNavigate, Link, redirect } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { toast } from "sonner";
import { DeleteModal } from "../components/DeleteModal";
export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { getProductBySeller, updateProduct, deleteProduct } =
    useContext(ProductsContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);


  useEffect(() => {
    if (!user || user.role !== "vendedor") return;

    const fetchMyProducts = async () => {
      const data = await getProductBySeller(currentPage);

      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.total);
      } else {
        setProducts([]);
      }
    };

    fetchMyProducts();
  }, [user, currentPage]);
  const handleConfirmDelete = async () => {
    const result = await deleteProduct(productToDelete._id);

    if (result) {
      toast.success("Producto eliminado");

      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setTotalProducts((prev) => prev - 1);

      if (products.length === 1 && currentPage > 1) { // si solo queda 1 producto en la página y lo borras te mueves a la página anterior
        setCurrentPage((prev) => prev - 1);
      }
    } else {
      toast.error("Error al eliminar");
    }

    setShowModal(false);
    setProductToDelete(null);
  };
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
                {totalProducts.toLocaleString()}
              </h2>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/20">
              <p className="text-gray-400 text-sm">Stock Total</p>
              <h2 className="text-2xl text-blue-400 font-bold">
                {totalStock.toLocaleString()}
              </h2>
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
              {products.map((p) => (
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
                    <button
                      onClick={() => navigate(`/edit/${p._id}`)}
                      className="text-cyan-400 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setProductToDelete(p);
                        setShowModal(true);
                      }}
                      className="text-red-400 hover:underline"
                    >
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
      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </div>
  );
};
