import React, { useState, useEffect } from "react";

const LIMITE_POR_PAGINA = 8;

export default function TelefonoDato({ filtros }) {
  const [telefonos, setTelefonos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [movilSeleccionado, setMovilSeleccionado] = useState(null); // Estado para el móvil seleccionado
  const [mostrarPopUp, setMostrarPopUp] = useState(false); // Estado para controlar la visibilidad del pop-up

  // Función para construir la URL con filtros dinámicos
  const construirUrlConFiltros = () => {
    let url = `http://localhost:3001/telefonos?_page=${paginaActual}&_limit=${LIMITE_POR_PAGINA}`;

    // Lógica para manejar los diferentes filtros con OR
    if (filtros.marca && filtros.marca.length > 0) {
      const marcasQuery = filtros.marca
        .map((marca) => `marca=${encodeURIComponent(marca)}`)
        .join("&"); // Genera parámetros separados por "&"
      url += `&${marcasQuery}`;
    }

    if (filtros.almacenamiento && filtros.almacenamiento.length > 0) {
      const almacenamientoQuery = filtros.almacenamiento
        .map((memoria) => `almacenamiento=${encodeURIComponent(memoria)}`)
        .join("&"); // Genera parámetros separados por "&"
      url += `&${almacenamientoQuery}`;
    }

    if (filtros.orden) {
      url += `&_sort=precio&_order=${filtros.orden}`; // Agrega el orden por precio
    }

    return url;
  };

  // Función para obtener los datos desde la API
  useEffect(() => {
    const fetchTelefonos = async () => {
      try {
        const url = construirUrlConFiltros();
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
  }, [paginaActual, filtros]); // Ejecuta el efecto cuando cambian la página o los filtros

  // Resetea la página actual a 1 cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [filtros]);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // Función para abrir el pop-up
  const abrirPopUp = (telefono) => {
    setMovilSeleccionado(telefono); // Establece el móvil seleccionado
    setMostrarPopUp(true); // Muestra el pop-up
  };

  // Función para cerrar el pop-up
  const cerrarPopUp = () => {
    setMovilSeleccionado(null); // Limpia el móvil seleccionado
    setMostrarPopUp(false); // Oculta el pop-up
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Lista de teléfonos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {telefonos.map((telefono) => (
          <div
            key={telefono.id}
            className="p-4 rounded shadow hover:scale-105 hover:border-2 hover:border-pink-500 transition-transform cursor-pointer"
            onClick={() => abrirPopUp(telefono)} // Abre el pop-up al hacer clic
          >
            <img
              src={`/src/assets/imagenes/${telefono.id}.jpg`} // Asegúrate de que las imágenes estén en la ruta correcta
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

      {/* Pop-up */}
      {mostrarPopUp && movilSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <button
              onClick={cerrarPopUp}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <img
              src={`/src/assets/imagenes/${movilSeleccionado.id}.jpg`}
              alt={`Imagen de ${movilSeleccionado.marca} ${movilSeleccionado.modelo}`}
              className="w-full h-auto mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{movilSeleccionado.marca} {movilSeleccionado.modelo}</h2>
            <p><strong>Almacenamiento:</strong> {movilSeleccionado.almacenamiento} GB</p>
            <p><strong>RAM:</strong> {movilSeleccionado.ram} GB</p>
            <p><strong>Precio:</strong> {movilSeleccionado.precio === 0 ? "GRATIS" : `${movilSeleccionado.precio}€`}</p>
          </div>
        </div>
      )}
    </div>
  );
}