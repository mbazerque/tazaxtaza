'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { FaStar, FaRegStar, FaTimes } from 'react-icons/fa'

export type Cafeteria = {
  nombre: string
  coords: [number, number]
  direccion?: string
  horario?: string
  infaltable?: string
  comentario?: string
  calificacion?: number
  imagenUrl?: string
}

type Props = {
  cafeterias: Cafeteria[]
}

// Crear icono personalizado con tamaño modificado
const customIcon = new L.Icon({
  iconUrl: '/images/pin.png',
  iconRetinaUrl: '/images/pin.png',
  iconSize: [80, 80], // [ancho, alto] en píxeles
  popupAnchor: [0, -32], // punto donde aparece el popup
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
})

export default function MapaLeaflet({ cafeterias }: Props) {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCafe, setSelectedCafe] = useState<Cafeteria | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMarkerClick = (cafe: Cafeteria) => {
    setSelectedCafe(cafe)
  }

  const closeCard = () => {
    setSelectedCafe(null)
  }

  if (!isMounted) return null

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[600px] rounded-lg overflow-hidden shadow-md relative">
      {/* Mapa */}
      <div className="w-full h-[400px] md:flex-1 md:h-full md:ml-72">
        <MapContainer
          center={[-38.717566560786, -62.26548562681884]}
          zoom={16}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cafeterias.map((cafe, i) => (
            <Marker
              key={i}
              position={cafe.coords}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(cafe),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Menú lateral izquierdo - Desktop */}
      <div className="hidden md:block absolute top-0 left-0 z-[10000] bg-white/90 backdrop-blur-sm shadow-md h-full w-72 overflow-y-auto p-4">
        <h3 className="font-bold text-lg mb-4 text-gray-700">Cafeterías</h3>
        <ul className="space-y-4">
          {cafeterias.map((cafe, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => handleMarkerClick(cafe)}
                className="flex items-center w-full text-left p-3 space-x-4"
              >
                <img
                  src={cafe.imagenUrl || '/placeholder.jpg'}
                  alt={cafe.nombre}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{cafe.nombre}</h4>
                  <p className="text-sm text-gray-600">{cafe.direccion}</p>
                  {typeof cafe.calificacion === 'number' && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) =>
                        j < (cafe.calificacion ?? 0) ? (
                          <FaStar key={j} className="text-yellow-500" />
                        ) : (
                          <FaRegStar key={j} className="text-yellow-500" />
                        )
                      )}
                      <span className="ml-2 text-sm text-gray-600">
                        ({cafe.calificacion}/5)
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Menú inferior - Mobile */}
      <div className="md:hidden bg-white shadow-md p-4 max-h-[400px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4 text-gray-700">Cafeterías</h3>
        <ul className="space-y-4">
          {cafeterias.map((cafe, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => handleMarkerClick(cafe)}
                className="flex items-center w-full text-left p-3 space-x-4"
              >
                <img
                  src={cafe.imagenUrl || '/placeholder.jpg'}
                  alt={cafe.nombre}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{cafe.nombre}</h4>
                  <p className="text-sm text-gray-600">{cafe.direccion}</p>
                  {typeof cafe.calificacion === 'number' && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) =>
                        j < (cafe.calificacion ?? 0) ? (
                          <FaStar key={j} className="text-yellow-500" />
                        ) : (
                          <FaRegStar key={j} className="text-yellow-500" />
                        )
                      )}
                      <span className="ml-2 text-sm text-gray-600">
                        ({cafe.calificacion}/5)
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Card lateral derecha */}
      {selectedCafe && (
        <aside
        className={`
          rounded-lg w-80 bg-white shadow-xl p-5 overflow-auto fixed right-4 z-[11000]
          top-[80px] h-[600px]
          transition-transform duration-1000 ease-in-out
          ${selectedCafe ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
        `}
      >
        <button
          onClick={closeCard}
          className="text-gray-500 hover:text-gray-900 mb-4 float-right"
          aria-label="Cerrar card"
        >
          <FaTimes size={20} />
        </button>
      
        {selectedCafe && (
          <>
            <h2 className="text-xl text-gray-500 font-semibold mb-2">{selectedCafe.nombre}</h2>
      
            {selectedCafe.imagenUrl && (
              <img
                src={selectedCafe.imagenUrl}
                alt={`Foto de ${selectedCafe.nombre}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
      
            {selectedCafe.direccion && (
              <p className="text-gray-600 mb-3">{selectedCafe.direccion}</p>
            )}
      
            {selectedCafe.horario && (
              <p className="text-gray-600 mb-3">{selectedCafe.horario}</p>
            )}
      
            {selectedCafe.infaltable && (
              <p className="text-gray-600 mb-3">{selectedCafe.infaltable}</p>
            )}
      
            {selectedCafe.comentario && (
              <p className="text-gray-600 mb-3">{selectedCafe.comentario}</p>
            )}
          </>
        )}
      </aside>
      )}
    </div>
  )
}
