import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/UseProductsContext";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/UseCartContext";
import { CartSummary } from "./CartSummary";
import { toast } from "sonner";
export const UpdateProduct = () => {
  const { id } = useParams();
  const { updateProduct, getProductById, product, error } =
    useContext(ProductsContext);
  const navigate = useNavigate();
  const [formProduct, setFormProduct] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    getProductById(id); // traigo el producto con esta funcion por el id /cada vez que selecciones un producto el id es diferente cambia para eso el effect
  }, [id]);

  useEffect(() => {
    if (product) {
      // aqui pasa algo similart pero creamos un formProduct para no modificar el estado global directamente sino que hacemos una copia de ese producto para editarlo y enviar
      setFormProduct(product);
    }
  }, [product]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoadingImage(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "e-commerce");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwmyklpvq/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const img = await res.json();

      setFormProduct({
        ...formProduct,
        image: img.secure_url,
      });

      toast.success("Imagen subida correctamente");
    } catch (error) {
      toast.error("Error al subir imagen");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleChange = (e) => {
    setFormProduct({
      // aqui hacemos la copia y es la que se le va a enviar a la funcion updateProduct
      ...formProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formProduct.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    if (!formProduct.price || formProduct.price <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }

    if (!formProduct.stock || formProduct.stock < 0) {
      toast.error("El stock es obligatorio");
      return;
    }
    if (!formProduct.quantity || formProduct.quantity <= 0) {
      toast.error("La cantidad es obligatoria");
      return;
    }

    if (!formProduct.category) {
      toast.error("Selecciona una categoría");
      return;
    }

    if (!formProduct.description.trim()) {
      toast.error("La descripción es obligatoria");
      return;
    }

    if (!formProduct.image) {
      toast.error("Debes subir una imagen");
      return;
    }
    const result = await updateProduct(id, formProduct);

    if (result) {
      toast.success("Producto editado correctamente");
      setTimeout(() => {
        toast.dismiss();
        navigate("/profile");
      }, 1000);
    } else {
      toast.error("Producto NO fue creado");
    }
  };
  if (!formProduct) return <p className="text-center mt-10">Cargando...</p>;

  if (error)
    return (
      <h1 className="text-center mt-10 text-red-500">Producto no encontrado</h1>
    );

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[400px] p-8 rounded-3xl   bg-[#1e293b]/70 border border-[#334155] shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md text-[#f8fafc] transition-all duration-300 hover:shadow-cyan-400/40"
      >
        <h1 className="text-2xl font-bold uppercase text-[#00ffff] tracking-[4px] drop-shadow-[0_0_10px_#00ffff]">
          Editar producto
        </h1>

        <input
          type="text"
          name="name"
          placeholder="nombre producto"
          value={formProduct.name}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />

        <input
          type="number"
          name="price"
          placeholder="precio"
          value={formProduct.price}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />

        <input
          type="number"
          name="stock"
          placeholder="stock del producto"
          value={formProduct.stock}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />
        <label className=" w-full flex justify-start">
          <p className="text-cyan-400">Cantidad</p>
          <input
            type="number"
            name="quantity"
            placeholder="cantidad"
            value={formProduct.quantity}
            onChange={handleChange}
            className="flex items-center w-full p-2 m-6  gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
          />
        </label>
        <select
          name="category"
          value={formProduct.category}
          onChange={handleChange}
          className="bg-[#1e293b]/70 flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
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
          value={formProduct.description}
          onChange={handleChange}
          className="flex items-center w-full p-2 m-6 gap-4 border-b border-[#00ffff] py-2 hover:shadow-[0_0_10px_#00ffff] transition-all duration-300"
        />

        <label className="w-full m-6 p-6 border-2 border-dashed border-cyan-400 rounded-xl text-center cursor-pointer hover:bg-cyan-400/10">
          <p className="text-cyan-400">
            {formProduct.image ? "Cambiar imagen" : "Selecciona una imagen"}
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="hidden" // oculta lo de seleccion de imagen y eso que se ve feo
          />
        </label>
        <button
          type="submit"
          disabled={loadingImage}
          className={`w-60 mt-6 py-2 rounded-xl font-semibold transition-all
    ${
      loadingImage
        ? "opacity-50 cursor-not-allowed"
        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02]"
    }
  `}
        >
          {loadingImage ? "Subiendo..." : "Actualizar Producto"}
        </button>

        <img
          src={formProduct.image}
          className="w-24 h-24 object-cover mt-2 rounded"
        />
      </form>
    </div>
  );
};
