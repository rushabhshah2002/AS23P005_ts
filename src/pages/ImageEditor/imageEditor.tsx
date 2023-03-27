import React, { useState } from "react";
import { userContext } from "../../context/usercontext";
import { tokenContext } from "../../context/tokenContext";
import { updateContext } from "../../utils/updateContext";
import { fileToBase64, ApiHelper } from "../../utils/ApiHelper";
import { ImageEditDetails, ImageProps, textBounds } from "../../utils/types";
import Form from "../../components/form/form";
import ImageEditorControl, { handleDraw } from "../../utils/Form/utils.ImageEditor";
import { headingSizes } from "../../utils/Utils.fontSize";
import { getCss, helper, truncateFile } from "../../utils/utils.helper";
import { props } from "../../utils/utils.props";
import { stylings } from "../../utils/utils.css";
import MainLayout from "../../components/PageLayouts/MainLayout";
import LeftLayout from "../../components/PageLayouts/LeftLayout";
import RightLayout from "../../components/PageLayouts/RightLayout";
import "./ImageEditor.scss";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import { sideBarDetails } from "../../utils/utils.sideBar";
import useGetData from "../../hooks/useGetProfileData";
import SideBar from "../../components/SideBar/SideBar";
import { verifiers } from "../../utils/verifier";
import { PrimaryBG, PrimaryBorder, PrimaryText } from "../../utils/utils.primaryColor";
import { readyTemplates } from "../../utils/utils.struct";
import ImageSelector from "../../components/imageSelector/imageSelector";
import Popup from "../../components/Popup/Popup";
import { useNavigate } from "react-router-dom";

