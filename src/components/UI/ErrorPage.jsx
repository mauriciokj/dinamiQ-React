
import { useRouteError } from 'react-router-dom'

export default function ErrorPage({ errorCode = 500 }) {
  const error = useRouteError() || {}
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        {errorCode} - {error.statusText || error.message}
      </h1>
      <p className="text-gray-600">
        {errorCode === 404 
          ? "A página que você está procurando não existe."
          : "Ocorreu um erro inesperado."}
      </p>
    </div>
  )
}