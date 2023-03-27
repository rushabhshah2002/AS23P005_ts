import { SignUpInd, SignUpInst } from "../types";
import { stylings } from "../../utils/utils.css";
import { helper, getCss } from "../utils.helper";
import { assets } from "../../utils/utils.assets";
import { verifiers } from "../verifier";
import { toast } from "react-toastify";
const level0Stylings = `${stylings.level0PrimaryCssForLoginSignup}`;
const primaryInputCss = `${stylings.primaryInputCssForLoginSignup}`;
export const signupDetailsInd = (
	details: SignUpInd,
	setDetails: React.Dispatch<React.SetStateAction<SignUpInd>>,
	_userType: string,
	setUserType: React.Dispatch<React.SetStateAction<string>>
) => {
	return [
		{
			type: "toggle",
			buttons: ["Individual", "Institute"],
			toogleOnCss: stylings.primaryToggleOnCss,
			toogleOffCss: stylings.primaryToggleOffCss,
			currForm: _userType,
			onClick: (e: { target: { innerText: string } }) => {
				if (e.target.innerText === "Individual") {
					setUserType("Individual");
				} else {
					setUserType("Institute");
				}
			},
		},

		{
			type: "text",
			label: "Name",
			id: "ind_sign_name",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_ind_sign_name",
				htmlFor: "ind_sign_name",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.name,
			className: primaryInputCss,

			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isName, e);
				setDetails({ ...details, name: e.target.value });
			},
		},
		{
			type: "text",
			label: "Email",
			id: "ind_sign_email",
			fieldContainerProps: {
				className: level0Stylings,
			},
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_ind_sign_email",
				htmlFor: "ind_sign_email",
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
			type: "number",
			label: "Phone Number",
			value: details.phoneNo,
			id: "ind_sign_phoneNo",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_ind_sign_phoneNo",
				htmlFor: "ind_sign_phoneNo",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPhone, e);
				setDetails({ ...details, phoneNo: e.target.value });
			},
		},
		{
			type: "password",
			label: "Password",
			value: details.password,
			id: "ind_sign_password",
			fieldContainerProps: {
				className: level0Stylings,
			},
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_ind_sign_password",
				htmlFor: "ind_sign_password",
			},
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, password: e.target.value });
			},
		},
		{
			type: "password",
			label: "Confirm Password",
			id: "ind_sign_confirmPassword",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_ind_sign_confirmPassword",
				htmlFor: "ind_sign_confirmPassword",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.confirmPassword,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, confirmPassword: e.target.value });
			},
		},
		{
			type: "checkbox",
			className : "styled-checkbox",
			label: "I agree to the terms and conditions",
			labelProps : {className : "text-[1.5rem]"},
			href: assets.PDF,
			containerProps: { className: "flex items-center gap-x-[1rem]" },
			onChange: (e: { target: { checked: boolean } }) => {
				setDetails({ ...details, terms: e.target.checked });
			},
		},
		// {
		// 	type: "textLabel",
		// 	labelProps: { className: `text-[1.5rem] font-semibold cursor-pointer ${PrimaryText[900]} textLabel` },
		// 	label: "Already have an account ?",
		// 	route: "/login",
		// 	textLabelContainerProps: { className: "relative w-full h-[0] items-start" },
		// },
	];
};

