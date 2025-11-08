import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";;

// middleware general para validar token 
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No hay token, autorización denegada" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
     console.log("Decoded JWT:", decoded); 
    req.user = decoded; //contiene el {id,role}
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token no válido o expirado" });
  }
};

// Solo vendedores
export const sellerOnly = (req, res, next) => {
  if (req.user.role !== "vendedor") {
    return res.status(403).json({ message: "Acceso denegado: solo vendedores" });
  }
  next();
};