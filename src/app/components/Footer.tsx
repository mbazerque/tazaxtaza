// app/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-[#6F4E37] border-t border-gray-200 mt-0">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Nombre del proyecto */}
          <div className="text-lg font-semibold text-gray-700">
            Taza x Taza
          </div>
  
          {/* Redes sociales */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="h"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M7.5 2C4.462 2 2 4.462 2 7.5v9C2 19.538 4.462 22 7.5 22h9c3.038 0 5.5-2.462 5.5-5.5v-9C22 4.462 19.538 2 16.5 2h-9zm0 2h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </a>
          </div>
  
          {/* Derechos reservados */}
          <div className="text-sm text-gray-400 mt-4 md:mt-0">
            © {new Date().getFullYear()} Taza x Taza. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    );
  }
  