import { HtmlHTMLAttributes, HTMLProps } from "react";

export interface FormProps {
	headingProps?: HtmlHTMLAttributes;
	level1PrimaryProps?: HtmlHTMLAttributes;
	level2PrimaryProps?: HtmlHTMLAttributes;
	submitContainerProps?: HtmlHTMLAttributes;
	routeOptionsProps?: HtmlHTMLAttributes;
	mainContainerProps?: HtmlHTMLAttributes;
	fields: any;
	label: string | null | HTMLProps<HTMLDivElement>;
	routeOptionsContainerProps?: HtmlHTMLAttributes;
	isClicked?: boolean;
	onSubmit?: (e: any) => void;
	containerProps?: HTMLProps<HTMLDivElement>;
	fieldContainerProps?: HTMLProps<HTMLDivElement>;
	labelProps?: HTMLProps<HTMLLabelElement>;
	submitLabel?: string;
	submitProps?: HTMLProps<HTMLButtonElement>;
	onClose?: (e: any) => void;
	onBack?: (e: any) => void;
	secondaryBtnLabel?: string;
	secondaryBtnProps?: HTMLProps<HTMLButtonElement>;
	routeOptions?: { route: string; routeLabel: string };
	isPopup?: boolean;
}
export interface Field extends FieldTemplate {
	file: File | undefined;
	src: string | undefined;
	limit: number;
	inc: any;
	dec: any;
	fieldContainerProps: HTMLProps<HTMLDivElement>;
	totalFields?: {
		option: string[];
		onChange: (e: any) => void;
	};
	fieldTemplate?: FieldTemplate[];
}
export interface FieldTemplate {
	value: string;
	type: string;
	onChange: (e: any) => void;
	label: string;
}
export interface FileInputProps {
	file?: File;
	labelProps: HTMLProps<HTMLLabelElement>;
	inputProps: HTMLProps<HTMLInputElement>;
	containerProps: HTMLProps<HTMLDivElement>;
	primaryLabel: string;
	primaryLabelProps: HTMLProps<HTMLParagraphElement>;
	inputContainerProps: HTMLProps<HTMLDivElement>;
}
export interface MultiInputProps {
	fields: any;
	containerProps: HTMLProps<HTMLDivElement>;
	mainContainerProps: HTMLProps<HTMLDivElement>;
	iteration: number;
	trackLabel: string;
	labelProps: HTMLProps<HTMLPropElement>;
}
export interface Input extends HTMLProps<HTMLInputElement> {
	limit: number;
	totalFields: any;
	pr: any;
	fieldContainerProps: IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;
	css: any;
	label: string;
	labelProps: HTMLProps<HTMLLabelElement>;
	containerProps: HTMLProps<HTMLDivElement>;
}
export interface IncDecBtnsProps {
	count: number;
	containerProps: HTMLProps<HTMLDivElement>;
	incrementProps: HTMLProps<HTMLButtonElement>;
	decrementProps: HTMLProps<HTMLButtonElement>;
	labelContainerProps: HTMLProps<HTMLDivElement>;
	labelProps: HTMLProps<HTMLParagraphElement>;
	label: string;
	incrementLabel: string;
	decrementLabel: string;
	btnContainerProps: HTMLProps<HTMLDivElement>;
	countProps: HTMLProps<HTMLParagraphElement>;
}
export interface SelectInputProps {
	options: string[];
	label: string;
	labelProps: HTMLProps<HTMLLabelElement>;
	containerProps: HTMLProps<HTMLDivElement>;
	selectProps: HTMLProps<HTMLSelectElement>;
	optionProps: (index) => HTMLProps<HTMLOptionElement>;
}
export interface MultiSelectInputProps {
	iteration: number;
	options: string[];
	label: string;
	labelProps: HTMLProps<HTMLLabelElement>;
	containerProps: HTMLProps<HTMLDivElement>;
	selectProps: HTMLProps<HTMLSelectElement>;
	optionProps: (index) => void;
}
export interface Login {
	email: string;
	password: string;
}
export interface landing {
	src: string;
	srcProps: HtmlHTMLAttributes;
	heading: string;
	headingProps: HtmlHTMLAttributes;
	content: string;
	contentProps: HtmlHTMLAttributes;
	containerProps: HtmlHTMLAttributes;
}
export interface headings {
	h1: string;
	h2: string;
	h3: string;
	h4: string;
	h5: string;
	hLanding: string;
	hForTable: string;
}

