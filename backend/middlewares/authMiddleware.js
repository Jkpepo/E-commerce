import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";;

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No hay token, autorización denegada" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ MessagePort: "Token no válido" });
  }
};

// Solo vendedores
export const sellerOnly = (req, res, next) => {
  if (req.user.role !== "vendedor") {
    return res.status(403).json({ msg: "Acceso denegado: solo vendedores" });
  }
  next();
};