const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email.trim());
}
