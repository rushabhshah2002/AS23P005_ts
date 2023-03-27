import { createContext } from "react";
export interface Token {
  token: string;
}
export const tokenContext = createContext<any>({
  token: "",
});