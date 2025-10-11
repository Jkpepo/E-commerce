import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productsRoutes from "./routes/ProductsRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";


dotenv.config();

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Ruta base de prueba

app.get("/",(req,res)=>{
    res.send("Api funcionando");
});


//Middleware de productos 
app.use("/api/products",productsRoutes);
app.use("/api/auth", authRoutes);

//conectar con MongoDB

mongoose.connect(process.env.MONGO_URI,{ dbName: "ecommerce" })
.then(()=> console.log("Conectado a MongoDB Atlas"))
.catch((err)=> console.error("Error MongoDB",err));

mongoose.connection.on("connected", () => {
  console.log("🔗 Conectado a MongoDB en DB:", mongoose.connection.name);
});

// Servidor 
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`))