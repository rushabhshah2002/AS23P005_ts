import { SetStateAction } from "react";
import { ImageEditDetails, textBounds } from "../types";
import { stylings } from "../utils.css";
import { headingSizes } from "../Utils.fontSize";
import { PrimaryBG } from "../utils.primaryColor";
const smallInputs:string = `shortInputs ${headingSizes.h5} p-[0.6rem] rounded-none border-b-[1px] border-black`;
const LableStylings:string = `${stylings.primaryLabelCss} labelUp  imageEditorLabel left-0`;
const ImageEditorControl = (
	currentCanvasControl: string,
	details: ImageEditDetails,
	setDetails: React.Dispatch<React.SetStateAction<ImageEditDetails>>
) => {
	switch (currentCanvasControl) {
		case "text":
			return [
				{
					type: "incdec",
					label: `Text Field : ${details.textCounter}`,
					labelProps: {
						className: `${headingSizes.h4} text-sky-900`,
					},
					btnContainerProps: {
						className: `flex w-full justify-center`,
					},
					fieldContainerProps: {
						className: `${stylings.level0PrimaryCss} items-center`,
					},
					inc: {
						label: "Add",
						className: `${stylings.primaryButtonCssDark} w-full py-[0.2rem]`,
						onClick: () => {
							setDetails({
								...details,
								textCounter: details.textCounter + 1,
								text: {
									...details.text,
									[details.textCounter + 1]: {
										text: "",
										x: 10,
										y: 30,
										size: 20,
										color: "#000000",
										font: "Arial",
										bold: false,
										italic: false,
										isCenter: true,
									},
								},
							});
						},
					},
					dec: {
						label: "Remove",
						className: `text-[1.4rem] hidden rounded-md text-white bg-sky-900 p-[0.6rem]`,
						onClick: () => {
							if (details.textCounter > 0) {
								delete details.text[details.textCounter];
								setDetails({
									...details,
									textCounter: details.textCounter - 1,
								});
							}
						},
					},
				},

				{
					type: "dynamic",
					limit: details.textCounter,
					trackLable: "Text Count : ",
					trackLabelCss: "text-[1.8rem]",
					totalFields: [
						{
							label: "X",
							type: "button",
							fieldContainerProps: {
								className: "form__field h-0 relative font-sans w-full",
							},
							className: "text-[1.5rem] bg-red-600 text-white top-[-4rem] right-0 py-[0.5rem] absolute px-[1.2rem] rounded-full float-right",
							onClick: (e: any) => {
								setDetails({
									...details,
									textCounter: details.textCounter - 1,
								});
								Object.keys(details.text).forEach((key: any) => {
									if (key === e.target.id) {
										delete details.text[key];
									}
									if (Number(key) > Number(e.target.id)) {
										details.text[Number(key - 1)] = details.text[key];
										delete details.text[key];
									}
								});
							},
						},
						{
							type: "text",
							label: "Text Field",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative w-full flex-col`,
							},
							className: `textFieldAliasIE w-[100%] ${headingSizes.h5} p-[0.6rem] bg-transparent rounded-none border-b-[1px] border-black`,
							onChange: (e: any) => {
								setDetails({
									...details,
									text: {
										...details.text,
										[e.target.id]: {
											...details.text[e.target.id],
											text: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.text[idx].text;
							},
						},
						{
							type: "number",
							label: "Horizontal",
							placeholder: "",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative  w-fit justify-end flex-col`,
							},
							className: smallInputs,
							onChange: (e: any) => {
								setDetails({
									...details,
									text: {
										...details.text,
										[e.target.id]: {
											...details.text[e.target.id],
											x: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.text[idx].x;
							},
						},
						{
							type: "number",
							label: "Vertical",
							placeholder: "",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative w-fit flex-col`,
							},
							className: smallInputs,
							onChange: (e: any) => {
								setDetails({
									...details,
									text: {
										...details.text,
										[e.target.id]: {
											...details.text[e.target.id],
											y: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.text[idx].y;
							},
						},
						{
							type: "number",
							label: "Size",
							containerProps: {
								className: `flex w-fit  relative justify-end flex-col`,
							},
							labelProps: {
								className: LableStylings,
							},
							className: smallInputs,
							onChange: (e: any) => {
								setDetails({
									...details,
									text: {
										...details.text,
										[e.target.id]: {
											...details.text[e.target.id],
											size: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.text[idx].size;
							},
						},
						{
							type: "color",
							label: "Color",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex w-fit relative justify-end flex-col`,
							},
							className: `shortInputs ${headingSizes.h5} p-[0.2rem] ${
								window.innerWidth > 900 ? "" : "h-[3.9rem]"
							} rounded-none border-b-[1px] border-black`,
							placeholder: "Color",
							onChange: (e: any) => {
								setDetails({
									...details,
									text: {
										...details.text,
										[e.target.id]: {
											...details.text[e.target.id],
											color: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.text[idx].color;
							},
						},
						{
							type: "button",
							label: "Center",

							onClick: (e: any) => {
								setDetails({
									...details,
									text: {
										...details.text,
										[e.target.id]: {
											...details.text[e.target.id],
											isCenter: !details.text[e.target.id].isCenter,
										},
									},
								});
							},
							css: (idx: any) => {
								return details.text[idx].isCenter
									? `shortInputs text-[1.5rem] p-[0.3rem] text-white py-[0.4rem] px-[1rem]  rounded-md border-[1px] border-black ${PrimaryBG[900]}`
									: "shortInputs text-[1.5rem] p-[0.3rem] text-white py-[0.4rem] px-[1rem]  rounded-md border-[1px] border-black bg-sky-900";
							},
						},
					],
				},
			];

		case "image":
			return [
				{
					type: "incdec",
					label: `Image Field : ${details.imageCounter}`,
					labelProps: {
						className: `${headingSizes.h4} text-sky-900`,
					},
					btnContainerProps: {
						className: `flex w-full justify-center`,
					},
					fieldContainerProps: {
						className: `${stylings.level0PrimaryCss} items-center`,
					},
					inc: {
						label: "Add",
						className: `${stylings.primaryButtonCssDark} w-full py-[0.2rem]`,
						onClick: () => {
							setDetails({
								...details,
								imageCounter: details.imageCounter + 1,
								image: {
									...details.image,
									[details.imageCounter + 1]: {
										image: "",
										x: "",
										y: "",
										width: 100,
										height: 100,
										color: "#000000",
										imageAlias: "",
									},
								},
							});
						},
					},
					dec: {
						label: "Remove",
						className: `text-[1.4rem] hidden rounded-md text-white bg-sky-900 p-[0.6rem]`,
						onClick: () => {
							if (details.imageCounter > 0) {
								delete details.image[details.imageCounter];
								setDetails({
									...details,
									imageCounter: details.imageCounter - 1,
								});
							}
						},
					},
				},
				{
					type: "dynamic",
					limit: details.imageCounter,
					trackLabelCss: "text-[1.8rem]",
					trackLable: "Image Count : ",
					totalFields: [
						{
							label: "X",
							fieldContainerProps: {
								className: "form__field h-0 relative font-sans w-full",
							},
							className: "text-[1.5rem] bg-red-600 text-white top-[-4rem] right-0 py-[0.5rem] absolute px-[1.2rem] rounded-full float-right",
							type: "button",
							onClick: (e: any) => {
								setDetails({
									...details,
									imageCounter: details.imageCounter - 1,
								});
								Object.keys(details.image).forEach((key: any) => {
									if (key === e.target.id) {
										delete details.image[key];
									}
									if (Number(key) > Number(e.target.id)) {
										details.image[key - 1] = details.image[key];
										delete details.image[key];
									}
								});
							},
						},
						{
							type: "text",
							label: "Image Field",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative w-full flex-col`,
							},
							className: `textFieldAliasIE w-[100%] ${headingSizes.h5} p-[0.6rem] bg-transparent rounded-none border-b-[1px] border-black`,

							onChange: (e: any) => {
								setDetails({
									...details,
									image: {
										...details.image,
										[e.target.id]: {
											...details.image[e.target.id],
											imageAlias: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.image[idx].imageAlias;
							},
						},
						{
							type: "number",
							label: "Horizontal",
							placeholder: "",
							labelProps: {
								className:LableStylings,
							},
							containerProps: {
								className: `flex relative  w-fit justify-end flex-col`,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									image: {
										...details.image,
										[e.target.id]: {
											...details.image[e.target.id],
											x: Number(e.target.value),
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.image[idx].x;
							},
						},
						{
							type: "number",
							label: "Vertical",
							placeholder: "",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative w-fit flex-col`,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									image: {
										...details.image,
										[e.target.id]: {
											...details.image[e.target.id],
											y: Number(e.target.value),
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.image[idx].y;
							},
						},
						{
							type: "number",
							label: "Width",
							placeholder: "",
							containerProps: {
								className: `flex w-fit  relative justify-end flex-col`,
							},
							labelProps: {
								className: LableStylings,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									image: {
										...details.image,
										[e.target.id]: {
											...details.image[e.target.id],
											width: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.image[idx].width;
							},
						},
						{
							type: "number",
							label: "Height",
							placeholder: "",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex w-fit relative justify-end flex-col`,
							},
							className: `shortInputs ${headingSizes.h5} p-[0.2rem] ${
								window.innerWidth > 900 ? "" : "h-[3.9rem]"
							} rounded-none border-b-[1px] border-black`,

							onChange: (e: any) => {
								setDetails({
									...details,
									image: {
										...details.image,
										[e.target.id]: {
											...details.image[e.target.id],
											height: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.image[idx].height;
							},
						},
						{
							type: "color",
							label: "Color",
							placeholder: "Color",
							labelProps: {
								className: `${LableStylings} top-[0px]`,
							},
							containerProps: {
								className: `flex relative w-full flex-col`,
							},
							className: `textFieldAliasIE w-[100%] ${headingSizes.h5} p-[0.2rem] bg-transparent rounded-none border-b-[1px] border-black`,

							onChange: (e: any) => {
								setDetails({
									...details,
									image: {
										...details.image,
										[e.target.id]: {
											...details.image[e.target.id],
											color: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.image[idx].color;
							},
						},
					],
				},
			];

		case "qr":
			return [
				{
					type: "dynamic",
					limit: null,

					trackLabelCss: "text-[1.8rem] hidden",
					totalFields: [
						{
							type: "number",
							placeholder: "",
							label: "X",
							value: details.qr.x,
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative  w-fit justify-end flex-col`,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									qr: {
										...details.qr,
										[e.target.id]: {
											...details.qr[e.target.id],
											x: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.qr[idx].x;
							},
						},
						{
							type: "text",
							placeholder: "",
							label: "Y",
							value: details.qr.y,
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative w-fit flex-col`,
							},
							className: smallInputs,
							onChange: (e: any) => {
								setDetails({
									...details,
									qr: {
										...details.qr,
										[e.target.id]: {
											...details.qr[e.target.id],
											y: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.qr[idx].y;
							},
						},
					],
				},
			];

		case "shape":
			return [
				{
					type: "incdec",
					label: `Shape Field : ${details.shapeCounter}`,
					labelProps: {
						className: `${headingSizes.h4} text-sky-900`,
					},
					btnContainerProps: {
						className: `flex w-full justify-center`,
					},
					fieldContainerProps: {
						className: `${stylings.level0PrimaryCss} items-center`,
					},
					inc: {
						label: "Add",
						className: `${stylings.primaryButtonCssDark} w-full py-[0.2rem]`,
						onClick: () => {
							setDetails({
								...details,
								shapeCounter: details.shapeCounter + 1,
								shape: {
									...details.shape,
									[details.shapeCounter + 1]: {
										shapeAlias: "",
										x: 200,
										y: 200,
										radius: 50,
										color: "#000000",
										width: 100,
										height: 100,
									},
								},
							});
						},
					},
					dec: {
						label: "Remove",
						className: `text-[1.4rem] hidden rounded-md text-white bg-sky-900 p-[0.6rem]`,
						onClick: () => {
							if (details.imageCounter > 0) {
								delete details.shape[details.shapeCounter];
								setDetails({
									...details,
									shapeCounter: details.shapeCounter - 1,
								});
							}
						},
					},
				},
				{
					type: "dynamic",
					limit: details.shapeCounter,
					trackLabelCss: "text-[1.8rem]",
					trackLable: "shape Count : ",
					totalFields: [
						{
							label: "X",
							fieldContainerProps: {
								className: "form__field h-0 relative font-sans w-full",
							},
							className: "text-[1.5rem] bg-red-600 text-white top-[-4rem] right-0 py-[0.5rem] absolute px-[1.2rem] rounded-full float-right",
							type: "button",
							onClick: (e: any) => {
								setDetails({
									...details,
									shapeCounter: details.shapeCounter - 1,
								});
								Object.keys(details.shape).forEach((key: any) => {
									if (key === e.target.id) {
										delete details.shape[key];
									}
									if (Number(key) > Number(e.target.id)) {
										details.shape[key - 1] = details.shape[key];
										delete details.shape[key];
									}
								});
							},
						},
						{
							type: "text",
							label: "Shape Field",
							labelProps: {
								className: LableStylings	,
							},
							containerProps: {
								className: `flex relative w-full flex-col`,
							},
							className: `textFieldAliasIE w-[100%] ${headingSizes.h5} p-[0.6rem] bg-sky-50 rounded-none border-b-[1px] border-black`,
							onChange: (e: any) => {
								setDetails({
									...details,
									shape: {
										...details.shape,
										[e.target.id]: {
											...details.shape[e.target.id],
											shapeAlias: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.shape[idx].shapeAlias;
							},
						},
						{
							type: "number",
							label: "Horizontal",
							placeholder: "",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative  w-fit justify-end flex-col`,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									shape: {
										...details.shape,
										[e.target.id]: {
											...details.shape[e.target.id],
											x: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.shape[idx].x;
							},
						},
						{
							type: "number",
							label: "Vertical",
							placeholder: "",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex relative w-fit flex-col`,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									shape: {
										...details.shape,
										[e.target.id]: {
											...details.shape[e.target.id],
											y: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.shape[idx].y;
							},
						},
						{
							type: "number",
							label: "Radius",
							placeholder: "",
							containerProps: {
								className: `flex w-fit  relative justify-end flex-col`,
							},
							labelProps: {
								className: LableStylings,
							},
							className: smallInputs,

							onChange: (e: any) => {
								setDetails({
									...details,
									shape: {
										...details.shape,
										[e.target.id]: {
											...details.shape[e.target.id],
											radius: e.target.value,
											height: 2 * e.target.value,
											width: 2 * e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.shape[idx].radius;
							},
						},
						{
							type: "color",
							label: "Color",
							labelProps: {
								className: LableStylings,
							},
							containerProps: {
								className: `flex w-fit relative justify-end flex-col`,
							},
							className: `shortInputs ${headingSizes.h5} p-[0.2rem] ${
								window.innerWidth > 900 ? "" : "h-[3.9rem]"
							} rounded-none border-b-[1px] border-black`,
							placeholder: "Color",
							onChange: (e: any) => {
								setDetails({
									...details,
									shape: {
										...details.shape,
										[e.target.id]: {
											...details.shape[e.target.id],
											color: e.target.value,
										},
									},
								});
							},
							pr: (idx: any) => {
								return details.shape[idx].color;
							},
						},
					],
				},
			];
		default:
			return [];
	}
};
export default ImageEditorControl;

const invertColor = (hex: string) => {
	if (hex.indexOf("#") === 0) {
		hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error("Invalid HEX color.");
	}
	// invert color components
	const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
		g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
		b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
	// pad each with zeros and return
	return "#" + padZero(r) + padZero(g) + padZero(b);
};
const padZero = (str: string, len: number = 2) => {
	let zeros = new Array(len).join("0");
	return (zeros + str).slice(-len);
};

export const handleDraw = (
	details: ImageEditDetails,
	ctx: CanvasRenderingContext2D,
	setTextBox: React.Dispatch<SetStateAction<textBounds | undefined>>
) => {
	let textBounds: any = {};
	Array.from(Object.keys(details.text)).forEach((key: string) => {
		const { text, x, y, color, size } = details.text[key];
		ctx.font = `${size}px Arial`;
		ctx.fillStyle = color;
		ctx.fillText(text, x, y);
		textBounds[key] = {
			width: ctx.measureText(details.text[key].text).width,
			height: details.text[key].size,
		};
	});

	Array.from(Object.keys(details.image)).forEach((key: string) => {
		ctx.fillStyle = `${details.image[key].color}`;
		ctx.fillRect(details.image[key].x, details.image[key].y, details.image[key].width, details.image[key].height);
		ctx.font = `${0.12 * details.image[key].height}px Arial`;
		ctx.fillStyle = invertColor(details.image[key].color);
		ctx.fillText(
			details.image[key].imageAlias,

			details.image[key].width / 2 + details.image[key].x - ctx.measureText(details.image[key].imageAlias).width / 2,
			details.image[key].height / 2 + details.image[key].y
		);
	});
	Array.from(Object.keys(details.shape)).forEach((key: string) => {
		ctx.beginPath();
		ctx.arc(details.shape[key].x, details.shape[key].y, details.shape[key].radius, 0, 2 * Math.PI);
		ctx.lineWidth = 3;
		ctx.strokeStyle = details.shape[key].color;
		ctx.stroke();
	});
	Array.from(
		Object.keys(details.qr).map((key) => {
			ctx.fillStyle = `#000`;
			ctx.fillRect(+details.qr[key].x, +details.qr[key].y, 130, 130);
			ctx.font = `${0.12 * 130}px Arial`;
			ctx.fillStyle = `#fff`;
			ctx.fillText("QRCODE", 130 / 2 + Number(details.qr[key].x) - ctx.measureText("QRCODE").width / 2, 130 / 2 + Number(details.qr[key].y));
		})
	);
	setTextBox(textBounds);
};
