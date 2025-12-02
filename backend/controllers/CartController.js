import Users from "../models/Users.js";

export const addToCart = async (req,res)=>{
    
        console.log(req.body)
    try{
        const userId = req.user.id
        const {productId} = req.body;
        const user = await Users.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"Usuario no encontrado"
            });
        }
        if(!user.cart){
            user.cart =[];
        }
        const item = user.cart.find(
            (p)=> p.productId.toString() === productId
        );

        if(item){
            item.quantity +=1;
        }else{
            user.cart.push({productId,quantity:1});
        }
        await user.save();

         const updatedUser = await Users.findById(userId)
      .populate("cart.productId");



        res.status(200).json({
            message: "Producto agregado al carrito",
            cart:updatedUser.cart,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error al agregar el producto al carrito",
            error:error.message,
        });
    }

}

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Users.findById(userId).populate("cart.productId");

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carrito" });
  }
};