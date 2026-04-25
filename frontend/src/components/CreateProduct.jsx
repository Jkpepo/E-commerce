import { useContext } from "react";
import { ProductsContext } from "../context/UseProductsContext";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const { createProduct } = useContext(ProductsContext);
  const [imageProduct, setImageProduct] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [formProduct, setFormProduct] = useState({
    name: "",
    price: "",
    stock: "",
    quantity: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();
  const { name, price, stock, quantity, category, description } = formProduct;
  if (user?.role == "comprador") {
    return <h1>NO puedes crear productos eres comprador</h1>;
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    await uploadImage(file);
  };
  const uploadImage = async (file) => {
    setLoadingImage(true);
    
    const image = new FormData();
    image.append("file", file);
    image.append("upload_preset", "e-commerce");
    
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwmyklpvq/image/upload",
      {
        method: "POST",
        body: image,
      },
    );
    
    const data = await res.json();
    
    setImageProduct(data.secure_url);
    setLoadingImage(false);
   
  };

  const handleChange = (e) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productValid = await createProduct(
      name,
      price,
      stock,
      quantity,
      category,
      description,
      imageProduct,
    );
    if (productValid) {
      toast.success(`Producto creado con exíto `);
      console.log("producto agregado", productValid);
      navigate("/profile");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[400px] p-8 rounded-3xl   bg-[#1e293b]/70 border border-[#334155] shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#f8fafc] transition-all duration-300 hover:shadow-cyan-400/40"
      >
        <h1 className="text-3xl font-bold uppercase text-[#00ffff] tracking-[4px] drop-shadow-[0_0_10px_#00ffff]">
          crear producto
        </h1>
        <input
          type="text"
          name="name"
          placeholder="nombre producto"
          required
          value={name}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />
        <input
          type="number"
          name="price"
          placeholder="precio"
          required
          value={price}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />
        <input
          type="number"
          name="stock"
          placeholder="stock del producto"
          required
          value={stock}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />
        <input
          type="number"
          name="quantity"
          placeholder="cantidad"
          value={quantity}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />

        <select
          name="category"
          value={category}
          required
          onChange={handleChange}
          className=" 
            bg-[#1e293b]/70 
            flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300 "
        >
          <option value="" hidden>
            Categorias
          </option>

          <option value="ropa">Ropa</option>
          <option value="electrodomesticos">Electrodomésticos</option>
          <option value="electronica">Electrónica</option>
          <option value="mascotas">Mascotas</option>
        </select>

        <textarea
          name="description"
          placeholder="descripcion"
          value={description}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleUploadImage}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />

        <button
          type="submit"
          disabled={loadingImage}
          className="w-60 mt-6 py-2  bg-gradient-to-r from-cyan-500 to-blue-600 text-white  rounded-xl font-semibold tracking-wide shadow-[0_0_10px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          {loadingImage ? "Subiendo..." : "Agregar Producto"}
          {/* Agregar Producto */}
        </button>
        {loadingImage && <p className="text-cyan-400">Subiendo imagen...</p>}

        {imageProduct && (
          <img
            src={imageProduct}
            className="w-24 h-24 object-cover mt-2 rounded"
          />
        )}
      </form>
    </div>
  );
};
