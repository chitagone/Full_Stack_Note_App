// validation email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// validation password
export const validatePassword = (password) => {
  return password.length >= 6;
};
