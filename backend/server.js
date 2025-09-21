import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Ruta base de prueba
app.get("/",(req,res)=>{
    res.send("Api funcionando");
});

//conectar con MongoDB

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Conectado a MongoDB"))
.catch((err)=> console.error("Error MongoDB",err));

// Servidor 
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`))