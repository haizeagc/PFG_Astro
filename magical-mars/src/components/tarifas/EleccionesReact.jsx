import React, { useState } from 'react';

export default function EleccionesReact() {
  const [minutosSeleccionados, setMinutosSeleccionados] = useState("100"); // Estado para los minutos seleccionados
  const [fibraSeleccionada, setFibraSeleccionada] = useState("600 Mb"); // Estado para la fibra seleccionada

  const handleMinutosChange = (minutos) => {
    setMinutosSeleccionados(minutos); // Actualiza el estado con el minuto seleccionado
  };

  const handleFibraChange = (fibra) => {
    setFibraSeleccionada(fibra); // Actualiza el estado con la fibra seleccionada
  };

  // Calcula el precio total basado en las opciones seleccionadas
  const calcularPrecioTotal = () => {
    let precioBase = 10; // Precio base
  
    // Incrementa el precio según la fibra seleccionada
    if (fibraSeleccionada === "1 GB") precioBase += 20;
  
    // Incrementa el precio según los minutos seleccionados
    if (minutosSeleccionados === "200 GB") precioBase += 12;
    else if (minutosSeleccionados === "300 GB") precioBase += 15;
    else if (minutosSeleccionados === "GB Ilimitados") precioBase += 30;
  
    return precioBase;
  };

  return (
    <div className="flex flex-col justify-center items-center my-8">
    {/* Título principal */}
    <h2 className="text-3xl font-bold mb-4">CONFIGURA TU TARIFA FIBRA Y MÓVIL</h2>
  
    {/* Contenedor del formulario */}
    <div className="w-auto h-auto p-4 shadow-md bg-pink-200 text-center">
      <form className="flex flex-col gap-8 items-center">
        {/* Contenedor de fibra, minutos, precio y botón en la misma fila */}
        <div className="flex flex-row gap-8 items-center">
          {/* Selección de fibra con botones */}
          <div>
            <label className="block text-xl font-bold mb-2">Velocidad de fibra</label>
            <div className="p-4 bg-white rounded-full shadow-md font-bold">
              <div className="flex gap-2">
                {["600 Mb", "1 GB"].map((fibra) => (
                  <button
                    key={fibra}
                    type="button"
                    onClick={() => handleFibraChange(fibra)}
                    className={`px-4 py-2 rounded-full ${
                      fibraSeleccionada === fibra
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {fibra}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Selección de minutos con botones */}
          <div>
            <label className="block text-xl font-bold mb-2">Línea móvil principal</label>
            <div className="p-4 bg-white rounded-full shadow-md font-bold">
              <div className="flex gap-2">
                {["200 GB", "300 GB", "GB Ilimitados"].map((minutos) => (
                  <button
                    key={minutos}
                    type="button"
                    onClick={() => handleMinutosChange(minutos)}
                    className={`px-4 py-2 rounded-full ${
                      minutosSeleccionados === minutos
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {minutos}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
        {/* Precio total y botón de contratar */}
<div className="flex flex-col items-center gap">
  {/* Precio total */}
  <div className="mb-4">
    <div className="p-4 bg-white rounded-lg shadow-md font-bold">
    <span className="text-5xl text-pink-500 font-bold">{calcularPrecioTotal()}</span>
    <span className="text-sm text-gray-600">,00€/mes</span>
      <label className="block text-sm font-medium mb-2">Precio final</label>
    </div>
  </div>

  {/* Botón de contratar */}
  <div>
    <button className="px-6 py-2 bg-pink-500 text-white font-bold rounded hover:bg-pink-600">
      Contratar
    </button>
  </div>
</div>
        </div>
      </form>
    </div>
  </div>
  );
}