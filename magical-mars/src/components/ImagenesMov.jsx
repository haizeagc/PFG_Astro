import React, { useState, useEffect } from "react";

const imagenes = [
  "/src/assets/carrusel/01.jpg",
  "/src/assets/carrusel/02.jpg",
  "/src/assets/carrusel/03.jpg",
  "/src/assets/carrusel/04.jpg",
];

export default function Carrusel() {
  const [indiceActual, setIndiceActual] = useState(0);

  // Cambia automáticamente la imagen cada 3 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prevIndice) => (prevIndice + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
  }, []);

  // Función para cambiar manualmente la imagen
  const cambiarImagen = (nuevoIndice) => {
    setIndiceActual(nuevoIndice);
  };

  return (
    <div className="relative w-full bg-gray-200 overflow-hidden">
      {/* Contenedor del carrusel */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${indiceActual * 100}%)` }}
      >
        {imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={`Imagen ${index + 1}`}
            className="w-full h-64 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={() =>
          setIndiceActual((prevIndice) =>
            prevIndice === 0 ? imagenes.length - 1 : prevIndice - 1
          )
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#8249;
      </button>
      <button
        onClick={() =>
          setIndiceActual((prevIndice) => (prevIndice + 1) % imagenes.length)
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#8250;
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => cambiarImagen(index)}
            className={`w-3 h-3 rounded-full ${
              indiceActual === index
                ? "bg-white"
                : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}