import { SetStateAction } from "react";
import { verfiyForm } from "./types";
import { stylings } from "./utils.css";
import { helper, getCss } from "./utils.helper";
import { verifiers } from "./verifier"
export const verifyUtils = (details: verfiyForm, setDetails: React.Dispatch<SetStateAction<verfiyForm>>) => {
	return [
		{
			type: "text",
			label: "Email",
			id: "verify_email",
			readOnly: true,
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_verify_email",
				htmlFor: "verify",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.email,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
		},

		{
			type: "password",
			label: "OTP",
			id: "verify_password",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_verify_password",
				htmlFor: "verify",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.OTP,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { id: string; value: number } }) => {
				setDetails({ ...details, OTP: e.target.value });
				helper.checkValForLabel(e);
				getCss(verifiers.isOTP, e);
			},
		},
	];
};
