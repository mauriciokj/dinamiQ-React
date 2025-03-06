// components/Layout/UndoNotification.jsx
import { useEffect } from 'react'
import { useVoting } from '../../context/VotingContext'
import toast from 'react-hot-toast'

export const UndoNotification = () => {
  const { state, dispatch } = useVoting()

  useEffect(() => {
    const lastAction = state.votesHistory[state.votesHistory.length - 1]

    if (lastAction?.type === 'VOTE') {
      const toastId = toast(
        <div>
          Voto registrado!
          <button
            onClick={() => {
              dispatch({ type: 'UNDO_VOTE', payload: lastAction })
              toast.dismiss(toastId)
            }}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            Desfazer
          </button>
        </div>,
        { duration: 5000 }
      )
    }
  }, [state.votesHistory])

  return null
}