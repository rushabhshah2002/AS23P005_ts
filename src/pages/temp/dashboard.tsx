import React, { useEffect, useState } from "react";
import { userContext } from "../../context/usercontext";
import { tokenContext } from "../../context/tokenContext";
import { updateContext } from "../../utils/updateContext";
import { GetApiHelper, ApiHelper } from "../../utils/ApiHelper";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { sideBarDetails } from "../../utils/utils.sideBar";
import "./dashboard.scss";
import { dashboardIndiUtils } from "../../utils/utils.dashboardIndi";
import Form from "../../components/form/form";
import { toast } from "react-toastify";
import { headingSizes } from "../../utils/Utils.fontSize";
import { props } from "../../utils/utils.props";
import { stylings } from "../../utils/utils.css";
import { inststruct } from "../../utils/utils.struct";
import Popup from "../../components/Popup/Popup";
import { PrimaryText, PrimaryBG, PrimaryBorder } from "../../utils/utils.primaryColor";
import {
	Linkaccount,
	uploadCertiIndiInterface,
	verfiyForm,
	statusI,
	userDetailsDashboardIndi,
	userDetailsIndi,
	getcertiIndi,
} from "../../utils/types";
import { Avatar } from "@mui/material";
import InstLoader from "../../components/InstLoader/InstLoader";
import { helper } from "../../utils/utils.helper";
import { verifyUtils } from "../../utils/utils.verify";
import Header from "../../components/Header/Header";
import { linkUtils } from "../../utils/utils.linkIndi";
import { verifiers } from "../../utils/verifier";
import { useGetApi } from "../../hooks/useGetApi";
import CertificateGallery from "../../components/CertiGallery/certiGallery";
import { assets } from "../../utils/utils.assets";
import AutoComplete from "../../components/AutoComplete/Autocomplete";
import RollDown from "../../components/RollDown/RollDown";
const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const { user } = React.useContext(userContext);
	const { token } = React.useContext(tokenContext);
	const [userProfile, setUserProfile] = React.useState<userDetailsIndi>({
		email: "",
		name: "",
		password: "",
		phoneNo: "",
		statusFlag: 0,
		type: 0,
	});
	const [slaveDetails, setSlaveDetails] = React.useState<Array<userDetailsDashboardIndi>>();
	const [editPopup, setEditPopup] = useState<boolean>(false);
	const [slaveDetailsOpener, setSlaveDetailsOpener] = useState<{ currentSelected: string; rollDown: boolean }>({
		currentSelected: "null",
		rollDown: false,
	});
	const [uploadCertiPopup, setUploadCertiPopup] = useState<boolean>(false);
	const [linkPopup, setLinkPopup] = useState<boolean>(false);
	const [linkedAccountPopupForTableSize, setLinkedAccountPopupForTableSize] = useState(false);
	const [alias, setAlias] = useState<{ CID: string; alias: string }>({
		CID: "",
		alias: "",
	});
	const [verify, setVerify] = React.useState<verfiyForm>({
		email: "",
		OTP: "",
	});

	const [error, setError] = React.useState<any>();
	const [loaded, setLoaded] = React.useState<boolean>(false);
	const [isClicked, setIsClicked] = React.useState<boolean>(false);
	const [editAlias, setEditAlias] = React.useState<boolean>(false);
	const [verifyPopup, setVerifyPopup] = useState(false);
	const [uploadCertiDetilas, setUploadCertiDetails] = useState<uploadCertiIndiInterface>(inststruct.uploadCertiIndiStruct);
	const [certiData, setCertiData] = React.useState<any>({});
	let [filterEmails, setFilterEmails] = useState<Array<string>>();
	// const [dependencyToggle , setDependencyToggle] = useState<boolean>(false);
	const cacheCertidata = React.useMemo(() => {
		let filteredData: Array<getcertiIndi> = [];
		Array.from(Object.keys(certiData)).map((item) => {
			if (filterEmails?.includes(item)) {
				filteredData = [...filteredData, ...certiData[item]];
			}
		})
		if (filteredData.length > 0) {
			filteredData = filteredData.map((obj) => {
				const date = obj.dateStamp.split("T")[0];
				return { ...obj, date: date };
			});
			const sortedAsc = filteredData.sort((objA, objB) => Number(objA.date?.split("-")[2]) - Number(objB.date?.split("-")[2]));
			return sortedAsc;
		}		
		return filteredData;
	}, [certiData, filterEmails]);
	const [sharePopup, setSharePopup] = useState<statusI>({
		status: false,
		link: "null",
	});
	const [linkData, setLinkData] = React.useState<Linkaccount>({
		email: "",
		OTP: "",
		slaveEmail: "",
		isSlaveVerified: false,
		viewOTP: false,
	});

	updateContext(userContext, tokenContext);
	const handleRequestOtp = async () => {
		const { data, error, loaded } = await ApiHelper("auth/OTPinit", { email: user.email }, ["email"]);
		if (error) {
			toast.error("failed to send OTP");
			return;
		}
		if (loaded) {
			if (data) {
				toast.success("OTP sent successfully");
				setVerifyPopup(true);
			}
		}
	};
	const handleVerifySubmit = async () => {
		const { data, error, loaded } = await ApiHelper("auth/OTPverify", { email: user.email, OTP: verify.OTP }, ["email"]);
		if (loaded) {
			if (error) {
				toast.error("failed to verify OTP");
				return;
			}
			if (data) {
				toast.success("OTP verified successfully");
				setVerifyPopup(false);
			}
		}
	};
	useEffect(() => {
		if ((!userProfile.isVerified && uploadCertiPopup) || (editPopup && !userProfile.isVerified)) {
			toast.error("verify account first");
			setUploadCertiPopup(false);
			setEditPopup(false);
		}
	}, [uploadCertiPopup, editPopup]);
	const getData = async () => {
		let { data, error, loaded } = await GetApiHelper("profile/indi", {
			email: user.email,
			token: token,
		});
		if (error) {
			toast.error(error.message);
			navigate("/login");
		} else if (data && loaded) {
			setUserProfile(data.user);
			setFilterEmails([data.user.email]);
			setSlaveDetails(data.slaveUser);
			setVerify({ ...verify, email: user.email }), setLinkData({ ...linkData, email: user.email });
			setUploadCertiDetails({
				...inststruct.uploadCertiIndiStruct,
				email: data.user.email,
			});
		}
	};
	useGetApi(
		"getcertificate/indi",
		{
			email: user.email,
			token: token,
		},
		setCertiData,
		setError,
		setLoaded,
		user.email,
		token,
		[uploadCertiPopup, editAlias, linkPopup]
	);

	const handleSubmit = async (route: string, details: any) => {
		setIsClicked(true);
		switch (route) {
			case "profile/update/indi":
				if (!verifiers.isPhone(userProfile.phoneNo)) {
					toast.error("Please fill all the fields correctly");
					setIsClicked(false);
					return;
				}
				break;
			case "upload/alias":
				if (!verifiers.isAlias(alias.alias)) {
					toast.error("Please fill all the fields correctly");
					setIsClicked(false);
					return;
				}
				break;
			case "upload/indi":
				if (!verifiers.isAlias(uploadCertiDetilas.alias) || !verifiers.isDate(uploadCertiDetilas.date)) {
					toast.error("Please fill all the fields correctly");
					setIsClicked(false);
					return;
				}
			case "link/account":
				break;
			default:
		}
		const { data, error, loaded } = await ApiHelper(route, { ...details, token: token, email: user.email }, []);

		if (loaded) {
			setIsClicked(false);
		}
		if (error) {
			toast.error(error.statusText);
			return;
		} else {
			if (data) {
				toast.success("Task completed successfully");
			}
		}
		onClose();
	};
	const handleCheck = (e: { target: { checked: boolean } }, email: string) => {
		if (!filterEmails) {
			return;
		}
		e.target.checked ? !filterEmails.includes(email) && filterEmails.push(email) : filterEmails.splice(filterEmails.indexOf(email), 1);
		setFilterEmails([...filterEmails]);
	};
	const onClose = () => {
		setEditPopup(false);
		setUploadCertiPopup(false);
		setVerifyPopup(false);
		setLinkPopup(false);
		setEditAlias(false);
		setSlaveDetailsOpener({ ...slaveDetailsOpener, currentSelected: "null" });
		setSharePopup({ ...sharePopup, status: false });
		setLinkData({ email: "", OTP: "", slaveEmail: "", isSlaveVerified: false, viewOTP: false });
	};
	React.useEffect(() => {
		if (user.email === "" || token == "") {
			return;
		}
		if (error) {
			toast.error(error.message);
		}
		getData();
	}, [user.email, user.name, editPopup, uploadCertiPopup, verifyPopup, linkPopup, editAlias]);
	return (
		<>
			{loaded ? (
				<div className="master w-full h-full flex bg-sky-100 flex-col">
					<Header profileName={userProfile.name}>
						<div className="autocompleteContiner bg-transparent flex justify-center ">
							<div className="autocomplete bg-transparent ">
								<AutoComplete data={certiData[`${user.email}`]} />
							</div>
						</div>
					</Header>
					<div className="flex relative justify-center items-center flex-col overflow-hidden mainDashBoard w-full">
						<div className="head_container_DBID w-full h-full p-[0rem] pt-[1rem] pr-[0rem]">
							<CertificateGallery
								certiData={cacheCertidata}
								setAlias={setAlias}
								setEditAlias={setEditAlias}
								sharePopup={sharePopup}
								editAlias={editAlias}
								onClose={onClose}
								alias={alias}
								isClicked={isClicked}
								setIsClicked={setIsClicked}
								handleSubmit={handleSubmit}
							/>
							<div className="rightPart__sub0_container_DBID bg-transparent flex flex-col gap-y-[2rem] justify-start items-center px-[1rem] ">
								<Form
									label={
										<div className="flex flex-col justify-center items-center">
											<Avatar {...helper.stringAvatar(userProfile.name)} />
											<span className="">{userProfile.name}</span>
										</div>
									}
									isPopup={true}
									headingProps={{ className: `${headingSizes.h4} 	${PrimaryText[900]} p-1` }}
									fields={dashboardIndiUtils.dashboardIndiUtil(userProfile)}
									level1PrimaryProps={{
										className: `right_sub1_container_DBID flex flex-col h-[100%] justify-center w-full gap-y-[1rem]`,
									}}
									level2PrimaryProps={{
										className: `left_right_sub2_container_DBID p-[2rem] w-full ${PrimaryBG[50]} items-center justify-between rounded-none border-[0.1rem] rounded-lg flex flex-col gap-x-[4rem] ${PrimaryBorder[900]}`,
									}}
								/>

								<div className="bottomRightBar w-full flex flex-col max-h-[calc(62% - 0px)] gap-y-[2rem] items-center overflow-scroll">
									<RollDown label="Action Buttons">
										<>
											<button
												onClick={() => {
													!userProfile.isVerified ? toast.error("verify account first") : setUploadCertiPopup(true);
												}}
												className={`${PrimaryBG[50]} ${PrimaryText[900]} buttonBarButtons  flex items-center gap-x-[1rem] w-[100%] py-[0.5rem] px-[1rem] rounded-md ${headingSizes.h4} hover:${PrimaryText[900]} border-b-[.1rem] border-slate-300`}>
												{
													<>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															version="1.1"
															xmlnsXlink="http://www.w3.org/1999/xlink"
															x="0"
															y="0"
															viewBox="0 0 24 24"
															xmlSpace="preserve"
															className="w-[3rem]">
															<g transform="matrix(1.0599999999999992,0,0,1.0599999999999992,-0.7199999999999918,-0.7200064587593005)">
																<path
																	d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
																	fill="#008080"
																	data-original="#000000"
																	className=""></path>
																<path
																	d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
																	fill="#008080"
																	data-original="#000000"
																	className=""></path>
															</g>
														</svg>
													</>
												}
												Upload Certificate
											</button>
											{userProfile.isVerified == false ? (
												<button
													onClick={() => {
														handleRequestOtp();
													}}
													className={`${PrimaryBG[50]} buttonBarButtons flex items-center gap-x-[1rem] ${PrimaryText[900]} w-[100%] p-[0.5rem] rounded-md ${headingSizes.h4}  border-b-[.1rem]  border-slate-300`}>
													<svg
														className="w-[3.5rem]"
														xmlns="http://www.w3.org/2000/svg"
														version="1.1"
														xmlnsXlink="http://www.w3.org/1999/xlink"
														x="0"
														y="0"
														viewBox="0 0 24 24"
														xmlSpace="preserve">
														<g>
															<path
																d="M11.02 22H.5a.5.5 0 0 1-.486-.621l.54-2.17a3.202 3.202 0 0 1 2.109-2.274l4.018-1.339c.596-.249.968-1.147 1.006-2.471-.46-.418-1.447-1.438-1.447-2.484 0-.367-.123-.442-.124-.443-.152-.041-.232-.135-.291-.282-.05-.126-.485-1.242-.485-1.996 0-.04.005-.08.015-.119.063-.259.215-.519.444-.677l.021-.401c.025-.494.06-1.153.06-1.973C5.88 2.874 8.174 0 11 0c2.557 0 3.795 1.362 4 2.242.625.346 1.17.917 1.17 2.508v2.377c.248.171.401.445.465.634a.504.504 0 0 1 .025.159c0 .276-.224.52-.5.52a.485.485 0 0 1-.494-.405.304.304 0 0 0-.059-.082c-.275 0-.438-.207-.438-.483V4.75c0-1.305-.419-1.516-.669-1.641-.151-.077-.47-.237-.47-.619C14.012 2.189 13.17 1 11 1 8.62 1 6.88 3.466 6.88 4.75c0 .842-.035 1.518-.063 2.025-.014.289-.027.522-.027.695a.501.501 0 0 1-.449.498c.016.41.221 1.053.352 1.412.268.19.547.578.547 1.26 0 .564.658 1.367 1.27 1.875.114.095.18.236.18.385 0 1.898-.589 3.188-1.659 3.632l-4.053 1.353a2.208 2.208 0 0 0-1.454 1.568L1.14 21h9.88a.5.5 0 0 1 0 1z"
																fill="#008080"
																data-original="#000000"
																className=""></path>
															<path
																d="M18 24a.485.485 0 0 1-.194-.04C17.568 23.861 12 21.454 12 16.536v-4.179c0-.214.137-.405.34-.474l5.5-1.857a.5.5 0 0 1 .32 0l5.5 1.857a.5.5 0 0 1 .34.474v4.179c0 4.918-5.568 7.325-5.806 7.425A.502.502 0 0 1 18 24zm-5-11.284v3.82c0 3.785 4.055 5.958 5 6.414.944-.457 5-2.638 5-6.414v-3.82l-5-1.688z"
																fill="#008080"
																data-original="#000000"
																className=""></path>
															<path
																d="m17.5 19-.027-.001a.5.5 0 0 1-.363-.187l-2-2.5a.5.5 0 0 1 .781-.625l1.65 2.064 3.105-3.105a.5.5 0 0 1 .707.707l-3.5 3.5A.494.494 0 0 1 17.5 19z"
																fill="#008080"
																data-original="#000000"
																className=""></path>
														</g>
													</svg>
													Verify Account
												</button>
											) : (
												<button
													onClick={() => {
														setLinkPopup(true);
													}}
													className={`${PrimaryBG[50]} ${PrimaryText[900]} buttonBarButtons  flex items-center gap-x-[1rem] w-[100%] py-[0.5rem] px-[1rem] rounded-md ${headingSizes.h4} hover:${PrimaryText[900]} border-b-[.1rem] border-slate-300`}>
													{
														<>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																version="1.1"
																xmlnsXlink="http://www.w3.org/1999/xlink"
																x="0"
																y="0"
																viewBox="0 0 512 512"
																xmlSpace="preserve"
																className="w-[3rem]">
																<g>
																	<path
																		d="m476.855 307.148-29.937-29.933-42.426 42.426 29.938 29.933c23.39 23.395 23.39 61.465 0 84.856-23.39 23.39-61.461 23.39-84.856 0L192.36 277.215l-42.425 42.426 157.214 157.214c46.86 46.86 122.848 46.86 169.707 0s46.86-122.847 0-169.707zm0 0"
																		fill="#008080"
																		data-original="#000000"
																		className="hovered-path"></path>
																	<path
																		d="M162.426 434.43c-23.395 23.39-61.465 23.39-84.856 0-23.39-23.39-23.39-61.461 0-84.856L234.785 192.36l-42.426-42.425L35.145 307.148c-46.86 46.86-46.86 122.848 0 169.707s122.847 46.86 169.707 0l29.933-29.937-42.426-42.426zM349.574 77.57c23.395-23.39 61.465-23.39 84.856 0 23.39 23.39 23.39 61.461 0 84.856L277.215 319.64l42.426 42.425 157.214-157.214c46.86-46.86 46.86-122.848 0-169.707s-122.847-46.86-169.707 0l-29.933 29.937 42.426 42.426zm0 0"
																		fill="#008080"
																		data-original="#000000"
																		className="hovered-path"></path>
																	<path
																		d="m65.082 234.785 42.426-42.426-29.938-29.933c-23.39-23.395-23.39-61.465 0-84.856 23.39-23.39 61.461-23.39 84.856 0l163.426 163.426 42.425-42.426L204.852 35.145c-46.86-46.86-122.848-46.86-169.707 0s-46.86 122.847 0 169.707zm0 0"
																		fill="#008080"
																		data-original="#000000"
																		className="hovered-path"></path>
																</g>
															</svg>
														</>
													}
													Link Account
												</button>
											)}
										</>
									</RollDown>
									{slaveDetails !== undefined && (
										<>
											<div
												className={`SlaveDetailsContainer ${PrimaryBG[50]} p-[0rem] border-[1px] ${PrimaryBorder[900]} flex flex-col items-center justify-center w-full`}>
												<div
													onClick={() => {
														setSlaveDetailsOpener({ ...slaveDetailsOpener, rollDown: !slaveDetailsOpener.rollDown });
														setLinkedAccountPopupForTableSize(!linkedAccountPopupForTableSize);
													}}
													className="optionsOpener p-[2rem] py-[1rem] cursor-pointer flex items-center w-full justify-center gap-x-[2rem]">
													<img className={`w-[2rem] onlyForDesktop ${slaveDetailsOpener.rollDown ? "rotate-90" : ""}`} src={assets.Forward} alt="img" />
													<span className={`${headingSizes.h4}`}>Linked Accounts</span>
												</div>
												{slaveDetailsOpener.rollDown === true && (
													<div className="w-full flex-col h-fit onlyForDesktop">
														{slaveDetails.map((item: userDetailsDashboardIndi) => {
															if (!slaveDetailsOpener || item.statusFlag == "") {
																return;
															}
															return (
																<div className="soloSlave w-full relative">
																	{slaveDetailsOpener.currentSelected == item.email ? (
																		<Form
																			label={
																				<div className="flex flex-col justify-center items-center">
																					<Avatar {...helper.stringAvatar(item.name)} />

																					<span className="">{item.name}</span>
																				</div>
																			}
																			onClose={onClose}
																			headingProps={{ className: `${headingSizes.h4} ${PrimaryText[900]} p-1` }}
																			fields={dashboardIndiUtils.dashboardIndiUtil(item)}
																			level1PrimaryProps={{
																				className: `right_sub1_container_DBID flex flex-col h-[100%] justify-center w-full gap-y-[1rem]`,
																			}}
																			level2PrimaryProps={{
																				className: `left_right_sub2_container_DBID border-b-[0.1rem] border-slate-400 p-[2rem] w-full ${PrimaryBG[50]} items-center justify-between rounded-lg  rounded-lg flex flex-col gap-x-[4rem] `,
																			}}
																		/>
																	) : (
																		<div className={`flex border-b-[0.1rem] hover:${PrimaryBG[300]} border-slate-400 items-center justify-between`}>
																			<div
																				onClick={() => {
																					setSlaveDetailsOpener({ ...slaveDetailsOpener, currentSelected: item.email });
																				}}
																				className={`innerDiv bg-transparent ${PrimaryText[900]} w-[100%] flex items-center cursor-pointer justify-start px-[2rem] py-[1rem] hover:${PrimaryText[900]}`}>
																				<span className={`${headingSizes.h5}`}>{item.email}</span>
																			</div>
																			{filterEmails?.includes(item.email) ? (
																				<input
																					checked
																					className="styled-checkbox"
																					id={item.email}
																					type="checkbox"
																					onChange={(e: { target: { checked: boolean } }) => {
																						handleCheck(e, item.email);
																					}}
																				/>
																			) : (
																				<input
																					className="styled-checkbox"
																					id={item.email}
																					type="checkbox"
																					onChange={(e: { target: { checked: boolean } }) => {
																						handleCheck(e, item.email);
																					}}
																				/>
																			)}

																			<label htmlFor={item.email}></label>
																		</div>
																	)}
																	{}
																</div>
															);
														})}
													</div>
												)}
											</div>
										</>
									)}
								</div>
							</div>

							{editPopup == true && userProfile.isVerified == true ? (
								<Popup props1={{ className: "popCss" }} height="auto">
									<Form
										fields={dashboardIndiUtils.editProfileUtil(userProfile, setUserProfile)}
										headingProps={props.headingProps}
										label="Edit Profile"
										isPopup={false}
										onClose={onClose}
										level2PrimaryProps={{
											className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
										}}
										level1PrimaryProps={props.level1PrimaryProps}
										submitLabel="Upadte Changes"
										submitProps={{
											className: `${stylings.primaryButtonCssDark} w-full`,
											onClick: () => {
												handleSubmit("profile/update/indi", userProfile);
											},
										}}
									/>
								</Popup>
							) : (
								<></>
							)}
							{uploadCertiPopup == true && userProfile.isVerified == true ? (
								<Popup props1={{ className: "popCss" }} height="auto">
									<Form
										fields={dashboardIndiUtils.uploadCertiUtil(uploadCertiDetilas, setUploadCertiDetails)}
										headingProps={props.headingProps}
										label="Upload Certificate"
										isPopup={false}
										onClose={onClose}
										isClicked={isClicked}
										level2PrimaryProps={{
											className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
										}}
										level1PrimaryProps={props.level1PrimaryProps}
										submitLabel="Upload"
										submitProps={{
											disabled: isClicked,
											className: `${stylings.primaryButtonCssDark} w-full`,
											onClick: () => {
												setIsClicked(true);
												handleSubmit("upload/indi", uploadCertiDetilas);
											},
										}}
									/>
								</Popup>
							) : (
								<></>
							)}
							{linkedAccountPopupForTableSize && slaveDetails !== undefined && (
								<div className="onlyForTablates">
									<Popup props1={{ className: "popCss" }} height="auto">
										<div className="w-full flex flex-col h-fit">
											<div className={`w-full flex items-center justify-center border-b-[0.1rem] ${PrimaryBorder[900]} py-[2rem]`}>
												<span className={`text-[2rem] ${PrimaryText[900]}`}>Linked Accounts</span>
												<svg
													width={20}
													height={20}
													className="absolute top-8 right-8 cursor-pointer text-white z-10 "
													viewBox="0 0 320.591 320.591"
													onClick={() => {
														setLinkedAccountPopupForTableSize(false);
													}}>
													<path
														d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"
														fill="#000"
													/>
													<path
														d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"
														fill="#000"
													/>
												</svg>
											</div>
											{slaveDetails.map((item: userDetailsDashboardIndi) => {
												if (!slaveDetailsOpener || item.statusFlag == "") {
													return;
												}
												return (
													<div className="soloSlave w-full relative">
														{slaveDetailsOpener.currentSelected == item.email ? (
															<Form
																label={
																	<div className="flex flex-col justify-center items-center">
																		<Avatar {...helper.stringAvatar(item.name)} />
																		<span className="">{item.name}</span>
																	</div>
																}
																onClose={onClose}
																headingProps={{ className: `${headingSizes.h4} ${PrimaryText[900]} p-1` }}
																fields={dashboardIndiUtils.dashboardIndiUtil(item)}
																level1PrimaryProps={{
																	className: `right_sub1_container_DBID flex flex-col h-[100%] justify-center w-full gap-y-[1rem]`,
																}}
																level2PrimaryProps={{
																	className: `left_right_sub2_container_DBID border-b-[0.1rem] border-slate-400 p-[2rem] w-full ${PrimaryBG[50]} items-center justify-between rounded-lg  rounded-lg flex flex-col gap-x-[4rem] `,
																}}
															/>
														) : (
															<div className={`flex border-b-[0.1rem] hover:${PrimaryBG[300]} border-slate-400 items-center justify-between`}>
																<div
																	onClick={() => {
																		setSlaveDetailsOpener({ ...slaveDetailsOpener, currentSelected: item.email });
																	}}
																	className={`innerDiv bg-transparent ${PrimaryText[900]} w-[100%] flex items-center cursor-pointer justify-start px-[2rem] py-[1rem] hover:${PrimaryText[900]}`}>
																	<span className={`${headingSizes.h5}`}>{item.email}</span>
																</div>
																{filterEmails?.includes(item.email) ? (
																	<input
																		checked
																		className="styled-checkbox"
																		id={`popup ${item.email}`}
																		type="checkbox"
																		onChange={(e: { target: { checked: boolean } }) => {
																			handleCheck(e, item.email);
																		}}
																	/>
																) : (
																	<input
																		className="styled-checkbox"
																		id={`popup ${item.email}`}
																		type="checkbox"
																		onChange={(e: { target: { checked: boolean } }) => {
																			handleCheck(e, item.email);
																		}}
																	/>
																)}
																<label htmlFor={`popup ${item.email}`}></label>
															</div>
														)}
														{}
													</div>
												);
											})}
										</div>
									</Popup>
								</div>
							)}
							{verifyPopup == true ? (
								<Popup props={{ className: "popCss" }} height="auto" width={window.innerWidth >= 900 ? "30vw" : "80vw"}>
									<Form
										fields={verifyUtils(verify, setVerify)}
										headingProps={props.headingProps}
										label="Verify Email"
										isPopup={false}
										onClose={onClose}
										level2PrimaryProps={{
											className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
										}}
										level1PrimaryProps={props.level1PrimaryProps}
										submitLabel="Verify"
										submitProps={{
											className: `${stylings.primaryButtonCssDark} w-full`,
											onClick: () => {
												handleVerifySubmit();
											},
										}}
									/>
								</Popup>
							) : (
								<></>
							)}
							{linkPopup == true ? (
								<Popup props1={{ className: "popCss" }} height="auto">
									<Form
										fields={linkUtils(linkData, setLinkData, toast)}
										headingProps={props.headingProps}
										label="Link Account"
										isPopup={false}
										onClose={onClose}
										level2PrimaryProps={{
											className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
										}}
										level1PrimaryProps={props.level1PrimaryProps}
										submitLabel="Submit"
										submitProps={{
											className: `${stylings.primaryButtonCssDark} w-full`,
											onClick: () => {
												handleSubmit("link/account", {
													mainEmail: linkData.email,
													slaveEmail: linkData.slaveEmail,
													OTP: linkData.OTP,
													email: user.email,
													token: token.email,
												});
											},
										}}
									/>
								</Popup>
							) : (
								<></>
							)}
						</div>

						<SideBar
							fields={sideBarDetails.dashboardIndi(setEditPopup, setUploadCertiPopup)}
							desptopWidth={`w-[27rem]`}
							nonDesktopWidth={`w-[27rem]`}
						/>
					</div>
				</div>
			) : (
				<>
					<InstLoader />
				</>
			)}
		</>
	);
};

export default Dashboard