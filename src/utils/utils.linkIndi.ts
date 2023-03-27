import { SetStateAction } from "react";
import { ApiHelper } from "./ApiHelper";
import { Linkaccount } from "./types";
import { stylings } from "./utils.css";
import { getCss, helper } from "./utils.helper";
import { verifiers } from "./verifier";

export const linkUtils = (details: Linkaccount, setDetails: React.Dispatch<SetStateAction<Linkaccount>>, toast: any) => {
	return [
		{
			type: "text",
			label: "Email (Master Account)",
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
			type: "text",
			label: "Enter Link Email (Sub)",
			id: "link_email",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_link_email",
				htmlFor: "link_email",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.slaveEmail,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { id: string; value: string } }) => {
				getCss(verifiers.isEmail, e);
				setDetails({ ...details, slaveEmail: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "button",
			label: `${details.viewOTP ? "Resend OTP" : "Send OTP"}`,
			id: "verify",

			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: stylings.primaryButtonCssDark,
			onClick: async () => {
				if (!verifiers.isEmail(details.slaveEmail)) {
					{
						toast.error("Please fill the email correctly");
						return;
					}
				}
				if (details.slaveEmail == "" || details.slaveEmail == details.email) {
					toast.error("Please Enter email or enter valid email to link");
					return;
				}
				const { data, error, loaded } = await ApiHelper("auth/OTPinit", { email: details.slaveEmail, isLink: true }, ["email"]);
				if (loaded) {
					if (error) {
						toast.error(error.data.message);
						return;
					}
					if (data) {
						setDetails({ ...details, viewOTP: true });
						toast.success("OTP sent successfully");
					}
				}
			},
		},
		{
			type: "password",
			label: "OTP",
			id: "verify_password",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_verify_password",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.OTP,
			className: stylings.primaryInputCssForLoginSignup,
			disabled: !details.viewOTP,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { id: string; value: number } }) => {
				getCss(verifiers.isOTP, e);
				setDetails({ ...details, OTP: e.target.value });
				helper.checkValForLabel(e);
			},
		},
	];
};
