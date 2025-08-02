// src/utils/validators.js
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function validatePassword(pw) {
  return pw.length >= 8 && /\d/.test(pw);
}
