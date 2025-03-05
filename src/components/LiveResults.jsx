// src/components/LiveResults.jsx
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// Paleta de cores pré-definida (12 cores distintas)
const COLOR_PALETTE = [
  '#4F46E5', // Azul
  '#10B981', // Verde
  '#F59E0B', // Amarelo
  '#EF4444', // Vermelho
  '#8B5CF6', // Roxo
  '#3B82F6', // Azul Claro
  '#06B6D4', // Ciano
  '#84CC16', // Lima
  '#F97316', // Laranja
  '#EC4899', // Rosa
  '#6366F1', // Índigo
  '#14B8A6'  // Turquesa
]

export default function LiveResults({ options }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  // Gerar cores baseado no índice da opção
  const getColor = (index) => {
    return COLOR_PALETTE[index % COLOR_PALETTE.length]
  }

  useEffect(() => {
    if (chartRef.current && options?.length) {
      if (chartInstance.current) chartInstance.current.destroy()
      
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: options.map(opt => opt.content),
          datasets: [{
            label: 'Votos',
            data: options.map(opt => opt.votes),
            backgroundColor: options.map((_, index) => getColor(index)),
            borderWidth: 0,
            borderRadius: 4
          }]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    }

    return () => chartInstance.current?.destroy()
  }, [options])

  return (
    <div>
      <canvas ref={chartRef} />
      
      {/* Loading State */}
      {!options?.length && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}