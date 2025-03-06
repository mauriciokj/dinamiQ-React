// context/VotingContext.js
import { createContext, useContext, useReducer } from 'react'
import { votingReducer } from '../utils/votingReducer'

const VotingContext = createContext()

const initialState = {
  polls: [],
  votesHistory: [],
  currentVotes: {}
}

export const VotingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(votingReducer, initialState)

  return (
    <VotingContext.Provider value={{ state, dispatch }}>
      {children}
    </VotingContext.Provider>
  )
}

export const useVoting = () => useContext(VotingContext)