import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PollCreator() {
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(['', ''])
  const navigate = useNavigate()
  // Variável de ambiente para URL da API
  const baseUrl = import.meta.env.VITE_DINAMIQ_API_URL || 'http://localhost:3000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(`${baseUrl}/polls`, {
      poll: { title, options_attributes: options.filter(o => o).map(content => ({ content })) }
    }, {
      withCredentials: true
    })
    navigate(`/polls/${data.token}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Criar Nova Enquete</h1>

        <input
          className="w-full mb-4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
          placeholder="Título da enquete"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-3">
          {options.map((opt, i) => (
            <input
              key={i}
              className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-primary transition-colors"
              placeholder={`Opção ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...options]
                newOptions[i] = e.target.value
                setOptions(newOptions)
              }}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setOptions([...options, ''])}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            + Adicionar Opção
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors"
          >
            Criar Enquete
          </button>
        </div>
      </form>
    </div>

  )
}