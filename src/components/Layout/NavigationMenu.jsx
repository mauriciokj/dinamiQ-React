// src/components/NavigationMenu.jsx
import { Link } from 'react-router-dom'
import logoImage from '../../assets/logo.png' // Importando a imagem

export default function NavigationMenu() {
  return (
    <nav className="bg-[#c7d9dc] shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center mr-4">
              <img 
                src={logoImage} 
                alt="Populiz Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Links de navegação */}
            <Link
              to="/"
              className="text-gray-800 hover:text-primary hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Nova Enquete
            </Link>
            <Link
              to="/polls-list"
              className="text-gray-800 hover:text-primary hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Todas Enquetes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}