import express from 'express';
import Product  from '../models/Products.js';
import { validateObjectId } from '../utils/ValidateObjectId.js';

const router = express.Router();


// GET -> Listar los productos

router.get("/",async (req,res)=>{
    try{
        const allproducts = await Product.find();
        res.status(200).json(allproducts)
    }catch(error) {
        res.status(500).json({message: "Error al obtener productos"})
    }
})

// GET:id -> obtener un dato por id

router.get("/:id",async (req,res)=>{

    if(!validateObjectId(req.params.id,res)) return 

    try{
        const oneProduct = await Product.findById(req.params.id);

        if(!oneProduct) {
        return res.status(404).json({message:"Producto no encontrado"})// esto me sirve porque despues que elimino un dato me aparece null si busco por Id y con esto Doy una informacion mejor
    }
        res.status(200).json(oneProduct)

    }catch (error){
        console.error(error)
        res.status(400).json({message:"Error al obtener producto"});

    }
})



// Post -> Crear productos

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);// este Product viene de mi models es como POO 
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear producto" });
  }
});

// PUT --> actualizar un producto
 
router.put("/:id",async (req,res)=>{

    if(!validateObjectId(req.params.id,res)) return

    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,req.body, { new: true,runValidators: true });
        if(!updateProduct){
            return res.status(404).json({message:"Producto no encontrado"})
        }
        res.status(200).json(updateProduct)

    }catch (error){
        console.error(error)
        res.status(400).json({message:"Error al actualizar producto"});

    }
})

// DELETE -> eliminar un producto

router.delete("/:id", async (req,res)=>{

    if(!validateObjectId(req.params.id,res)) return 

    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
     

        if(!deleteProduct){
             return res.status(404).json({ message: "Producto no encontrado" });
        }
         return res.status(200).json({ message: "Producto eliminado", deleteProduct });

    }catch (error){
        console.error(error)
        res.status(400).json({message:"Error al eliminar el producto"})

    }

})



export default router