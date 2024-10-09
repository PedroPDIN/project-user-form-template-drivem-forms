import { IAddressPlaceholder } from "./address-placeholder.interface";
import { ICompanyPlaceholder } from "./company-placeholder.interface";

export interface IUserPlaceholder {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddressPlaceholder;
  phone: string;
  website: string;
  company: ICompanyPlaceholder;
}
