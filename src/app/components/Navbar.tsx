'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#6F4E37] text-white px-4 md:px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg md:text-xl font-semibold tracking-wide">Taza x taza</Link>

        {/* Boton mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex gap-6 text-sm md:text-base">
          <Link href="/" className="hover:underline hover:opacity-90 transition">Inicio</Link>
          <Link href="/productos" className="hover:underline hover:opacity-90 transition">Ruta cafetera</Link>
          <Link href="/ventas" className="hover:underline hover:opacity-90 transition">Opiniones</Link>
        </div>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="items-center text-center md:hidden mt-3 flex flex-col gap-3 px-4 text-sm">
          <Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link href="/productos" className="hover:underline" onClick={() => setIsOpen(false)}>Ruta cafetera</Link>
          <Link href="/ventas" className="hover:underline" onClick={() => setIsOpen(false)}>Opiniones</Link>
        </div>
      )}
    </nav>
  )
}