export interface SignUpInd {
	name: string;
	email: string;
	phoneNo: string;
	password: string;
	confirmPassword: string;
	type: number;
	status: number;
	terms: boolean;
}

export interface SignUpInst extends SignUpInd {
	instituteName: string;
	instituteEmail: string;
	instituteIdentificationType: string;
	instituteIdentification: string;
}
export interface Props {
	headingProps: HtmlHTMLAttributes;
	level1PrimaryProps: HtmlHTMLAttributes;
	level2PrimaryProps: HtmlHTMLAttributes;
	dynamicFormCssMasterProps: HtmlHTMLAttributes;
	dynamicFormCssParentProps: HtmlHTMLAttributes;
	customLevel2PrimaryProps: HtmlHTMLAttributes;
	customLevel1PrimaryProps: HtmlHTMLAttributes;
}
export interface userDetailsDashboardIndi {
	email: string;
	name: string;
	password: string;
	phoneNo: string;
	statusFlag: number | string;
	type: number;
}

export interface userDetailsDashboardInst extends sideBarInterface {
	instituteEmail: string;
	instituteName: string;
	identificationType: string;
	identificationNumber: nunber;
	representativeEmail: string;
	representativeName: string;
	representativePhoneNo: number;
	passoward: string;
	type: number;
}

export interface sideBarInterface {
	id: number;
	action: React.Dispatch<React.SetStateAction<boolean>> | string | boolean;
	actionType: "route" | "update";
	label: string;
	src: string;
	className?: string;
}

export interface popupController {
	editProfile: React.Dispatch<React.SetStateAction<boolean>> | boolean;
	uploadCertificateInd: React.Dispatch<React.SetStateAction<boolean>> | boolean;
	uploadCertificateInst: React.Dispatch<React.SetStateAction<boolean>> | boolean;
}
export interface uploadCertiIndiInterface {
	email: string;
	frontCertiImg: any;
	dataUrl: string;
	alias: string;
	date: string;
	remarks: string;
}

export interface UploadCertificateInstitute {
	instituteEmail: string;
	representativeEmail: string;
	receiverEmail: string;
	certificateImage: string | file;
	dataUrl: string;
	degree: string;
	CGPA: string | "";
}
export interface editProfileInterface {
	name: string;
	email: string;
	phoneNo: number;
	password: string;
}

export interface ImageProps {
	src: string;
	name: string;
}

export interface TextDetails {
	text: string;
	type: "text";
	x: number;
	y: number;
	size: number;
	font: string;
	color: string;
	bold: boolean;
	italic: boolean;
	isCenter: boolean;
	alias: string;
}
export interface ImageDetails {
	src: string;
	type: "image";
	x: number;
	y: number;
	width: number;
	height: number;
	imageAlias: string;
	color: string;
}
export interface QRDetails {
	type: "qr";
	x: number | "";
	y: number | "";
}

export interface ShapeDetails {
	type: "shape";
	x: number;
	y: number;
	alias: string;
	radius: number;
	height: number;
	width: number;
	color: string;
	shapeAlias: string;
}

export interface ImageEditDetails {
	baseLink: string;
	preview: string;
	textCounter: number;
	imageCounter: number;
	shapeCounter: number;
	text: {
		[key: string]: TextDetails;
	};
	image: {
		[key: string]: ImageDetails;
	};
	qr: {
		[key: string]: QRDetails;
	};
	shape: {
		[key: string]: ShapeDetails;
	};
	meta: {
		alias?: string;
		type?: "meta";
		x?: number;
		y?: number;
		width?: number;
		height?: number;
	};
}

