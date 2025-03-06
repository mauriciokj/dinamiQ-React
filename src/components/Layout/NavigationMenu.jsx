// src/components/NavigationMenu.jsx
import { Link } from 'react-router-dom'

export default function NavigationMenu() {
  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Nova Enquete
            </Link>
            <Link
              to="/polls-list"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Todas Enquetes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}