const ImageEditor: React.FC = () => {
	const { user, setUser } = React.useContext(userContext);
	const [ourTemplatePopup, setOurTemplatePopup] = useState<boolean>(false);
	const { token } = React.useContext(tokenContext);
	const [current, setCurrent] = React.useState<any>();
	const [image, setImage] = React.useState<ImageProps>({
		name: "Choose File",
		src: "",
	});
	const onClose = () => {
		setOurTemplatePopup(false);
	};
	const [details, setDetails] = React.useState<ImageEditDetails>({
		baseLink: "",
		preview: "",
		textCounter: 0,
		imageCounter: 0,
		shapeCounter: 0,
		qr: { ["1"]: { x: 0, y: 0, type: "qr" } },
		text: {},
		image: {},
		shape: {},
		meta: {},
	});
	const [currentCanvasControlller, setCurrentCanvasControlller] = React.useState<"text" | "image" | "qr" | "shape">("text");
	const [canvasParams, setCanvasParams] = React.useState<{
		width: number;
		height: number;
		offsetLeft: number;
		offsetTop: number;
		scrollTop: number;
		scrollLeft: number;
	}>({
		width: 0,
		height: 0,
		offsetLeft: 0,
		offsetTop: 0,
		scrollTop: 0,
		scrollLeft: 0,
	});
	const [imageParams, setImageParams] = React.useState<{
		width: number;
		height: number;
	}>({ width: 0, height: 0 });

	const [textBox, setTextBox] = React.useState<textBounds | undefined>({ struct: { width: 0, height: 0 } });
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const canvasDivRef = React.useRef<HTMLDivElement>(null);
	const [load, setLoad] = React.useState<number>(0);
	const navigate = useNavigate();
	const [submit, setSubmit] = React.useState<boolean>(false);
	const getClassNameForFormSelector = (val: string) => {
		if (currentCanvasControlller == val) {
			return `canvasControlSelectorText p-[0.7rem] ${PrimaryBG[900]} rounded-lg`;
		} else {
			return "canvasControlSelectorText p-[1rem] rounded-lg";
		}
	};
	const getColorForFormSelector = (val: string) => {
		if (currentCanvasControlller == val) {
			return "#ffffff";
		} else {
			return "#000000";
		}
	};
	updateContext(userContext, tokenContext);
	useGetData(true, user, setUser, token);
	React.useEffect(() => {
		const img = new Image();
		img.src = image.src;
		img.onload = () => {
			setDetails({
				...details,
				meta: { ...details.meta, width: img.width, height: img.height },
			});
			setImageParams({ width: img.width, height: img.height });
		};

		setTimeout(() => {
			setLoad((prev) => prev + 1);
		}, 100);
	}, [image]);
	const canvas = canvasRef.current;
	React.useEffect(() => {
		if (!image) return;

		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const img = new Image();
		img.src = image.src;
		img.setAttribute("crossorigin", "anonymous");
		img.onload = () => {
			ctx.clearRect(0, 0, imageParams.width, imageParams.height);
			ctx.drawImage(img, 0, 0, imageParams.width, imageParams.height);
			handleDraw(details, ctx, setTextBox);

			if (!canvasDivRef) return;

			if (canvas)
				setCanvasParams({
					offsetLeft: canvasRef.current.offsetLeft,
					offsetTop: canvasRef.current.offsetTop,
					width: canvasRef.current.offsetWidth,
					height: canvasRef.current.offsetHeight,
					scrollTop: canvasRef.current.scrollTop,
					scrollLeft: canvasRef.current.scrollLeft,
				});
		};
	}, [details, image, load, submit]);

	const IsObject = (startX: number, startY: number, id: number, currentCanvasControlller: string) => {
		switch (currentCanvasControlller) {
			case "text":
				if (!textBox) {
					return;
				}
				return (
					startX >= +details.text[id].x &&
					startX <= textBox[id].width + details.text[id].x &&
					startY >= details.text[id].y - 20 &&
					startY <= details.text[id].y + textBox?.[id]?.height
				);

			case "image":
				return (
					startX >= details.image[id].x &&
					startX <= details.image[id].x + details.image[id].width &&
					startY >= details.image[id].y &&
					startY <= details.image[id].y + details.image[id].height
				);
			case "shape":
				return (
					startX >= details.shape[id].x - details.shape[id].radius &&
					startX <= details.shape[id].x + details.shape[id].radius &&
					startY >= details.shape[id].y - details.shape[id].radius &&
					startY <= details.shape[id].y + details.shape[id].radius
				);

			case "qr":
				return (
					startX >= Number(details.qr[1].x) &&
					startX <= Number(details.qr[1].x) + 130 &&
					startY >= Number(details.qr[1].y) &&
					startY <= Number(details.qr[1].y) + 130
				);

			default:
				return;
		}
	};
	const handleSubmit = async () => {
		const url = await Promise.resolve(canvas?.toDataURL());

		if (!verifiers.isAlias(details.meta.alias ? details.meta.alias : "!@#$%^&*()")) {
			toast.error("Please fill all the fields correctly");
			setSubmit(false);
			return;
		}
		let { data, error, loaded } = await ApiHelper(
			"create/template",
			{
				...details,
				preview: url,
				baseLink: image.src,
				token: token,
				email: user.email,
				instEmail: user.instEmail,
				textBox: { ...textBox },
			},
			[]
		);
		if (error) {
			toast.error(error.message);
		} else {
			if (data == null) {
				toast.error("error");
				setSubmit(false);
			} else if (data != null && loaded) {
				toast.success("Template Created Succesfully !");
				setSubmit(false);
				navigate("/dashboardinst")				
			}
		}
	};
	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let parentScroll = {
			Top: 0,
			Left: 0,
		};
		parentScroll = {
			Top: Number(canvasDivRef.current?.scrollTop),
			Left: Number(canvasDivRef.current?.scrollLeft),
		};
		const startX = e.clientX - canvasParams.offsetLeft + parentScroll.Left;
		const startY = e.clientY - canvasParams.offsetTop + parentScroll.Top;
		ctx.fillRect(startX, startY, 4, 4);

		Array.from(Object.keys(details.text)).forEach((item, i) => {
			if (IsObject(startX, startY, Number(item), currentCanvasControlller)) {
				setCurrent({ ...details.text[item], id: +item });
			}
		});
		Array.from(Object.keys(details.image)).forEach((item, i) => {
			if (IsObject(startX, startY, Number(item), currentCanvasControlller)) {
				setCurrent({ ...details.text[item], id: +item });
			}
		});
		Array.from(Object.keys(details.shape)).forEach((item, i) => {
			if (IsObject(startX, startY, Number(item), currentCanvasControlller)) {
				setCurrent({ ...details.text[item], id: +item });
			}
		});
		Array.from(Object.keys(details.qr)).forEach((item, i) => {
			if (IsObject(startX, startY, Number(item), currentCanvasControlller)) {
				setCurrent({ ...details.qr[item], id: +item });
			}
		});
	};
	const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		setCurrent(undefined);
	};
	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (current == undefined) {
			return;
		}
		let parentScroll = {
			Top: 0,
			Left: 0,
		};
		parentScroll = {
			Top: Number(canvasDivRef.current?.scrollTop),
			Left: Number(canvasDivRef.current?.scrollLeft),
		};
		const startX = e.clientX - canvasParams.offsetLeft + parentScroll.Left;
		const startY = e.clientY - canvasParams.offsetTop + parentScroll.Top;
		setDetails({
			...details,
			[currentCanvasControlller]: {
				...details[currentCanvasControlller],
				[current.id]: {
					...details[currentCanvasControlller][current.id],
					x: startX,
					y: startY,
				},
			},
		});
	};
	const handleMouseOut = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		setCurrent(undefined);
	};

	return (
		<div className="h-full w-full bg-sky-100 flex flex-col">
			<Header profileName={user.instEmail}>
				{" "}
				<div className="autocomplete bg-transparent w-[40%] flex justify-center">
					<span className={`text-[3rem] ${PrimaryText[900]}`}>Create Template</span>
				</div>
			</Header>
			<div className="div w-full h-full flex justify-between">
				<MainLayout>
					<LeftLayout coustomClassName="leftLayout5_5" leftLayoutProps={{ className: "bg-white" }}>
						{" "}
						<div className={` onlyForMobile w-[100vw] h-[100vh] fixed flex-col items-center justify-center ${PrimaryBG[900]}`}>
							<svg
								className="w-[9rem]"
								xmlns="http://www.w3.org/2000/svg"
								version="1.1"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								x="0"
								y="0"
								viewBox="0 0 512 512"
								xmlSpace="preserve">
								<g>
									<path
										d="M20 20h472v472H20z"
										fill="none"
										stroke="#ffffff"
										stroke-width="40"
										stroke-miterlimit="10"
										data-original="#000000"
										className=""></path>
									<path
										d="M20 140h200c22.091 0 40-17.909 40-40h232M100 140V80M180 140V80M218.426 213.574l-84.852 84.852M218.426 298.426l-84.852-84.852M378.426 213.574l-84.852 84.852M378.426 298.426l-84.852-84.852M116 372h280M176 432v-60"
										fill="none"
										stroke="#ffffff"
										stroke-width="40"
										stroke-miterlimit="10"
										data-original="#000000"
										className=""></path>
								</g>
							</svg>
							<span className="text-white text-center text-[3rem]">Please shift to desktop or tablet divice to access this page</span>
						</div>{" "}
						<div className="leftLayoutParentComponent h-full w-full items-center parentController">
							<div
								className={`controllers w-[100%] flex flex-col bg-sky-50 items-center h-fit rounded-lg border-[0px] px-[2rem] py-[1rem] ${PrimaryBorder[900]}`}>
								<div className="input w-full">
									<div className="image_input w-full flex gap-y-[2rem] flex-col">
										<div className={`w-full flex items-center flex-col gap-[1rem]`}>
											<input
												type="file"
												id="file"
												className="hidden"
												accept="image/png, image/jpeg"
												onChange={async (e) => {
													if (e.target.files) {
														setImage({
															name:  truncateFile(e.target.files[0].name),
															src: (await fileToBase64(e.target.files[0])) as string,
														});
													}
												}}
											/>
											<label
												className={`text-[2rem] ${PrimaryText[900]} border-2 w-full ${PrimaryBorder[900]} rounded-md  text-center h-[3.4rem] overflow-hidden`}
												htmlFor="file">
												{image.name ? image.name : "Choose File"}
											</label>
											<button
												onClick={() => {
													setOurTemplatePopup(true);
												}}
												className={`text-[2rem] w-full ${PrimaryText[900]} border-2 ${PrimaryBorder[900]} rounded-md  text-center h-[3.4rem]`}>
												Premium Template
											</button>
										</div>

										<div className="imageAlias_input relative">
											<input
												className={`outline-none w-[100%] ${headingSizes.h5} p-[0.6rem] bg-sky-50 rounded-none border-b-[1px] border-black`}
												type="text"
												id="imageAlias"
												value={details.meta.alias}
												onChange={(e) => {
													getCss(verifiers.isAlias, e);
													setDetails({
														...details,
														meta: { ...details.meta, alias: e.target.value },
													});
													helper.checkValForLabel(e);
												}}
												onFocus={(e) => {
													helper.focus(e);
												}}
												onBlur={(e) => {
													helper.blur(e);
												}}
											/>
											<label id="label_imageAlias" className={`${stylings.primaryLabelCss} left-0`} htmlFor="imageAlias">
												Alias
											</label>
										</div>
									</div>
								</div>

								<div className="canvasControl w-full">
									<div className="canvasControlSelector w-full flex justify-evenly items-center">
										<button
											className={getClassNameForFormSelector("text")}
											onClick={() => {
												setCurrentCanvasControlller("text");
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												version="1.1"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												width="30"
												height="30"
												x="0"
												y="0"
												viewBox="0 0 458.353 458.353"
												xmlSpace="preserve">
												<g>
													<path
														d="M171.882 57.294H286.47v57.294h28.647V28.647H0v85.941h28.647V57.294h114.588v343.765H85.941v28.647h143.235v-28.647h-57.294z"
														fill={getColorForFormSelector("text")}
														data-original="#000000"></path>
													<path
														d="M200.529 143.235v57.294h28.647v-28.647h85.941v229.176h-57.294v28.647h143.235v-28.647h-57.294V171.882h85.941v28.647h28.647v-57.294z"
														fill={getColorForFormSelector("text")}
														data-original="#000000"></path>
												</g>
											</svg>
										</button>
										<button
											className={getClassNameForFormSelector("image")}
											onClick={() => {
												setCurrentCanvasControlller("image");
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												version="1.1"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												width="30"
												height="30"
												x="0"
												y="0"
												viewBox="0 0 32 32"
												xmlSpace="preserve"
												className="">
												<g>
													<g data-name="34-Add-image">
														<path
															d="M29 24h-3v-3a1 1 0 0 0-2 0v3h-3a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 0 0 0-2zM17 24H5a1 1 0 0 1-1-1v-2.59l4-4 2.29 2.3a1 1 0 0 0 1.42 0l5.29-5.3 4.29 4.3a1 1 0 0 0 1.42-1.42l-5-5a1 1 0 0 0-1.42 0L11 16.59l-2.29-2.3a1 1 0 0 0-1.42 0L4 17.59V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v12a1 1 0 0 0 2 0V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2z"
															fill={getColorForFormSelector("image")}
															data-original="#000000"
															className=""></path>
														<path
															d="M8 9a3 3 0 1 0 3-3 3 3 0 0 0-3 3zm4 0a1 1 0 1 1-1-1 1 1 0 0 1 1 1z"
															fill={getColorForFormSelector("image")}
															data-original="#000000"></path>
													</g>
												</g>
											</svg>
										</button>
										<button
											className={getClassNameForFormSelector("qr")}
											onClick={() => {
												setCurrentCanvasControlller("qr");
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												version="1.1"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												width="30"
												height="30"
												x="0"
												y="0"
												viewBox="0 0 512 512"
												xmlSpace="preserve">
												<g>
													<path d="M160 0H0v160h160V0zm-32 128H32V32h96v96z" fill={getColorForFormSelector("qr")} data-original="#000000"></path>
													<path
														d="M64 64h32v32H64zM352 0v160h160V0H352zm128 128h-96V32h96v96z"
														fill={getColorForFormSelector("qr")}
														data-original="#000000"></path>
													<path
														d="M416 64h32v32h-32zM0 512h160V352H0v160zm32-128h96v96H32v-96z"
														fill={getColorForFormSelector("qr")}
														data-original="#000000"></path>
													<path
														d="M64 416h32v32H64zM256 0h64v32h-64zM256 128h32V96h32V64h-96V32h-32v64h64zM192 128h32v32h-32zM320 160h-32v32h-96v32h128zM32 288h32v-32H32v-64H0v128h32zM64 192h32v32H64z"
														fill={getColorForFormSelector("qr")}
														data-original="#000000"></path>
													<path
														d="M192 320h64v-32h-32v-32h-64v-64h-32v64H96v64h32v-32h64zM288 256h32v64h-32zM288 352h-96v32h64v96h-64v32h96v-32h64v-32h-64z"
														fill={getColorForFormSelector("qr")}
														data-original="#000000"></path>
													<path
														d="M192 416h32v32h-32zM320 352h32v64h-32zM480 416h-96v96h32v-64h64z"
														fill={getColorForFormSelector("qr")}
														data-original="#000000"></path>
													<path
														d="M448 480h64v32h-64zM480 352h32v32h-32zM384 384h32v-96h-64v32h32zM448 224h-32v-32h-32v32h-32v32h128v-32h32v-32h-64zM448 288h64v32h-64z"
														fill={getColorForFormSelector("qr")}
														data-original="#000000"></path>
												</g>
											</svg>
										</button>
										<button
											className={getClassNameForFormSelector("shape")}
											onClick={() => {
												setCurrentCanvasControlller("shape");
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												version="1.1"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												width="30"
												height="30"
												x="0"
												y="0"
												viewBox="0 0 512 512"
												xmlSpace="preserve">
												<g>
													<path
														d="M216.667 275.328H20c-11.046 0-20 8.954-20 20v196.667c0 11.046 8.954 20 20 20h196.667c11.046 0 20-8.954 20-20V295.328c0-11.046-8.955-20-20-20zm-20 196.667H40V315.328h156.667zm197-196.667c-65.249 0-118.333 53.084-118.333 118.334 0 65.249 53.084 118.333 118.333 118.333 65.25 0 118.333-53.084 118.333-118.333 0-65.25-53.084-118.334-118.333-118.334zm0 196.667c-43.193 0-78.333-35.14-78.333-78.333s35.14-78.334 78.333-78.334S472 350.469 472 393.662s-35.14 78.333-78.333 78.333zM138 236.662h236c15.528 0 25.136-16.979 17.15-30.29l-118-196.667c-7.748-12.913-26.529-12.951-34.3 0l-118 196.667c-7.989 13.315 1.627 30.29 17.15 30.29zM256 58.868l82.676 137.794H173.324z"
														fill={getColorForFormSelector("shape")}
														data-original="#000000"></path>
												</g>
											</svg>
										</button>
									</div>

									<div className="canvasControlFields">
										<Form
											headingProps={props.headingProps}
											mainContainerProps={props.dynamicFormCssMasterProps}
											level2PrimaryProps={props.customLevel2PrimaryProps}
											level1PrimaryProps={props.customLevel1PrimaryProps}
											containerProps={props.dynamicFormCssParentProps}
											label={null}
											isPopup={true}
											fields={ImageEditorControl(currentCanvasControlller, details, setDetails)}
											submitLabel="Save"
											isClicked={submit}
											submitProps={{
												disabled: submit,
												className: `${stylings.primaryButtonCssDark} w-[100%] py-[0.2rem]`,
												onClick: () => {
													setSubmit(true);
													handleSubmit();
												},
											}}></Form>
									</div>
								</div>
							</div>
						</div>
					</LeftLayout>
					<RightLayout coustomClassName="rightLayout5_5" rightLayoutProps={{ className: "bg-white flex items-center justify-center" }}>
						<div ref={canvasDivRef} className=" bg-white canvasPlayground overflow-scroll">
							<canvas
								ref={canvasRef}
								width={imageParams.width}
								height={imageParams.height}
								onMouseDown={(e) => {
									handleMouseDown(e);
								}}
								onMouseUp={(e) => {
									handleMouseUp(e);
								}}
								onMouseMove={(e) => {
									handleMouseMove(e);
								}}
								onMouseOut={(e) => {
									handleMouseOut(e);
								}}
							/>
						</div>
					</RightLayout>
				</MainLayout>
				<div className="relative">
				<SideBar fields={sideBarDetails.imageEditor()} desptopWidth={`w-[27rem]`} nonDesktopWidth={`w-[40rem]`} />

				</div>
				{ourTemplatePopup && (
					<Popup props1={{ className: "popCss" }} height="auto">
						<ImageSelector
							staticWidth={`20rem`}
							data={readyTemplates}
							heading="Premium Templates"
							onClose={onClose}
							updatorValue={image}
							setUpdator={setImage}
						/>
					</Popup>
				)}
			</div>
		</div>
	);
};

export default ImageEditor;
