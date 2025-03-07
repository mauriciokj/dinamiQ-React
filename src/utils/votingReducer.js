
// utils/votingReducer.js
export const votingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      return {
        ...state,
        votesHistory: [
          ...state.votesHistory,
          {
            type: 'VOTE',
            pollId: action.payload.pollId,
            optionId: action.payload.optionId,
            timestamp: new Date().toISOString()
          }
        ],
        currentVotes: {
          ...state.currentVotes,
          [action.payload.pollId]: action.payload.optionId
        }
      }
      
    case 'UNDO_VOTE':
      return {
        ...state,
        votesHistory: state.votesHistory.slice(0, -1),
        currentVotes: {
          ...state.currentVotes,
          [action.payload.pollId]: undefined
        }
      }
      
    default:
      return state
  }
}