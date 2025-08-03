'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

type Cafeteria = {
  nombre: string
  coords: [number, number]
}

type Props = {
  cafeterias: Cafeteria[]
}

export default function MapaLeaflet({ cafeterias }: Props) {
  const bahiaBlanca: [number, number] = [-38.7196, -62.2724]

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer center={bahiaBlanca} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cafeterias.map((cafe, i) => (
          <Marker key={i} position={cafe.coords}>
          <Popup>
            <div className="p-4 max-w-xs">
              <h3 className="text-lg font-bold mb-2">{cafe.nombre}</h3>
              <p>Esta es una cafetería destacada en Bahía Blanca.</p>
              <button
                className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => alert(`Visitar ${cafe.nombre}`)}
              >
                Más info
              </button>
            </div>
          </Popup>
        </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
