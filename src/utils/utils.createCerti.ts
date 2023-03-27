import { dataEnteredInterface } from "./types";
import { stylings } from "./utils.css";
import { getCss, helper } from "./utils.helper";
import { verifiers } from "./verifier";
export const issueDetailsForCerti = (details: dataEnteredInterface, setDetails: React.Dispatch<React.SetStateAction<dataEnteredInterface>>) => {
	return [
		{
			type: "text",
			label: "Institute Email",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCssForLoginSignup,
			},
			value: details.core.instituteEmail,
			className: stylings.primaryInputCssForLoginSignup,
			readOnly: true,
		},
		{
			type: "text",
			label: "Representative  Email",
			labelProps: {
				className: `${stylings.primaryLabelCss} labelUp`,
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCssForLoginSignup,
			},
			value: details.core.repEmail,
			className: stylings.primaryInputCssForLoginSignup,
			readOnly: true,
		},
		{
			type: "text",
			label: "Receiver Email",
			id: "inst_create_certi_receiverEmail",
			labelProps: {
				className: stylings.primaryLabelCss,
				id: "label_inst_create_certi_receiverEmail",
				htmlFor: "inst_create_certi_receiverEmail",
			},
			fieldContainerProps: {
				className: stylings.level0PrimaryCssForLoginSignup,
			},
			value: details.core.recEmail,
			className: stylings.primaryInputCssForLoginSignup,
			onFocus: (e: { target: { value: string } }) => helper.focus(e),
			onBlur: (e: { target: { value: string } }) => helper.blur(e),
			onChange: (e: { target: { value: string } }) => {
				getCss(verifiers.isEmail, e);
				setDetails({
					...details,
					core: { ...details.core, recEmail: e.target.value },
				});
				helper.checkValForLabel(e);
			},
		}, ,
	]
}