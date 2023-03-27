import { stylings } from "./utils.css";
import { Props } from "./types";

const headingProps = {
	className: stylings.primaryHeadingCss,
};
const level1PrimaryProps = {
	className: stylings.level1PrimaryCss,
};
const level2PrimaryProps = {
	className: stylings.level2PrimaryCss,
};
const customLevel1PrimaryProps = 
{
	className : stylings.customLevel1PrimaryCss
}
const customLevel2PrimaryProps = 
{
	className : stylings.customLevel2PrimaryCss
}
const dynamicFormCssParentProps = 
{
	className : stylings.dynamicFormCssParentCss
}
const dynamicFormCssMasterProps = 
{
	className : stylings.dynamicFormCssMasterCss
}
export const props: Props = {
	headingProps,
	level1PrimaryProps,
	level2PrimaryProps,
	dynamicFormCssMasterProps,
	dynamicFormCssParentProps,
	customLevel2PrimaryProps,
	customLevel1PrimaryProps
};
