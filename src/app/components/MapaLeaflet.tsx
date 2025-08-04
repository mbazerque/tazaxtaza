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
  calificacion?: number
  imagenUrl?: string
}

type Props = {
  cafeterias: Cafeteria[]
}

// Fix para ícono de marcador (Leaflet no lo carga por defecto en Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
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

  const closeModal = () => {
    setSelectedCafe(null)
  }

  if (!isMounted) return null // Evita renderizar hasta que esté montado el mapa

  return (
    <> 
      <MapContainer center={[-38.717566560786, -62.26548562681884]} zoom={16} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cafeterias.map((cafe, i) => (
          <Marker 
            key={i} 
            position={cafe.coords}
            eventHandlers={{
              click: () => handleMarkerClick(cafe)
            }}
          />
        ))}
      </MapContainer>

      {/* Modal personalizado */}
      {selectedCafe && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          {/* Overlay con efecto de difuminado */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
            style={{ zIndex: 9999 }}
          />
          
          {/* Modal */}
          <div 
            className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden"
            style={{ zIndex: 10000 }}
          >
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>

            {/* Contenido del modal */}
            <div className="w-full overflow-hidden text-left">
              {selectedCafe.imagenUrl && (
                <div className="w-full h-48">
                  <img
                    src={selectedCafe.imagenUrl}
                    alt={`Foto de ${selectedCafe.nombre}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="font-bold text-blue-600 text-xl mb-2">{selectedCafe.nombre}</h2>

                {selectedCafe.direccion && (
                  <p className="text-gray-600 mb-3">{selectedCafe.direccion}</p>
                )}

                {typeof selectedCafe.calificacion === 'number' && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) =>
                      j < (selectedCafe.calificacion ?? 0) ? (
                        <FaStar key={j} className="text-yellow-500" />
                      ) : (
                        <FaRegStar key={j} className="text-yellow-500" />
                      )
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      ({selectedCafe.calificacion}/5)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
