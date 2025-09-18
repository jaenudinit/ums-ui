// utils/token.js
export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (err) {
    console.warn('Read token is failed:', err);
    return true;
  }
}