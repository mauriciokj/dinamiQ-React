// src/utils/auth.js
export const getOrCreateUserId = () => {
  let userId = localStorage.getItem('pollUserId');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('pollUserId', userId);
  }
  return userId;
};