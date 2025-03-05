// src/components/PollViewer.jsx (versão corrigida)
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createConsumer } from '@rails/actioncable'
import QRCode from 'react-qr-code'
import LiveResults from './LiveResults'
import axios from 'axios'

export default function PollViewer() {
  const { token } = useParams()
  const [pollData, setPollData] = useState(null)

  useEffect(() => {
    const fetchPoll = async () => {
      console.log(token)
      const { data } = await axios.get(`http://localhost:3000/polls/${token}`)
      setPollData(data)
    }
    fetchPoll()

    // Conexão do Action Cable sem armazenar no estado
    const cable = createConsumer('ws://localhost:3000/cable')
    const subscription = cable.subscriptions.create(
      { channel: 'PollChannel', token },
      { received: (data) => setPollData(prev => ({ ...prev, options: data })) }
    )

    // Cleanup
    return () => {
      subscription.unsubscribe()
      cable.disconnect()
    }
  }, [token]) // Apenas token como dependência

  const handleVote = async (optionId) => {
    await axios.post(`http://localhost:3000/polls/${token}/vote`, { option_id: optionId })
  }

  if (!pollData) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{pollData.title}</h1>
        </div>
        <div className="flex justify-center items-center mb-6">
          <div className="bg-white p-2 rounded-lg shadow">
            <QRCode
              value={window.location.href}
              size={180}
              className="rounded"
            />
          </div>
        </div>


        <div className="mb-8">
          <LiveResults options={pollData.options} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pollData.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all
                        flex justify-between items-center"
            >
              <span className="font-medium text-gray-700">{opt.content}</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {opt.votes} votos
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}