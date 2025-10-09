import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["comprador","vendedor"],
        default:"comprador"
    },

},{timestamps:true})

const Users = mongoose.model("Users", userSchema);

export default Users;