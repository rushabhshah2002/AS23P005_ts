import { headingSizes } from "./Utils.fontSize";
import { ShowProfipleInst } from "./types";
import { stylings } from "./utils.css";
import {PrimaryBG} from "./utils.primaryColor";
const coustomInputCss = `${PrimaryBG[900]} text-white w-full py-[0.4rem] px-[1rem] rounded-lg ${headingSizes.h5}`;
const customLabelCss = `${headingSizes.h5}`;

export const profileInst = (details: ShowProfipleInst) => {
	return [
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Institute Name",
			value: details.instituteName,

			labelProps: { className: customLabelCss, labelup: false },
			className: coustomInputCss,
		},
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Institute Email",
			value: details.instituteEmail,
			labelProps: { className: customLabelCss, labelup: false },
			className: coustomInputCss,
		},
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Identification Type",
			value: details.identificationType,
			labelProps: { className: customLabelCss, labelup: false },
			className: coustomInputCss,
		},
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Identification Number",
			value: details.identificationNumber,
			labelProps: { className: customLabelCss, labelup: false },
			className: coustomInputCss,
		},
		{
			fieldContainerProps: { className: stylings.level0PrimaryCss },
			type: "text",
			label: "Representative Email",
			value: details.representativeEmail,
			labelProps: { className: customLabelCss, labelup: false },
			className: coustomInputCss,
		},
	];
};
