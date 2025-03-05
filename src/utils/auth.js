// src/utils/auth.js
import { v4 as uuidv4 } from 'uuid'

export const getOrCreateUserId = () => {
  let userId = localStorage.getItem('pollUserId')
  
  if (!userId) {
    userId = uuidv4() // Usa a biblioteca UUID
    localStorage.setItem('pollUserId', userId)
  }
  
  return userId
}