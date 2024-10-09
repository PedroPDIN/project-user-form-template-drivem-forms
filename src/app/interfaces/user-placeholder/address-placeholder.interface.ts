import { IGeoPlaceholder } from "./geo-placeholder.interface";

export interface IAddressPlaceholder {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoPlaceholder;
}
