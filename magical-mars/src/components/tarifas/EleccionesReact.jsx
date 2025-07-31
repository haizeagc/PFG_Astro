import React, { useState } from 'react';

export default function EleccionesReact() {
  const [minutosSeleccionados, setMinutosSeleccionados] = useState(100); // Estado para los minutos seleccionados
  const [datosSeleccionados, setDatosSeleccionados] = useState(5); // Estado para los GB seleccionados

  // Función para manejar la selección de minutos
  const handleMinutosSeleccion = (minutos) => {
    setMinutosSeleccionados(minutos);
  };

  // Función para manejar el cambio en el slider de datos
  const handleDatosChange = (event) => {
    setDatosSeleccionados(parseInt(event.target.value, 10));
  };

  return (
    <div className="w-full max-w-screen-lg p-6 bg-pink-200 rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-pink-700">Crea tu propia tarifa</h1>
      <form className="flex justify-between items-center gap-8">
        {/* Selección de minutos */}
        <div className="flex flex-col space-y-2 w-1/3">
          <label className="block font-bold text-pink-700">Minutos:</label>
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              className={`px-4 py-2 rounded border ${
                minutosSeleccionados === 100 ? 'bg-pink-500 text-white' : 'bg-white text-pink-700'
              } hover:bg-pink-600 hover:text-white`}
              onClick={() => handleMinutosSeleccion(100)}
            >
              100 minutos
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded border ${
                minutosSeleccionados === 200 ? 'bg-pink-500 text-white' : 'bg-white text-pink-700'
              } hover:bg-pink-600 hover:text-white`}
              onClick={() => handleMinutosSeleccion(200)}
            >
              200 minutos
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded border ${
                minutosSeleccionados === 300 ? 'bg-pink-500 text-white' : 'bg-white text-pink-700'
              } hover:bg-pink-600 hover:text-white`}
              onClick={() => handleMinutosSeleccion(300)}
            >
              300 minutos
            </button>
          </div>
        </div>

        {/* Selección de datos */}
        <div className="flex flex-col space-y-2 w-1/3 text-center">
          <label htmlFor="datos" className="font-bold text-pink-700">
            Datos: <span id="datos-valor">{datosSeleccionados}</span> GB
          </label>
          <input
            id="datos"
            type="range"
            min="5"
            max="20"
            step="5"
            value={datosSeleccionados}
            className="w-full accent-pink-500"
            onChange={handleDatosChange}
          />
        </div>

        {/* Botón para enviar */}
        <div className="flex justify-center w-1/3">
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
            Crear Tarifa
          </button>
        </div>
      </form>
    </div>
  );
}