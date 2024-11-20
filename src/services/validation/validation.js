export const EMAIL_VALIDATION = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email format',
  },
};
export const PASSWORD_VALIDATION = {
  required: 'password is required',
};
