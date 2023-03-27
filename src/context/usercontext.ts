import { createContext } from "react";
export interface User {
  email: string;
  name: string;
  type: string;
  instituteEmail?: string;
}
export const userContext = createContext<any>({
  email: "",
  password: "",
  name: "",
  type: "",
  instituteEmail: "",
});
