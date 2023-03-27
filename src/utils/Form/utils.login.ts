import { Login } from "../types";
import { helper, getCss } from "../../utils/utils.helper";
import {PrimaryText} from "../utils.primaryColor";
import { stylings } from "../../utils/utils.css";
import { verifiers } from "../verifier"
const primaryInputCss = stylings.primaryInputCssForLoginSignup;
const level0Stylings = stylings.level0PrimaryCssForLoginSignup;
export const loginDetails = (
  details: Login,
  setDetails: React.Dispatch<React.SetStateAction<Login>>
) => {
  return [
    {
      type: "text",
      label: "Email",
      id: "log_email",
      labelProps: {
        className: stylings.primaryLabelCss,
        id: "label_log_email",
        htmlFor: "log_email",
      },
      fieldContainerProps: {
        className: level0Stylings,
      },
      value: details.email,
      className: primaryInputCss,
      onFocus: (e: { target: { id: string, value: string } }) => helper.focus(e),
      onBlur: (e: { target: { id: string, value: string } }) => helper.blur(e),
      onChange: (e: { target: { value: string } }) => {
        setDetails({ ...details, email: e.target.value });
        helper.checkValForLabel(e);
        getCss(verifiers.isEmail, e);
      },
    },
    {
      type: "password",
      label: "Password",
      id: "log_password",
      labelProps: {
        className: stylings.primaryLabelCss,
        id: "label_log_password",
        htmlFor: "log_password",
      },
      fieldContainerProps: {
        className: level0Stylings,
      },
      className: primaryInputCss,
      
      value: details.password,
      onFocus: (e: { target: { id: string, value: string } }) => helper.focus(e),
      onBlur: (e: { target: { id: string, value: string } }) => helper.blur(e),
      onChange: (e: { target: { value: any } }) => {
        setDetails({ ...details, password: e.target.value });
        helper.checkValForLabel(e);
        getCss(verifiers.isPassword, e);
      },
    },
    {
      type: "textLabel",
      labelProps: { className: `text-[1.3rem] ${PrimaryText[900]} font-semibold cursor-pointer top-[-1rem] absolute` },
      label: "Forgot password ?",
      route: "/forgot",
      textLabelContainerProps: { className: "relative w-full h-[0] items-start" }
    },
    // {
    //   type: "textLabel",
    //   labelProps: { className: `text-[1.5rem] font-semibold cursor-pointer ${PrimaryText[900]} textLabel` },
    //   label: "Create Account ?",
    //   route: "/signup",
    //   textLabelContainerProps: { className: "relative w-full h-[0] items-start" }
    // }
  ];
};
