import React, { useState } from "react";
import FiltroSidebar from "./Filtro.jsx"; // Importa el componente de filtro
import TelefonoDato from "./TelefonoDato.jsx"; // Importa el componente de datos de teléfonos

export default function Telefono() {
  // Estado para los filtros
  const [filtros, setFiltros] = useState({ marca: [], almacenamiento: [], orden: "" });

  // Función para actualizar los filtros
  const handleFilterChange = (nuevosFiltros) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      ...nuevosFiltros,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Filtro a la izquierda */}
      <div className="md:col-span-1">
        <FiltroSidebar onFilterChange={handleFilterChange} />
      </div>

      {/* TeléfonoDato a la derecha */}
      <div className="md:col-span-3">
        <TelefonoDato filtros={filtros} />
      </div>
    </div>
  );
}