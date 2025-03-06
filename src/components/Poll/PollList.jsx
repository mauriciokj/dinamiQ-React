import { useEffect, useState, useTransition, useDeferredValue } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import QRCode from 'react-qr-code'
import LoadingSpinner from '../UI/LoadingSpinner'

export default function PollList() {
  const [polls, setPolls] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()
  const baseUrl = import.meta.env.VITE_DINAMIQ_API_URL || 'http://localhost:3000'

  const deferredSearchTerm = useDeferredValue(searchTerm)

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/polls`)
        const formattedPolls = data.map(poll => ({
          ...poll,
          options: poll.options?.sort((a, b) => a.id - b.id) || []
        }))
        setPolls(formattedPolls)
      } catch (err) {
        setError(err.response?.data?.error || 'Erro ao carregar enquetes')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPolls()
  }, [baseUrl])

  const filteredPolls = polls.filter(poll =>
    poll.title.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )

  const handleSearch = (e) => {
    startTransition(() => {
      setSearchTerm(e.target.value)
    })
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Todas as Enquetes</h1>

        {/* Campo de busca otimizado */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
          {isPending && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin h-5 w-5 border-t-2 border-primary rounded-full"></div>
            </div>
          )}
        </div>

        {filteredPolls.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {searchTerm ? 
              "Nenhuma enquete encontrada com esse termo" : 
              "Nenhuma enquete criada ainda"}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredPolls.map(poll => (
              <div
                key={poll.token}
                className={`bg-white rounded-xl shadow-md p-6 transition-opacity ${
                  isPending ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {poll.title}
                  </h2>
                  <div className="bg-white p-1 rounded shadow">
                    <QRCode
                      value={`${window.location.origin}/polls/${poll.token}`}
                      size={60}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {poll.options.map(option => (
                    <div
                      key={option.id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="text-gray-700">{option.content}</span>
                      <span className="font-medium text-primary">
                        {option.votes_count} votos
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/polls/${poll.token}`}
                  className="mt-4 inline-block text-primary hover:text-secondary transition-colors"
                >
                  Ver página completa →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}