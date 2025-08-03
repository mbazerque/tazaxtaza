'use client'

import dynamic from 'next/dynamic'

const MapaLeaflet = dynamic(() => import('./MapaLeaflet'), { ssr: false })

const cafeterias: { nombre: string; coords: [number, number] }[] = [
  { nombre: 'Capitanes', coords: [-38.71191873649844, -62.26113853327672] },
  { nombre: 'Bulgaro', coords: [-38.71382852803722, -62.26163354516562] },
  { nombre: 'Ancona Alsina', coords: [-38.715407488418, -62.2613211605071] },

]


export default function MapaClient() {
  return <MapaLeaflet cafeterias={cafeterias} />
}
