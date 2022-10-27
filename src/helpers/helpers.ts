export const validateEmail = (email: string): boolean => {
  const regEx = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
  const matchingEmail = email.match(regEx);

  return matchingEmail ? true : false;
};
