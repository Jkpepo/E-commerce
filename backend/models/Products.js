import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }, // URL de la imagen
    stock: { type: Number, default: 0 },
    category: { type: String },
    quantity: {type: Number}
  },
  { timestamps: true }  // Auto agrega createdAt y updatedAt
);

const Product = mongoose.model("Product", productSchema);

export default Product;