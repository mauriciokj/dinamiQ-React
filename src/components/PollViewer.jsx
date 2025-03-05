import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createConsumer } from '@rails/actioncable'
import QRCode from 'react-qr-code'
import LiveResults from './LiveResults'
import axios from 'axios'
import { getOrCreateUserId } from '../utils/auth'

export default function PollViewer() {
  const { token } = useParams()
  const [pollData, setPollData] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const userId = getOrCreateUserId()

  // Verifica o voto atual do usuário
  const checkVote = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/polls/${token}/check_vote`, {
        params: { user_uid: userId }
      })
      setSelectedOption(data.option_id)
    } catch (error) {
      console.error('Erro ao verificar voto:', error)
    }
  }

  // Carrega os dados iniciais da enquete
  useEffect(() => {
    const loadPollData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/polls/${token}`)
        setPollData({
          ...data,
          options: data.options.sort((a, b) => a.id - b.id)
        })
        await checkVote()
      } catch (error) {
        console.error('Erro ao carregar enquete:', error)
      }
    }

    loadPollData()
  }, [token])

  // Configura a conexão WebSocket
  useEffect(() => {
    const cable = createConsumer('ws://localhost:3000/cable')
    
    const subscription = cable.subscriptions.create(
      { channel: 'PollChannel', token },
      {
        received: async (newOptions) => {
          // Atualiza os dados mantendo a ordem correta
          setPollData(prev => ({
            ...prev,
            options: newOptions.sort((a, b) => a.id - b.id)
          }))
          // Verifica novamente o voto após atualização
          await checkVote()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
      cable.disconnect()
    }
  }, [token])

  // Manipula o envio de votos
  const handleVote = async (optionId) => {
    try {
      await axios.post(`http://localhost:3000/polls/${token}/vote`, {
        option_id: optionId,
        user_uid: userId
      })
      // Atualização otimista do estado
      setSelectedOption(optionId)
    } catch (error) {
      console.error('Erro ao votar:', error)
      // Recarrega os dados em caso de erro
      const { data } = await axios.get(`http://localhost:3000/polls/${token}`)
      setPollData(data)
    }
  }

  if (!pollData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {pollData.title}
          </h1>
          
          {/* QR Code */}
          <div className="mx-auto w-fit p-3 bg-white rounded-lg shadow-md">
            <QRCode 
              value={`${window.location.origin}/polls/${pollData.token}`}
              size={180}
              className="rounded"
            />
          </div>
        </div>

        {/* Gráfico de Resultados */}
        <div className="mb-8">
          <LiveResults options={pollData.options} />
        </div>

        {/* Opções de Voto */}
        <div className="space-y-4">
          {pollData.options.map(opt => (
            <button 
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={selectedOption === opt.id}
              className={`
                w-full p-4 text-left rounded-xl transition-all 
                border-2 flex justify-between items-center
                ${selectedOption === opt.id
                  ? 'border-primary bg-primary/10 cursor-default'
                  : 'border-gray-200 hover:border-primary hover:bg-gray-50'}
              `}
            >
              <span className="font-medium text-gray-700">{opt.content}</span>
              
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {opt.votes_count} votos
                </span>
                {selectedOption === opt.id && (
                  <span className="text-green-500 text-sm">✓ Seu voto</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}