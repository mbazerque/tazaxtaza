import MapaClient from './components/MapaClient'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1 px-5 sm:px-2 md:px-4 lg:px-0">
        <div className="w-full">
          <MapaClient />
        </div>
      </main>
      <Footer/>
    </div>
  )
}
