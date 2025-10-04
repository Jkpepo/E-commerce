import { useContext } from "react";
import { CarContext } from "../context/UseCarContext";

export const Car = () => {
  const { car, decrementProduct, incrementProduct, cleanProduct } =
    useContext(CarContext);

  return (
    <div className=" min-h-screen py-10">
      <div className="max-w-6xl mx-auto h-full flex gap-10 p-6">
      
        <div className="w-2/3 h-full shadow-2xl rounded-lg p-4 bg-white">
          <h1 className="text-xl font-bold mb-4">Tus productos</h1>
          <div className="flex flex-col gap-4">
          
          {/* Productos del carro */}
            {car && car.length > 0 ? (
              car.map((product) => (
                <div
                  key={product._id}
                  className=" p-3 rounded-md shadow-xl bg-gray-200 flex justify-between items-center "
                >
                  <img
                    className="max-w-[100px] max-h-[100px]"
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                  <h2 className="font-semibold">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    {product.quantity <= 1 ? (
                      <button onClick={() => cleanProduct(product._id)}>
                        🗑️
                      </button>
                    ) : (
                      <button onClick={() => decrementProduct(product)}>
                        -
                      </button>
                    )}

                    <span>{product.quantity}</span>

                    <button onClick={() => incrementProduct(product)}>+</button>
                  </div>

                  <p>{product.price}</p>
                </div>
              ))
            ) : (
              <h1>no hay productos</h1>
            )}
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="w-1/3 h-fit  p-6 rounded-lg bg-white shadow-xl">
          <h1 className="text-lg font-bold mb-4">Resumen de la compra</h1>
          <hr />
          <div className="flex justify-between mt-4">
            <h2>
              Productos <span className="text-gray-500">(12)</span>
            </h2>
            <p className="">$1.344.890</p>
          </div>
          <div className="flex justify-between mt-4">
            <h2>
              Envio <span className="text-gray-500">(12)</span>
            </h2>
            <p className="">$100.000</p>
          </div>
          <div className="flex justify-between mt-4 font-semibold text-lg">
            <h1>Total</h1>
            <p>$1.444.566</p>
          </div>
          <button className="mt-6 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition cursor-pointer">
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
