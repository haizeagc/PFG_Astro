import React, { useState, useEffect } from "react";

const LIMITE_POR_PAGINA = 8;

function TelefonoDato() {
  const [telefonos, setTelefonos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // Función para obtener los datos desde la API
  useEffect(() => {
    const fetchTelefonos = async () => {
      try {
        const url = `http://localhost:3001/telefonos?_page=${paginaActual}&_limit=${LIMITE_POR_PAGINA}`;
        const response = await fetch(url);
        const data = await response.json();
        const totalRegistros = response.headers.get("X-Total-Count");
        setTelefonos(data);
        setTotalPaginas(Math.ceil(Number(totalRegistros) / LIMITE_POR_PAGINA));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchTelefonos();
  }, [paginaActual]);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Lista de teléfonos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {telefonos.map((telefono) => (
          <div key={telefono.id} className="p-4 rounded shadow hover:scale-105 transition-transform">
            <img
              src={`/src/assets/imagenes/${telefono.id}.jpg`}
              alt={`Imagen de ${telefono.marca} ${telefono.modelo}`}
              className="w-full h-auto mb-4"
            />
            <h2 className="text-sm font-bold text-center">{telefono.marca} {telefono.modelo}</h2>
            <p className="text-sm"><strong>Almacenamiento:</strong> {telefono.almacenamiento} GB</p>
            <p className="text-sm"><strong>RAM:</strong> {telefono.ram} GB</p>
            {telefono.precio === 0 ? (
              <p className="text-sm font-bold">GRATIS</p>
            ) : (
              <p className="text-sm"><strong>Precio:</strong> {`${telefono.precio}€`}</p>
            )}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mb-10">
        {/* Botón de página anterior */}
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        {/* Botones de páginas */}
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => cambiarPagina(index + 1)}
            className={`px-4 py-2 rounded ${
              paginaActual === index + 1
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-pink-300 text-black hover:bg-pink-400"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Botón de página siguiente */}
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default TelefonoDato;