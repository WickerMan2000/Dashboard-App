export interface PersonInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  photo?: string;
};

export interface InputContextInterface {
  person: PersonInterface;
  updatedPerson: UpdatedDetails;
  setPerson: (args: PersonInterface) => any;
  setUpdatedPerson: (args: UpdatedDetails) => any;
};

export interface LoadingContextInterface {
  isLoading: boolean;
  setIsLoading: (args: boolean) => any;
};

export interface FeedbackInterface {
  nameMessage: string;
  emailMessage: string;
  phoneMessage: string;
  ready: boolean;
};

export interface FeedbackEnhanced {
  feedback: FeedbackInterface;
  setFeedback: (args: FeedbackInterface) => any;
  validator: (value: PersonInterface) => void;
};

export type UpdatedDetails = {
  updatedDetails: PersonInterface;
};
