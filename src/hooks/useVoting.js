import { useContext } from 'react'
import { VotingContext } from '../context/VotingContext'

export const useVoting = () => useContext(VotingContext)
