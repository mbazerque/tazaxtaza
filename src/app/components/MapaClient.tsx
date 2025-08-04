'use client'

import dynamic from 'next/dynamic'
import { Cafeteria } from './MapaLeaflet'

const MapaLeaflet = dynamic(() => import('./MapaLeaflet'), { ssr: false })



const cafeterias: Cafeteria[] = [
  {
    nombre: 'Capitanes',
    coords: [-38.71191873649844, -62.26113853327672],
    direccion: 'Sarmiento 505 ',
    calificacion: 5,
    imagenUrl: '/images/capitanes.jpeg'
  },
  {
    nombre: 'Búlgaro',
    coords: [-38.71382852803722, -62.26163354516562],
    direccion: 'Zapiola 15',
    calificacion: 5,
    imagenUrl: '/images/bulgaro.jpg'
  },
  {
    nombre: 'Ancona Alsina',
    coords: [-38.715407488418, -62.2613211605071],
    direccion: 'Alsina 330',
    calificacion: 4,
    imagenUrl: '/images/alsina.jpg'
  },
]

export default function MapaClient() {
  return <MapaLeaflet cafeterias={cafeterias} />
}
