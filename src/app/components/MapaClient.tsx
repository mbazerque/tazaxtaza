'use client'

import dynamic from 'next/dynamic'
import { Cafeteria } from './MapaLeaflet'

const MapaLeaflet = dynamic(() => import('./MapaLeaflet'), { ssr: false })

const cafeterias: Cafeteria[] = [
  {
    nombre: 'Capitanes',
    coords: [-38.71191873649844, -62.26113853327672],
    direccion: 'Sarmiento 505, Bahia Blanca',
    calificacion: 5,
    imagenUrl: '/images/capitanes.jpeg',
    horario: 'Lun a Sab 7-20hs ',
    infaltable: 'Sanguche sando',
    comentario: 'Muy rico cafe'
  },
  {
    nombre: 'Búlgaro',
    coords: [-38.71382852803722, -62.26163354516562],
    direccion: 'Zapiola 15, Bahia Blanca',
    calificacion: 5,
    imagenUrl: '/images/bulgaro.jpg'
  },
  {
    nombre: 'Ancona Alsina',
    coords: [-38.715407488418, -62.2613211605071],
    direccion: 'Alsina 330, Bahia Blanca',
    calificacion: 4,
    imagenUrl: '/images/alsina.jpg',
    horario: 'Lun a Sab 7-20hs ',
    infaltable: 'No podes no probar la cookie de pistacho',
    comentario: 'Todo es rico'
  },
]

export default function MapaClient() {
  return <MapaLeaflet cafeterias={cafeterias} />
}
