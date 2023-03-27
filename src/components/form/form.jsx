import React, { useState } from "react";
import FileInput from "../FileInput/FileInput";
import IncDecBtns from "../IncDecBtns/IncDecBtns";
import MultiInput from "../MultiInput/MultiInput";
import MultiSelectInput from "../MultiSelectInput/MultiSelectInput";
import Popup from "../Popup/Popup";
import "./form.scss";
import { useNavigate } from "react-router-dom";
import { assets } from "../../utils/utils.assets";
import {PrimaryBG, PrimaryText} from "../../utils/utils.primaryColor";
/**
 *
 * @param {import('../../utils/types').FormProps} param0
 * @returns
 */
const Form = ({
	fields,
	formCss,
	label,
	headingProps,
	onSubmit,
	level2PrimaryProps,
	level1PrimaryProps,
	containerProps,
	fieldContainerProps,
	routeOptionsProps,
	labelProps,
	routeOptions,
	submitLabel,
	submitProps,
	mainContainerProps,
	onClose,
	onBack,
	secondaryBtnLabel,
	submitContainerProps,
	routeOptionsContainerProps,
	secondaryBtnProps,
	isPopup,
	isClicked,
}) => {
	const navigate = useNavigate();
	const [passwordVisiblity, setPasswordVisiblity] = useState({});
	let tempPasswordVisiblity = {};
	return (
		<div className="form relative" {...level2PrimaryProps}>
			{!isPopup && (
				<>
					{" "}
					<svg
						width={20}
						height={20}
						className="absolute top-8 right-8 cursor-pointer text-white z-10 "
						viewBox="0 0 320.591 320.591"
						onClick={onClose}>
						<path
							d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"
							fill="#000"
						/>
						<path
							d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"
							fill="#000"
						/>
					</svg>
				</>
			)}
			<h4 {...headingProps}>{label}</h4>
			<form
				className="form__form w-full"
				onSubmit={(e) => {
					e.preventDefault();
				}}
				{...level1PrimaryProps}>
				{fields.map((field, ids) => {
					if (field.type === "checkbox") {
						return (
							<div {...field.containerProps}>
								<input type="checkbox" id="agree" {...field} />
								<label htmlFor="agree" {...field.labelProps}>
									{" "}
									I agree to{" "}
									<a href={field.href} className="text-[blue]" target="_blank">
										terms and conditions
									</a>
								</label>
							</div>
						);
					}

					if (field.type === "file") {
						return (
							<FileInput
								labelProps={field.labelBoxProp}
								primaryLabelProps={field.labelProps}
								containerProps={field.fieldContainerProps}
								primaryLabel={field.label}
								file={field.file}
								inputProps={field}
							/>
						);
					}
					if (field.type == "toggle") {
						const styleChanger = (val) => {
							if (field.currForm == val) {
								return field.toogleOnCss;
							} else {
								return field.toogleOffCss;
							}
						};
						return (
							<>
								<div className="toggle bg-white mt-[10px] flex rounded-lg" {...field.containerProps}>
									{field.buttons.map((toggelLabel, ids) => {
										return (
											<>
												<button className={styleChanger(toggelLabel)} id={ids} type="button" {...field}>
													{toggelLabel}
												</button>
											</>
										);
									})}
								</div>
							</>
						);
					}
					if (field.type === "image") {
						return (
							<div {...fieldContainerProps}>
								<img src={field.src} {...field}></img>
							</div>
						);
					}
					if (field.type === "dynamic") {
						return (
							<MultiInput
								trackLabelCss={field.trackLabelCss}
								trackLable={field.trackLable}
								mainContainerProps={mainContainerProps}
								containerProps={containerProps}
								fields={field.totalFields}
								iteration={field.limit}
							/>
						);
					}
					if (field.type === "incdec") {
						return (
							<IncDecBtns
								labelProps={field.labelProps}
								containerProps={field.fieldContainerProps}
								btnContainerProps={field.btnContainerProps}
								count={field.value}
								incrementLabel={field.inc.label}
								decrementLabel={field.dec.label}
								label={field.label}
								incrementProps={field.inc}
								decrementProps={field.dec}
							/>
						);
					}
					if (field.type == "dynamic_option") {
						return (
							<MultiSelectInput
								label={field.label}
								options={field.totalFields.option}
								iteration={field.limit}
								optionProps={(idx) => ({
									...field.totalFields.option,
									onClick: field.onChange,
								})}
							/>
						);
					}
					if (field.type == "button") {
						return (
							<div
								className="h-fit form__field mt-3 font-sans w-full" //doubt
								{...field.fieldContainerProps}>
								<button type="button" {...field}>
									{!field.buttonType ? field.label : <img className={field.imgClassName} src={field.buttonSrc} alt="" />}
								</button>
							</div>
						);
					}
					if (field.type == "textLabel") {
						return (
							<div className="routeOptionContainer" {...field.textLabelContainerProps}>
								<span onClick={() => navigate(field?.route)} {...field.labelProps}>
									{field.label}
								</span>
							</div>
						);
					}
					if (field.type == "password") {
						tempPasswordVisiblity[ids] = false;
						let type = `${!passwordVisiblity[ids] ? "password" : "type"}`;
						let src = `${!passwordVisiblity[ids] ? assets.Not_Visible : assets.View}`;
						return (
							<div className="form__field mt-3 font-sans w-full   " {...field.fieldContainerProps}>
								<label
									{...field.labelProps}
									className={`form__field__label ${
										field.value != "" && field.labelProps.labelup != false
											? "labelUp ".concat(field.labelProps.className)
											: field.labelProps.className
									}`}>
									{field.label}
								</label>
								{field.eyeButton == false ? (
									<input className="px-2 text-lg rounded-md py-2 border focus:border-black border-gray-400 focus:outline-none" {...field} />
								) : (
									<div className="innerDiv flex items-end justify-center relative">
										<input
											className="px-2 text-lg rounded-md py-2 border focus:border-black border-gray-400 focus:outline-none"
											{...field}
											type={type}
										/>
										<button
											type="button"
											className="absolute top-0 bottom-0 right-0 outline-none"
											{...field.eyeButtonProps}
											onClick={() => {
												setPasswordVisiblity({
													...passwordVisiblity,
													[ids]: !passwordVisiblity[ids],
												});
											}}>
											<img className="w-[2rem]" src={src} alt="img" />
										</button>
									</div>
								)}
							</div>
						);
					}
					return (
						<div className="form__field mt-3 font-sans w-full" {...field.fieldContainerProps}>
							<label
								{...field.labelProps}
								className={`form__field__label ${
									field.value != "" && field.labelProps.labelup != false ? "labelUp ".concat(field.labelProps.className) : field.labelProps.className
								}`}>
								{field.label}
							</label>
							<input className="px-2 text-lg rounded-md py-2 border focus:border-black border-gray-400 focus:outline-none" required {...field} />
						</div>
					);
				})}
				{submitLabel && (
					<div className="submitContainerProps w-full flex items-center justify-center" {...submitContainerProps}>
						<button
							className={`btn w-full flex items-center justify-center text-[1.7rem] py-4 px-3 ${PrimaryBG[900]} text-white transition-all mt-3 rounded-lg`}
							{...submitProps}>
							{isClicked && (
								<svg
									aria-hidden="true"
									className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
							)}
							{!isClicked ? submitLabel : "Processing"}
						</button>
					</div>
				)}
				{secondaryBtnLabel && (
					<button className="btn w-full text-[2rem] mt-4" {...secondaryBtnProps}>
						{secondaryBtnLabel}
					</button>
				)}
				{routeOptions && <div className="w-full flex items-center justify-center" {...routeOptionsContainerProps}>
					<span className={`text-[1.5rem] font-semibold cursor-pointer ${PrimaryText[900]}`} onClick={()=>{navigate(routeOptions.route)}} {...routeOptionsProps}>{routeOptions.routeLabel}</span>
				</div>}
			</form>
		</div>
	);
};

export default Form;
