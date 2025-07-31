import React, { useState } from "react";

export default function FiltroSidebar({ onFilterChange }) {
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [almacenamientosSeleccionados, setAlmacenamientosSeleccionados] = useState([]);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState(""); // Estado para el orden
  const [mostrarMarcas, setMostrarMarcas] = useState(false); // Inicialmente colapsado
  const [mostrarMemoria, setMostrarMemoria] = useState(false); // Inicialmente colapsado
  const [mostrarOrden, setMostrarOrden] = useState(false); // Inicialmente colapsado

  const marcas = ["SAMSUNG", "APPLE", "XIAOMI", "HONOR", "GOOGLE", "MOTOROLA", "ZTE", "TCL", "OPPO", "VIVO"];
  const almacenamientos = ["64", "128", "256", "512"];

  // Maneja el cambio de las marcas seleccionadas
  const handleMarcaChange = (e) => {
    const { value, checked } = e.target;
    const nuevasMarcas = checked
      ? [...marcasSeleccionadas, value]
      : marcasSeleccionadas.filter((marca) => marca !== value);

    setMarcasSeleccionadas(nuevasMarcas);

    // Llama a la función onFilterChange automáticamente
    onFilterChange({
      marca: nuevasMarcas,
      almacenamiento: almacenamientosSeleccionados,
      orden: ordenSeleccionado,
    });
  };

  // Maneja el cambio de los almacenamientos seleccionados
  const handleMemoriaChange = (e) => {
    const { value, checked } = e.target;
    const nuevosAlmacenamientos = checked
      ? [...almacenamientosSeleccionados, value]
      : almacenamientosSeleccionados.filter((almacenamiento) => almacenamiento !== value);

    setAlmacenamientosSeleccionados(nuevosAlmacenamientos);

    // Llama a la función onFilterChange automáticamente
    onFilterChange({
      marca: marcasSeleccionadas,
      almacenamiento: nuevosAlmacenamientos,
      orden: ordenSeleccionado,
    });
  };

  // Maneja el cambio del orden seleccionado
  const handleOrdenChange = (e) => {
    const nuevoOrden = e.target.value;
    setOrdenSeleccionado(nuevoOrden);

    // Llama a la función onFilterChange automáticamente
    onFilterChange({
      marca: marcasSeleccionadas,
      almacenamiento: almacenamientosSeleccionados,
      orden: nuevoOrden,
    });
  };

  // Reinicia los filtros al estado inicial
  const reiniciarFiltros = () => {
    setMarcasSeleccionadas([]);
    setAlmacenamientosSeleccionados([]);
    setOrdenSeleccionado("");

    // Llama a la función onFilterChange con los valores iniciales
    onFilterChange({
      marca: [],
      almacenamiento: [],
      orden: "",
    });
  };

  return (
    <div className="w-64 h-screen p-4 border-r-2 border-pink-500 bg-pink-100 fixed left-0 top-20 shadow-md">
      <h2 className="text-lg font-bold mb-4 text-pink-700">FILTROS</h2>

      {/* Menú desplegable para marcas */}
      <div className="mb-4">
        <h3
          className="text-sm font-bold text-pink-700 mb-2 cursor-pointer"
          onClick={() => setMostrarMarcas(!mostrarMarcas)}
        >
          MARCA {mostrarMarcas ? "▲" : "▼"}
        </h3>
        {mostrarMarcas && (
          <div>
            {marcas.map((marca) => (
              <div key={marca} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`marca-${marca}`}
                  value={marca}
                  checked={marcasSeleccionadas.includes(marca)}
                  onChange={handleMarcaChange}
                  className="mr-2"
                />
                <label htmlFor={`marca-${marca}`} className="text-sm text-pink-700">
                  {marca}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menú desplegable para memoria */}
      <div className="mb-4">
        <h3
          className="text-sm font-bold text-pink-700 mb-2 cursor-pointer"
          onClick={() => setMostrarMemoria(!mostrarMemoria)}
        >
          MEMORIA {mostrarMemoria ? "▲" : "▼"}
        </h3>
        {mostrarMemoria && (
          <div>
            {almacenamientos.map((almacenamiento) => (
              <div key={almacenamiento} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`memoria-${almacenamiento}`}
                  value={almacenamiento}
                  checked={almacenamientosSeleccionados.includes(almacenamiento)}
                  onChange={handleMemoriaChange}
                  className="mr-2"
                />
                <label htmlFor={`memoria-${almacenamiento}`} className="text-sm text-pink-700">
                  {almacenamiento} GB
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menú desplegable para ordenar */}
      <div className="mb-4">
        <h3
          className="text-sm font-bold text-pink-700 mb-2 cursor-pointer"
          onClick={() => setMostrarOrden(!mostrarOrden)}
        >
          ORDENAR POR PRECIO {mostrarOrden ? "▲" : "▼"}
        </h3>
        {mostrarOrden && (
          <div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="orden-asc"
                name="orden"
                value="asc"
                checked={ordenSeleccionado === "asc"}
                onChange={handleOrdenChange}
                className="mr-2"
              />
              <label htmlFor="orden-asc" className="text-sm text-pink-700">
                Menor a mayor
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="orden-desc"
                name="orden"
                value="desc"
                checked={ordenSeleccionado === "desc"}
                onChange={handleOrdenChange}
                className="mr-2"
              />
              <label htmlFor="orden-desc" className="text-sm text-pink-700">
                Mayor a menor
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Botón para reiniciar filtros */}
      <button
        onClick={reiniciarFiltros}
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Reiniciar filtros
      </button>
    </div>
  );
}