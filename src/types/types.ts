export interface PersonInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  photo?: string;
}

export type UpdatedDetails = {
  updatedDetails: PersonInterface;
};
