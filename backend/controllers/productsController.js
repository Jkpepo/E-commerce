import express from "express";
import Product from "../models/Products.js";
import { validateObjectId } from "../utils/ValidateObjectId.js";

// GET -> Listar los productos

export const getAllProducts =
  ("/",
  async (req, res) => {
    try {
      const allproducts = await Product.find();
      res.status(200).json(allproducts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener productos" });
    }
  });

// GET:id -> obtener un dato por id

export const getProductById =
  ("/:id",
  async (req, res) => {
    if (!validateObjectId(req.params.id, res)) return;

    try {
      const oneProduct = await Product.findById(req.params.id);

      if (!oneProduct) {
        return res.status(404).json({ message: "Producto no encontrado" }); // esto me sirve porque despues que elimino un dato me aparece null si busco por Id y con esto Doy una informacion mejor
      }
      res.status(200).json(oneProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error al obtener producto" });
    }
  });

// Post -> Crear productos

export const createProduct =
  ("/",
  async (req, res) => {
    try {
      const newProduct = await Product.create({
        ...req.body,
        seller: req.user.id,
      }); // este Product viene de mi models es como POO
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error al crear producto" });
    }
  });

// PUT --> actualizar un producto

export const updateProduct =
  ("/:id",
  async (req, res) => {
    if (!validateObjectId(req.params.id, res)) return;

    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );
      if (!updateProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(updateProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error al actualizar producto" });
    }
  });

// DELETE -> eliminar un producto

export const deleteProduct =
  ("/:id",
  async (req, res) => {
    if (!validateObjectId(req.params.id, res)) return;

    try {
      const deleteProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deleteProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      return res
        .status(200)
        .json({ message: "Producto eliminado", deleteProduct });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error al eliminar el producto" });
    }
  });

// GET ----> obtener los productos de cada vendedor

export const getMyProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; // paramenttros de la Url para paginacion

    const products = await Product.find({ seller: req.user.id })
      .skip((page - 1) * limit) // paginacion saltqa prodcutos 
      .limit(Number(limit))// number porque query siempre lleha en string /limit me limita cuantos productos devolver
      .populate("seller", "name email");// reemplaza el seller por ObjectID por datos reales
    const total = await Product.countDocuments({ seller: req.user.id }); // cuenta todos los productos por vendedor sirve para saber cuantos páginas  hay

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),// ejemplo 23 / 5 = 4.6 → Math.ceil → 5 páginas
      currentPage: Number(page),// devulve en que pagina estoy
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
