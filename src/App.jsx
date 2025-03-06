// App.jsx
import { RouterProvider } from 'react-router-dom'
import { VotingProvider } from './context/VotingContext'
import router from './router'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <VotingProvider>
      <RouterProvider router={router} />
      <Toaster />
    </VotingProvider>
  )
}