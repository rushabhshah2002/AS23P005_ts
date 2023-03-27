import { userDetailsDashboardIndi, uploadCertiIndiInterface, userDetailsIndi } from "../utils/types";
import { helper, getCss } from "./utils.helper";
import { PrimaryBG, PrimaryBorder } from "./utils.primaryColor"
import { stylings } from "./utils.css";
import { headingSizes } from "./Utils.fontSize";
import { verifiers } from "./verifier";
import React from "react";
const coustomInputCss = `${PrimaryBG[900]} text-white w-full py-[0.4rem] px-[1rem] rounded-lg ${headingSizes.h5}`;
const labelStylings = `${stylings.primaryLabelCss} labelUp`;
export const dashboardIndiUtil = (details: userDetailsDashboardIndi) => {
	return [
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Email",
			value: details.email,

			labelProps: { className: `${headingSizes.h5}`, labelup: false },
			className: coustomInputCss,
			// labelProps :
		},
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Phone Number",
			value: details.phoneNo,
			labelProps: { className: `${headingSizes.h5}`, labelup: false },
			className: coustomInputCss,
			// labelProps :
		},
	];
};
export const editProfileUtil = (details: userDetailsIndi, setDetails: React.Dispatch<React.SetStateAction<userDetailsIndi>>) => {
	return [
		{
			type: "text",
			label: "Name",
			id: "indi_edit_name",
			labelProps: {
				className: labelStylings,
				id: "label_indi_edit_name",
				htmlFor: "indi_edit_name",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.name,
			className: stylings.primaryInputCssForLoginSignup,
			readOnly: true,
		},
		{
			type: "text",
			label: "Email",
			labelProps: {
				className: labelStylings,
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: stylings.primaryInputCssForLoginSignup,
			value: details.email,
			readOnly: true,
		},
		{
			value: details.phoneNo,
			type: "Number",
			label: "Phone Number",
			id: "indi_edit_phone",
			labelProps: {
				className: `${labelStylings}`,
				id: "label_indi_edit_phone",
				htmlFor: "indi_edit_phone",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				setDetails({ ...details, phoneNo: e.target.value });
				getCss(verifiers.isPhone, e);
			},
		},
	];
};
const uploadCertiUtil = (details: uploadCertiIndiInterface, setDetails: React.Dispatch<React.SetStateAction<uploadCertiIndiInterface>>) => {
	return [
		{
			type: "text",
			label: "Alias",
			id: "indi_upload_certi_Alias",
			labelProps: {
				className: `${stylings.primaryLabelCss}`,
				id: "label_indi_upload_certi_Alias",
				htmlFor: "indi_upload_certi_Alias",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.alias,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isAlias, e);
				setDetails({ ...details, alias: e.target.value });
			},
		},
		{
			type: "file",
			label: "Certificate Image ",
			placeholder: "Enter Certificate Image",
			labelBoxProp: {
				className:
					`inputLabelForm  text-[1.7rem] text-center flex items-center border-b-[1px] bg-transparent ${PrimaryBorder[900]} py-[0.5rem] px-[1.5rem] rounded-none`,
			},
			labelProps: {
				className: labelStylings,
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details?.frontCertiImg?.filename,
			className: stylings.primaryInputCssForLoginSignup,
			file: details.frontCertiImg,
			onChange: async (e: { target: { files: File[] } }) => {
				setDetails({
					...details,

					frontCertiImg: e.target.files[0],
					dataUrl: String(await helper.fileToBase64(e.target.files[0])),
				});
			},
		},
		{
			type: "date",
			label: "Date",
			id: "indi_upload_certi_date",
			labelProps: {
				className: labelStylings,
				id: "label_indi_upload_certi_date",
				htmlFor: "indi_upload_certi_date",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.date,
			className: stylings.primaryInputCssForLoginSignup,
			onChange: (e: { target: { value: string } }) => {
				helper.getCss(verifiers.isDate, e);
				setDetails({ ...details, date: e.target.value });
			},
		},
		{
			type: "text",
			label: "Remarks",
			id: "indi_upload_certi_remarks",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_indi_upload_certi_remarks",
				htmlFor: "indi_upload_certi_remarks",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.remarks,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				setDetails({ ...details, remarks: e.target.value });
				helper.checkValForLabel(e);
			},
		},
	];
};
export const dashboardIndiUtils = {
	dashboardIndiUtil,
	editProfileUtil,
	uploadCertiUtil,
};
export const updateAlias = (
	details: { CID: string; alias: string },
	setDetails: React.Dispatch<React.SetStateAction<{ CID: string; alias: string }>>
) => {
	return [
		{
			type: "text",
			label: "CID",
			id: "CID",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_CID",
				htmlFor: "CID",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.CID,
			className: stylings.primaryInputCssForLoginSignup,
			readOnly: true,
		},

		{
			type: "text",
			label: "Alias",
			id: "alias1",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
				id: "label_alias1",
				htmlFor: "alias1",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCss,
			},
			value: details.alias,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { id: string; value: string } }) => helper.focus(e),
			onBlur: (e: { target: { id: string; value: string } }) => helper.blur(e),
			onChange: (e: { target: { id: string; value: string } }) => {
				helper.checkValForLabel(e);
				getCss(verifiers.isAlias, e);
				setDetails({ ...details, alias: e.target.value });
			},
		},
	];
};