export interface editProfileInstInterface {
	instituteName: string;
	identificationType: string;
	identificationNumber: number | "";
	instituteEmail: string;
	representativeEmail: string;
}

export interface uploadCertiInstInterface {
	instituteEmail: string;
	representativeEmail: string;
	recEmail: string;
	frontCertiImg: File | string;
	name: string;
	degree: string;
	cgpa: number;
	dataUrl: string;
}

export interface textBounds {
	[key: string]: {
		width: number;
		height: number;
	};
}
export interface userDetailsIndi {
	isVerified?: boolean;
	email: string;
	name: string;
	password: string;
	phoneNo: string;
	statusFlag: number;
	type: number;
}

export interface subChannelInterface {
	affiliatedEmail: string;
	instituteEmail: string;
	instituteName: string;
	identificationType: string;
	identificationNumber: nunber;
	representativeEmail: string;
	representativeName: string;
	representativePhoneNo: string;
	password: string;
	type: number | "";
}

export interface verfiyForm {
	email: string;
	OTP: number | "";
}

export interface Linkaccount extends verfiyForm {
	slaveEmail: string;
	isSlaveVerified: boolean;
	viewOTP: boolean;
}
export interface statusI {
	status: boolean;
	link: string | null;
}

export interface getcertiIndi {
	CID: string;
	email: string;
	Link: string;
	VID: string;
	dateOfIssue: string;
	dateStamp: string;
	aliasName: string;
	remarks: string;
	date?: string;
}

export interface ShowProfipleInst {
	instituteName: string;
	identificationType: string;
	identificationNumber: number | "";
	instituteEmail: string;
	representativeEmail: string;
}

export interface editProfileAddRepInterface extends editProfileInstInterface {
	repEmail: string;
	repName: string;
	repPhoneNo: string;
	repPassword: string;
}

export interface ShowProfipleInst {
	instituteName: string;
	identificationType: string;
	identificationNumber: number | "";
	instituteEmail: string;
	representativeEmail: string;
}

export interface createCertiTemplateElements {
	//used
	certiTempId: string;
	instEmail: string;
	type: string;
	size?: number | string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	link: string;
	counter: number;
	alias: string;
	imageCounter: number;
	textCounter: number;
	tempCount: number;
	flag: string;
	val?: string;
	preview: string;
}
export interface groupOfElements {
	//used
	image: Array<createCertiTemplateElements>;
	meta: Array<createCertiTemplateElements>;
	qr: Array<createCertiTemplateElements>;
	shape: Array<createCertiTemplateElements>;
	text: Array<createCertiTemplateElements>;
}

export interface createCertiTemplateInterface {
	// used
	[key: string]: groupOfElements;
}
export interface currentlySelectedInterface {
	// used
	selectedTempData: groupOfElements | null;
	selected: boolean;
}
export interface dataEnteredInterface {
	core: {
		certiTempId: string;
		instituteEmail: string;
		repEmail: string;
		recEmail: string;
	};
	text: { [key: string]: createCertiTemplateElements & { val: string } } | null;
	image: { [key: string]: createCertiTemplateElements & { val: string } } | null;
	qr: any;
	meta: any;
}

export interface forgotPassword {
	email: string;
	OTP: number | "";
	isOTPSend: boolean;
	password: string;
	confirmPassword: string;
	isOTPValid: boolean;
}
export interface sideBarParamsInterface {
	desptopWidth: string;
	nonDesktopWidth: string;
	fields: Array<sideBarInterface>;
}
export interface soloeSlaveInterface {
	UID: string;
	email: string;
	isVerified: number;
	linkID: string;
	name: string;
	password: string;
	phoneNo: number;
	statusFlag: string;
	type: number;
}

export interface ourTemplatesInterface {
	asset_id: string;
	public_id: string;
	format: string;
	version: number;
	resource_type: string;
	type: string;
	created_at: string;
	byte: number;
	width: number;
	height: number;
}
