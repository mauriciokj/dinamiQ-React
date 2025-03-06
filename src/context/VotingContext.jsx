/* eslint-disable react-refresh/only-export-components */
// context/VotingContext.js

import { createContext, useReducer } from 'react'
import { votingReducer } from '../utils/votingReducer'

export const VotingContext = createContext()

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