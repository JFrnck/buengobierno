import React from 'react';
import { Link } from 'react-router-dom';

// Supongamos que esta data viene de una API o un archivo JSON
const diputadosData = [
  { id: 1, nombre: "Jehú Pezo", slug: "jehu-pezo", distrito: "Distrito 1" },
  { id: 2, nombre: "Ricardo Méndez", slug: "ricardo-mendez", distrito: "Distrito 2" },
];

export default function DiputadosPage() {
  return (
    <div className="container mx-auto pt-24 px-4">
      <h1 className="text-4xl font-bold mb-8">Nuestros Candidatos a Diputados</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {diputadosData.map((diputado) => (
          <div key={diputado.id} className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">{diputado.nombre}</h2>
            <p className="text-gray-600 mb-4">{diputado.distrito}</p>
            
            {/* Aquí generamos la ruta dinámica */}
            <Link 
              to={`/diputados/${diputado.slug}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Ver perfil
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}