import { createContext, useState,useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { CartModal } from "../components/CartModal";

export const CartContext = createContext();



export function CartProvider({ children }) {
  const {user,token}=useContext(AuthContext)
  const [car, setCar] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentProduct, setRecentProduct] = useState(null);
  const navigate =useNavigate();

useEffect(() => {
  const fetchCart = async () => {
    if (!user || !token) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCar(data.cart || []);
    } catch (error) {
      console.log("Error al cargar el carrito:", error);
    }
  };

  fetchCart();
}, [user, token]);

  //Agregar productos al carro



  const addToCart = async (product) => {

    if(!user){
      navigate("/login")
      return
    }
    try {
      const res= await fetch("http://localhost:5000/api/cart/addcart",{
        method:"POST",
        headers:{"Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({productId:product._id}),
      })
      const data = await res.json();
      console.log("datos",data.cart)
      setCar(data.cart)
      setRecentProduct(product);
      setIsCartOpen(true);
      return data 
    } catch (error) {
      console.log(error)
    }
    // setCar((prev) => {
    //   // find me ayuda a encontrar el elemento que coincida, si ya existe le aumenta +1 a la cantidad
    //   const itemFound = prev.find((item) => item._id === product._id);
    //   if (itemFound) {
    //     return prev.map((item) =>
    //       item._id === product._id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //       );
    //     }
       

      // sino existe agrega el producto con una cantidad de 1
      
    //   return [...prev, { ...product, quantity: 1 }];
    // });
  };

  // *****************************DECREMENTAR************
  // disminuir producto en el carrito
  // const decrementProduct = (product) => {
  //   setCar((prev) => {
  //     return prev.map((item) =>
  //       item._id === product._id
  //         ? {
  //             ...item,
  //             quantity: item.quantity > 1 ? item.quantity - 1 : 1,
  //           }
  //         : item
  //     );
  //   });
  // };
const decrementProduct = async (product) => {

    if(!user){
      navigate("/login")
      return
    }
    try {
      const res= await fetch("http://localhost:5000/api/cart/decrementproduct",{
        method:"POST",
        headers:{"Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({productId:product.productId._id}),
      })
      const data = await res.json();
      console.log("datos",data.cart)
      setCar(data.cart)

      return data 
    } catch (error) {
      console.log(error)
    }}

// ******************INCREMENTAR PRODCUTO*********


  // incrementar producto en el carrito
  // const incrementProduct = (product) => {
  //   setCar((prev) => {
  //     return prev.map((item) =>
  //       item._id === product._id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     );
  //   });
  // };

const incrementProduct = async (product) => {

    if(!user){
      navigate("/login")
      return
    }
    try {
      const res= await fetch("http://localhost:5000/api/cart/incrementproduct",{
        method:"POST",
        headers:{"Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({productId:product.productId._id}),
      })
      const data = await res.json();
      console.log("datos",data.cart)
      setCar(data.cart)

      return data 
    } catch (error) {
      console.log(error)
    }}








  //eliminar producto carrito

  /// ************ELIMINAR PRODUCTO DLE CARRITO*******************

  // const cleanProduct = (id) => {
  //   setCar((prev) => prev.filter((item) => item._id !== id));
  // };

  const cleanProduct = async (product) => {

    if(!user){
      navigate("/login")
      return
    }
    try {
      const res= await fetch("http://localhost:5000/api/cart/cleanproduct",{
        method:"DELETE",
        headers:{"Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({productId:product.productId._id}),
      })
      const data = await res.json();
      console.log("datos",data.cart)
      setCar(data.cart)

      return data 
    } catch (error) {
      console.log(error)
    }}


  // total items para que cada vez que agregue item me sume en el carrito y tambien si el producto lo pongo 2 o 3 veces
  // const totalItems = car.reduce((acc, item) => acc + item.quantity, 0);

  // precio total * cantidad de producto
  // const totalPrice = car.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  // si el carrito esta vacio no cobra envio
  // const shipment = car.length === 0 ? 0 : totalPrice < 200 ? 1000 : 0;

  // // total + envio
  // const totalToPay = totalPrice + shipment;
  // formateo para los valores de precio se vean mejor con sus puntos o comas en moneda Colombiana

  // const formatPrice = (value) =>
  // value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <CartContext.Provider
      value={{
        addToCart,
        decrementProduct,
        car,
        incrementProduct,
        cleanProduct,
        // totalItems,
        // totalPrice,
        // shipment,
        // totalToPay,
        // formatPrice,
        isCartOpen,
        setIsCartOpen
        
      }}
    >
      {children}

       {isCartOpen && recentProduct && (
    <CartModal 
    recentProduct={recentProduct} 
    onClose={()=> setIsCartOpen(false)}
    // formatPrice={formatPrice}
    
     />
  )}
    </CartContext.Provider>
  );
}
