import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";


const JWT_SECRET = process.env.JWT_SECRET

// registro

export const register = async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const userExist = await Users.findOne({email});
        if (userExist) return res.status(400).json({message:"el usuario ya existe"});

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await Users.create({name,email,password:hashedPassword,role});
         res.status(201).json({message:"Usuario creado con exito",user:newUser});

    }catch (error){
        res.status(500).json({message:message.error})

    }
}

// login
export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await Users.findOne({email});
         if(!user) return res.status(404).json({message:"Usuario no encontrado"});

         const isValid = await bcrypt.compare(password,user.password);
         if(!isValid) return res.status(400).json({message:"Contraseña incorrecta"});

         const token= jwt.sign(
            {id:user._id,role:user.role},
            JWT_SECRET,
            {expiresIn:"7d"}
         );

         res.json({
            message:"Login exitoso",
            token,
            user:{id:user._id,name:user.name,role:user.role,email:user.email}

         });
    }catch (error){
        res.status(500).json({message:error.message})
         
    }
};

//Perfil (quiere token)

export const getProfile = async(req,res)=>{
    try{
        const user = await Users.findById(req.user.id).select("-password");
        res.json(user)

    }catch(error){
        res.status(500).json({message:error.message})
    }
}