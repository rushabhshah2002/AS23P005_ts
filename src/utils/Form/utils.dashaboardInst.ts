import { UploadCertificateInstitute, subChannelInterface, editProfileAddRepInterface } from "../types";
import { getCss, helper } from "../../utils/utils.helper";
import { stylings } from "../../utils/utils.css";
import { verifiers } from "../verifier";

const primaryInputCss = stylings.primaryInputCssForLoginSignup;
const level0Stylings = stylings.level0PrimaryCssForLoginSignup;

export const dashboardInstDetails = (
	details: UploadCertificateInstitute,
	setDetails: React.Dispatch<React.SetStateAction<UploadCertificateInstitute>>
) => {
	return [
		{
			type: "text",
			label: "Institute Email",
			id: "log_instEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_instEmail",
				htmlFor: "log_instEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.instituteEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Representative Email",
			id: "log_repEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_repEmail",
				htmlFor: "log_repEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.representativeEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Receiver Email",
			id: "log_recEmail",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_log_recEmail",
				htmlFor: "log_recEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.receiverEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isEmail, e);
				setDetails({ ...details, receiverEmail: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "file",
			label: "Certificate Image ",
			placeholder: "Enter Certificate Image",
			labelBoxProp: {
				className:
					"inputLabelForm  text-[1.7rem] text-center flex items-center border-b-[1px] bg-transparent border-sky-900 py-[0.5rem] px-[1.5rem] rounded-none",
			},
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_repEmail",
				htmlFor: "log_repEmail",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details?.certificateImage?.filename,
			className: stylings.primaryInputCssForLoginSignup,
			file: details.certificateImage,
			onChange: async (e: { target: { files: File[] } }) => {
				setDetails({
					...details,
					certificateImage: e.target.files[0],
					dataUrl: String(await helper.fileToBase64(e.target.files[0])),
				});
			},
		},
		,
		{
			type: "text",
			label: "Degree",
			id: "log_degree",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_log_degree",
				htmlFor: "log_degree",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.degree,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isAlias, e);
				setDetails({ ...details, degree: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "number",
			label: "CGPA",
			id: "log_cgpa",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_log_cgpa",
				htmlFor: "log_cgpa",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.CGPA,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isCGPA, e);
				setDetails({ ...details, CGPA: e.target.value });
				helper.checkValForLabel(e);
			},
		},
	];
};

export const addSubChannelUtil = (details: subChannelInterface, setDetails: React.Dispatch<React.SetStateAction<subChannelInterface>>) => {
	return [
		{
			type: "text",
			label: "Affiliated Email",
			id: "inst_add_channel_affiliatedEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_inst_add_channel_affiliatedEmail",
				htmlFor: "inst_add_channel_affiliatedEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.affiliatedEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Institute Email",
			id: "inst_add_channel_instituteEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_instituteEmail",
				htmlFor: "inst_add_channel_instituteEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.instituteEmail,
			className: primaryInputCss,
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
			label: "Institute Name",
			id: "inst_add_channel_instituteName",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_instituteName",
				htmlFor: "inst_add_channel_instituteName",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.instituteName,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isName, e);
				setDetails({ ...details, instituteName: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "text",
			label: "Identification Type",
			id: "inst_add_channel_identificationType",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_identificationType",
				htmlFor: "inst_add_channel_identificationType",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.identificationType,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				setDetails({ ...details, identificationType: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "number",
			label: "Identification Number",
			id: "inst_add_channel_identificationNumber",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_identificationNumber",
				htmlFor: "inst_add_channel_identificationNumber",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.identificationNumber,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				setDetails({ ...details, identificationNumber: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "text",
			label: "Representative Email",
			id: "inst_add_channel_representativeEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_representativeEmail",
				htmlFor: "inst_add_channel_representativeEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.representativeEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isEmail, e);
				setDetails({ ...details, representativeEmail: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "text",
			label: "Representative Name",
			id: "inst_add_channel_representativeName",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_representativeName",
				htmlFor: "inst_add_channel_representativeName",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.representativeName,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isName, e);
				setDetails({ ...details, representativeName: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "number",
			label: "Representative Phone No.",
			id: "inst_add_channel_representativePhoneNo",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_representativePhoneNo",
				htmlFor: "inst_add_channel_representativePhoneNo",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.representativePhoneNo,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isPhone, e);
				setDetails({ ...details, representativePhoneNo: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "password",
			label: "Password",
			id: "inst_add_channel_password",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_inst_add_channel_password",
				htmlFor: "inst_add_channel_password",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.password,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, password: e.target.value });
				helper.checkValForLabel(e);
			},
		},
	];
};
export const profileInstDetails = (
	details: editProfileAddRepInterface,
	setDetails: React.Dispatch<React.SetStateAction<editProfileAddRepInterface>>
) => {
	return [
		{
			type: "text",
			label: "Institute Name",
			id: "log_instituteNamel",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_instituteName",
				htmlFor: "log_instituteName",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.instituteName,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Identification Type",
			id: "log_identificationType",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_identificationType",
				htmlFor: "log_identificationType",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.identificationType,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Identification Number",
			id: "log_identificationNumber",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_identificationNumber",
				htmlFor: "log_identificationNumber",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.identificationNumber,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Institute Email",
			id: "log_instituteEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_instituteEmail",
				htmlFor: "log_instituteEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.instituteEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "Representative Email",
			id: "log_representativeEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_log_representativeEmail",
				htmlFor: "log_representativeEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.representativeEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			readOnly: true,
		},
		{
			type: "text",
			label: "New Representative Email",
			id: "log_newRepresentativeEmail",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_log_newRepresentativeEmail",
				htmlFor: "log_newRepresentativeEmail",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.repEmail,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isEmail, e);
				setDetails({ ...details, repEmail: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "text",
			label: "New Representative Name",
			id: "log_newRepresentativeName",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_log_newRepresentativeName",
				htmlFor: "log_newRepresentativeName",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.repName,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isName, e);
				setDetails({ ...details, repName: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "number",
			label: "New Representative Phone No.",
			id: "log_newRepresentativePhoneNo",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_log_newRepresentativePhoneNo",
				htmlFor: "log_newRepresentativePhoneNo",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.repPhoneNo,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isPhone, e);
				setDetails({ ...details, repPhoneNo: e.target.value });
				helper.checkValForLabel(e);
			},
		},
		{
			type: "password",
			label: "Password",
			id: "log_password",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_log_password",
				htmlFor: "log_password",
			},
			fieldContainerProps: {
				className: level0Stylings,
			},
			value: details.repPassword,
			className: primaryInputCss,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: any } }) => {
				getCss(verifiers.isPassword, e);
				setDetails({ ...details, repPassword: e.target.value });
				helper.checkValForLabel(e);
			},
		},
	];
};