export const signupDetailsRep = (
	details: SignUpInst,
	setDetails: React.Dispatch<React.SetStateAction<SignUpInst>>,
	_stage: number,
	setStage: React.Dispatch<React.SetStateAction<number>>
) => {
	return [
		{
			type: "text",
			label: "Name",
			id: "inst_sign_name",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_name",
				htmlFor: "inst_sign_name",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.name,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isName, e);
				setDetails({ ...details, name: e.target.value });
			},
		},
		{
			type: "text",
			label: "Email",
			id: "inst_sign_rep_email",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_rep_email",
				htmlFor: "inst_sign_rep_email",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
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
			type: "number",
			label: "Phone Number",
			id: "inst_sign_rep_phone",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_rep_phone",
				htmlFor: "inst_sign_rep_phone",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: primaryInputCss,

			value: details.phoneNo,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPhone, e);
				setDetails({ ...details, phoneNo: e.target.value });
			},
		},
		{
			type: "password",
			value: details.password,
			label: "Password",
			id: "inst_sign_rep_password",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_rep_password",
				htmlFor: "inst_sign_rep_password",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, password: e.target.value });
			},
		},
		{
			type: "password",
			className: primaryInputCss,
			label: "Confirm Password",
			id: "inst_sign_rep_confirmPassword",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_rep_confirmPassword",
				htmlFor: "inst_sign_rep_confirmPassword",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.confirmPassword,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, confirmPassword: e.target.value });
			},
		},
		{
			type: "button",
			buttonType: "img",
			buttonSrc: assets.Right,
			imgClassName: "w-[4rem]",
			className: `${stylings.primaryButtonCssDark} p-x-[3rem]  bg-transparent`,
			label: "Back",
			onClick: () => {
				setStage(0);
			},
		},
		{
			type: "checkbox",
			label: "I agree to the terms and conditions",
			href: assets.PDF,
			containerProps: { className: "flex items-center gap-x-[1rem]" },
			onChange: (e: { target: { checked: boolean } }) => {
				setDetails({ ...details, terms: e.target.checked });
			},
		},
	];
};

export const signupDetailsInst = (
	details: SignUpInst,
	setDetails: React.Dispatch<React.SetStateAction<SignUpInst>>,
	_userType: string,
	setUserType: React.Dispatch<React.SetStateAction<string>>,
	_stage: number,
	setStage: React.Dispatch<React.SetStateAction<number>>
) => {
	return [
		{
			type: "toggle",
			buttons: ["Individual", "Institute"],
			containerProps: { className: "toggle bg-white mt-[10px] flex rounded-lg" },
			toogleOnCss: stylings.primaryToggleOnCss,
			toogleOffCss: stylings.primaryToggleOffCss,
			currForm: _userType,
			onClick: (e: { target: { innerText: string } }) => {
				if (e.target.innerText === "Individual") {
					setUserType("Individual");
				} else {
					setUserType("Institute");
				}
			},
		},
		{
			type: "text",
			label: "Institute Name",
			id: "inst_sign_instituteName1",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_instituteName1",
				htmlFor: "inst_sign_instituteName1",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: primaryInputCss,

			value: details.instituteName,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isName, e);
				setDetails({ ...details, instituteName: e.target.value });
			},
		},
		{
			type: "text",
			label: "Institute Email",
			id: "inst_sign_instituteEmail",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_instituteEmail",
				htmlFor: "inst_sign_instituteEmail",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: primaryInputCss,
			value: details.instituteEmail,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isEmail, e);
				setDetails({ ...details, instituteEmail: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "text",
			label: "Identification Type",
			id: "inst_sign_instituteIdentificationType",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_instituteIdentificationType",
				htmlFor: "inst_sign_instituteIdentificationType",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: primaryInputCss,
			value: details.instituteIdentificationType,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isName, e);
				setDetails({ ...details, instituteIdentificationType: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "number",
			value: details.instituteIdentification,
			label: "Identification Number",
			id: "inst_sign_instituteIdentificationNumber",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_sign_instituteIdentificationNumber",
				htmlFor: "inst_sign_instituteIdentificationNumber",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				setDetails({ ...details, instituteIdentification: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "button",
			label: "Next",
			buttonType: "img",
			buttonSrc: assets.Right,
			imgClassName: "w-[4rem]",
			className: `${stylings.primaryButtonCssDark} p-x-[3rem] rotate-180 bg-transparent float-right nextBtn`,
			onClick: () => {
				if (verifiers.isName(details.instituteName) && verifiers.isEmail(details.instituteEmail)) {
					setStage(1);
				} else {
					toast.error("Please fill all the fields correctly");
				}
			},
		},
	];
};
