import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import QRCode from 'react-qr-code'

export default function PollList() {
  const [polls, setPolls] = useState([])
  const baseUrl = import.meta.env.VITE_DINAMIQ_API_URL || 'http://localhost:3000'

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await axios.get(`${baseUrl}/polls`)
      setPolls(data)
    }
    fetchPolls()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Todas as Enquetes</h1>

        <div className="grid gap-6">
          {polls.map(poll => (
            <div
              key={poll.token}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-700">{poll.title}</h2>
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
                    <span>{option.content}</span>
                    <span className="font-medium text-primary">
                      {option.votes_count} votos
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to={`/polls/${poll.token}`}
                className="mt-4 inline-block text-primary hover:text-secondary"
              >
                Ver página completa →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}