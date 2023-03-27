import { helper, getCss } from "../../utils/utils.helper";
import { stylings } from "../../utils/utils.css";
import { forgotPassword } from "../types";
import { toast } from "react-toastify";
import { ApiHelper } from "../ApiHelper";
import { verifiers } from "../verifier"
const primaryInputCss = stylings.primaryInputCssForLoginSignup;
const level0Stylings = stylings.level0PrimaryCssForLoginSignup;
export const forgotPassDetails = (details: forgotPassword, setDetails: React.Dispatch<React.SetStateAction<forgotPassword>>) => {
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
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isEmail, e);
				setDetails({ ...details, email: e.target.value });
			},
		},
		{
			type: "button",
			label: `${details.isOTPSend ? "Resend OTP" : "Send OTP"}`,
			id: "verify",

			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: stylings.primaryButtonCssDark,
			onClick: async () => {
				if (details.email == "") {
					toast.error("add email to resend");
					return;
				}
				const { data, error, loaded } = await ApiHelper("auth/OTPinit", { email: details.email, isLink: true }, ["email"]);
				if (loaded) {
					if (error) {
						toast.error(error.data.message);
						return;
					}
					if (data) {
						setDetails({ ...details, isOTPSend: true });
						toast.success("OTP sent successfully");
					}
				}
			},
		},
		{
			type: "password",
			label: "OTP",
			id: "log_otp",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_log_otp",
				htmlFor: "log_otp",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.OTP,
			disabled: !details.isOTPSend,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: number } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: number } }) => helper.blur(e),
			onChange: (e: { target: { value: number } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isOTP, e);
				setDetails({ ...details, OTP: e.target.value });
			},
		},
		{
			type: "button",
			label: "Verify OTP",
			id: "verifiy OTP",
			disabled: !details.isOTPSend,
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: stylings.primaryButtonCssDark,
			onClick: async () => {
				if (details.OTP == "") {
					toast.error("add valid OTP");
					return;
				}
				const { data, error, loaded } = await ApiHelper("auth/OTPverify", { email: details.email, OTP: details.OTP }, ["email"]);
				if (loaded) {
					if (error) {
						toast.error(error.data.message);
						return;
					}
					if (data) {
						setDetails({ ...details, isOTPSend: true, isOTPValid: true });
						toast.success("OTP verfied");
					}
				}
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
			value: details.password,
			className: primaryInputCss,
			disabled: !details.isOTPSend || !details.isOTPValid,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, password: e.target.value });
			},
		},

		// {
		// 	type: "textLabel",
		// 	labelProps: { className: "text-[1.5rem] font-semibold cursor-pointer text-sky-900 textLabel" },
		// 	label: "Already Have An Account ?",
		// 	route: "/login",
		// 	textLabelContainerProps: { className: "relative w-full h-[0] items-start" },
		// },
	];
};
