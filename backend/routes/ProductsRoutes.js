import express from 'express';
import Product  from '../models/Products.js';

const router = express.Router();

// GET -> Listar los productos

router.get("/",async (req,res)=>{
    try{
        const products = await Product.find();
         console.log("📦 Productos en DB:", products); 
        res.json(products)
    }catch(error) {
        res.status(500).json({message: "Error al obtener productos"})
    }
})

// Post -> Crear productos

router.post("/",async (req,res)=>{
    try{
        const {name,description,price,image,stock,category,quantity} = req.body;
        const newProduct = new Product({name,description,price,image,stock,category,quantity});
        await newProduct.save();
         console.log("✅ Producto guardado:", newProduct);
        res.status(201).json(newProduct);

    }catch (error){
          console.error(error); 
        res.status(400).json({message: "Error al crear producto"});
    }
})

export default router