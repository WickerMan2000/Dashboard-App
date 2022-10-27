export interface PersonInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  photo?: string;
}

export interface InputContextInterface {
  person: PersonInterface;
  updatedPerson: UpdatedDetails;
  setPerson: (args: any) => {};
  setUpdatedPerson: (args: any) => {};
}

export interface LoadingContextInterface {
  isLoading: boolean;
  setIsLoading: (args: boolean) => {};
}

export interface FeedbackInterface {
  nameMessage: string;
  emailMessage: string;
  phoneMessage: string;
  ready: boolean;
}

export type UpdatedDetails = {
  updatedDetails: PersonInterface;
};
