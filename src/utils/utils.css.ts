import "./utils.scss";
import {PrimaryBG , PrimaryBorder , PrimaryText} from "./utils.primaryColor";
import {headingSizes} from "./Utils.fontSize";
const level2PrimaryCss = `p-[1rem] border-[0.1rem] relative ${PrimaryBorder[900]} ${PrimaryBG[50]} flex flex-col items-center h-fit gap-y-[2rem] w-[100%] rounded-lg`;
const level2PrimaryCssForLoginSignup = `level2PrimaryCssForLoginSignup p-[1rem] border-[0.2rem] relative ${PrimaryBorder[900]} bg-transparent flex flex-col items-center  gap-y-[2rem] w-[100%] rounded-lg`;
const level1PrimaryCss = `w-full flex flex-col h-full items-center gap-y-[2rem]`;
const level1PrimaryCssForLoginSignup = `level1PrimaryCssForLoginSignup w-[100%] flex flex-col h-full items-center`;
const level0PrimaryCss = ` w-full flex relative flex-col`;
const level0PrimaryCssForLoginSignup = ` w-full flex relative flex-col`;
const primaryLabelCss = `primaryLabelCss `;
const primaryInputCss = ` primaryInputCss bg-transparent border-[0.1rem] ${PrimaryBorder[900]} py-[0.5rem] px-[0.7rem] rounded-md ${PrimaryText[900]} w-[100%]`;
const customLevel2PrimaryCss = `p-[0rem] ${PrimaryBorder[900]} ${PrimaryBG[50]} flex flex-col items-center h-fit gap-y-[0rem] w-[100%] textControl`;
const customLevel1PrimaryCss = `customLevel1PrimaryCss w-full h-fit flex flex-col items-center w-full`;
const dynamicFormCssParentCss = ` border-t-[1px] gap-y-[1.3rem] flex flex-wrap justify-between border-slate-400 py-[2rem] w-full`;
const dynamicFormCssMasterCss = `dynamicFormCssMasterCss flex px-[1rem] flex-col-reverse items-center overflow-scroll gap-y-[2rem] w-full`;
const primaryInputCssForLoginSignup = ` primaryInputCss bg-transparent border-b-[0.1rem] ${PrimaryBorder[900]} py-[0.5rem] px-[1.5rem] rounded-none ${PrimaryText[900]} w-[100%]`;
const primaryHeadingCss = `${PrimaryText[900]} ${headingSizes.h2}`
const primaryToggleOnCss = `rounded-lg ${headingSizes.h5} p-[7px] px-[4rem] ${PrimaryBG[900]} text-white`;
const primaryToggleOffCss = `rounded-lg bg-white ${headingSizes.h5} p-[7px] px-[4rem]`;
const primaryButtonCssDark = `rounded-md ${headingSizes.h4} flex items-center justify-center gap-x-[0.3rem] ${PrimaryBG[900]} text-white py-[0.5rem] px-[1rem] text-center`
const primaryButtonCssWhite = `rounded-md ${headingSizes.h4} ${PrimaryBG[50]} ${PrimaryText[900]} py-[0.5rem] px-[1rem] text-center`

export const  stylings: {
	[x: string]: any;level0PrimaryCss:string , level1PrimaryCss:string , level2PrimaryCss:string , primaryLabelCss:string , primaryInputCss:string , primaryHeadingCss:string , primaryToggleOnCss:string ,primaryToggleOffCss : string , primaryButtonCssDark:string , primaryButtonCssWhite:string , level0PrimaryCssForLoginSignup : string , level1PrimaryCssForLoginSignup : string , level2PrimaryCssForLoginSignup : string , primaryInputCssForLoginSignup:string , dynamicFormCssMasterCss:string , dynamicFormCssParentCss:string , customLevel1PrimaryCss : string , customLevel2PrimaryCss : string
} = 
{
    level0PrimaryCss ,
    level1PrimaryCss,
    level2PrimaryCss,   
    primaryLabelCss,
    primaryInputCss,
    primaryHeadingCss,
    primaryToggleOnCss,
    primaryToggleOffCss,
    primaryButtonCssDark,
    primaryButtonCssWhite,
    level0PrimaryCssForLoginSignup,
    level1PrimaryCssForLoginSignup,
    level2PrimaryCssForLoginSignup,
    primaryInputCssForLoginSignup,
    dynamicFormCssMasterCss,
    dynamicFormCssParentCss,
    customLevel1PrimaryCss,
    customLevel2PrimaryCss
}