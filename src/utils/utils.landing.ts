import {assets} from "./utils.assets";
import {landing} from  "../utils/types";
import {headingSizes} from "../utils/Utils.fontSize";
import "./utils.scss";
const contrastLightHeadingCss:string = `${headingSizes.hLanding} text-sky-900`
const contrastLightcontentCss:string = `${headingSizes.h1} text-sky-800`;
const contrastDarkcontentCss:string = `${headingSizes.h1} text-sky-100`;
const contrastDarkHeadingCss:string = `${headingSizes.hLanding} text-sky-100`;
const contrastLightContainerCss:string = `main123 bg-sky-100 justify-between px-[9rem] py-[9rem]`;
const contrastDarkContainerCss:string = `main123 dark bg-sky-900 justify-between px-[9rem] py-[9rem]`;
export const LandingDetails:Array<landing> = [
    {
        src : assets.lan_block_certi,
        srcProps : {className : "w-[46rem]"},
        heading : "BlockCerti",
        headingProps : {className : contrastLightHeadingCss},
        content : "Best place for save and secure your achievements",
        contentProps : {className : contrastLightcontentCss},
        containerProps : {className :contrastLightContainerCss}
    },
    
    {
        src : assets.lan_user_fiendly,
        srcProps : {className : "w-[46rem]"},
        heading : "User Friendly",
        headingProps : {className : contrastDarkHeadingCss},
        content : "",
        contentProps : {className : contrastDarkcontentCss},
        containerProps : {className : contrastDarkContainerCss}
    },
    {
        src : assets.lan_validate,
        srcProps : {className : "w-[46rem]"},
        heading : "Validate your achievements",
        headingProps : {className : contrastLightHeadingCss},
        content : "Ensure authenticity of the e-certificates and eliminating usage of fake Certificates",
        contentProps : {className : contrastLightcontentCss},
        containerProps : {className :contrastLightContainerCss}
    },
    {
        src : assets.lan_access,
        srcProps : {className : "w-[46rem]"},
        heading : "Access from anywhere and anytime",
        headingProps : {className : contrastDarkHeadingCss},
        content : "Only you can control over your achievement visibility. Encryption over your achievements.",
        contentProps : {className : contrastDarkcontentCss},
        containerProps : {className : contrastDarkContainerCss}
    },
    {
        src : assets.lan_share,
        srcProps : {className : "w-[46rem]"},
        heading : "Share your achievements",
        headingProps : {className : contrastLightHeadingCss},
        content : "Direct Email integration with issuer and receiver",
        contentProps : {className : contrastLightcontentCss},
        containerProps : {className :contrastLightContainerCss}
    },
    {
        src : assets.lan_secure,
        srcProps : {className : "w-[46rem]"},
        heading : "Secure your achievements",
        headingProps : {className : contrastDarkHeadingCss},
        content : "We provide blockchain based high level security, and data privacy with encrypted records.",
        contentProps : {className : contrastDarkcontentCss},
        containerProps : {className : contrastDarkContainerCss}
    },
    
]