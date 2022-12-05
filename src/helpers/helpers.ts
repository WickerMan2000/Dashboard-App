import { CallBackFunction, ErrorFunction, PersonInterface } from "../types/types";

export const validateEmail = (email: string): boolean => {
  const regEx = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
  const matchingEmail = email.match(regEx);

  return matchingEmail ? true : false;
};

export const hasInput = (input: PersonInterface): boolean => {
  const values = Object.values(input);

  for (const value of values) {
    if (value) return true;
  }

  return false;
};

export const catchErrorFn = (errorFunction: ErrorFunction) => (callBackFn: CallBackFunction) => () =>
  callBackFn().catch((err: Error) => errorFunction(err));