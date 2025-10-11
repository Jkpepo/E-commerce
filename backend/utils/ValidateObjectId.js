import mongoose from "mongoose";

/// esta validacion lo que me permite basicamente es que si el id del prodcuto no coincide me diga que es invalido
/// sobre todo teniendo en cuenta que si paso un id de menos de 24 caracteres en este caso porque mongo usa 24 caracteres en el id
// entonces saldra error y me rompera la ejecucion 
// con esto valido antes el Id de seguir el ciclo y lo hago en funcion para reutilizarlo en los otros verbos HTTP que necesite verificar el id

export const validateObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
   res.status(400).json({ message: "ID inválido" });
    return false;
  }
  return true;
};