import React, { useState } from "react";
import { toast } from "react-toastify";
import { tokenContext } from "../../context/tokenContext";
import { userContext } from "../../context/usercontext";
import { useGetApi } from "../../hooks/useGetApi";
import useGetData from "../../hooks/useGetProfileData";
import { updateContext } from "../../utils/updateContext";
import { profileInst } from "../../utils/utils.profile";
import Form from "../../components/form/form";
import { headingSizes } from "../../utils/Utils.fontSize";
import { editProfileAddRepInterface, ShowProfipleInst, subChannelInterface } from "../../utils/types";
import { profileInstDetails, addSubChannelUtil } from "../../utils/Form/utils.dashaboardInst";
import Popup from "../../components/Popup/Popup";
import { PrimaryBG, PrimaryBorder, PrimaryText } from "../../utils/utils.primaryColor";
import { props } from "../../utils/utils.props";
import { stylings } from "../../utils/utils.css";
import InstLoader from "../../components/InstLoader/InstLoader";
import { ApiHelper } from "../../utils/ApiHelper";
import SideBar from "../../components/SideBar/SideBar";
import { sideBarDetails } from "../../utils/utils.sideBar";
import Header from "../../components/Header/Header";
import MainLayout from "../../components/PageLayouts/MainLayout";
import LeftLayout from "../../components/PageLayouts/LeftLayout";
import RightLayout from "../../components/PageLayouts/RightLayout";
import "./profile.scss";
import { verifiers } from "../../utils/verifier";
import { useNavigate } from "react-router";
const Profile: React.FC = () => {
	const { user, setUser } = React.useContext(userContext);
	const { token } = React.useContext(tokenContext);
	const [error, setError] = React.useState<any>();
	const [data, setData] = React.useState<any>();
	const [load, setLoad] = React.useState<boolean>(false);
	const navigate = useNavigate();
	const [isClicked, setIsClicked] = React.useState<boolean>(false);
	const [profileData, setProfileData] = React.useState<ShowProfipleInst>({
		instituteEmail: "",
		instituteName: "",
		representativeEmail: "",
		identificationType: "",
		identificationNumber: "",
	});
	const [affiliates, setAffiliates] = React.useState<Array<any>>([]);
	const [addNewRepData, setAddNewRepData] = React.useState<editProfileAddRepInterface>({
		instituteEmail: "",
		instituteName: "",
		representativeEmail: "",
		identificationType: "",
		identificationNumber: "",
		repEmail: "",
		repName: "",
		repPhoneNo: "",
		repPassword: "",
	});
	const [addSubChannel, setAddSubChannel] = React.useState<subChannelInterface>({
		affiliatedEmail: "",
		instituteEmail: "",
		instituteName: "",
		identificationType: "",
		identificationNumber: "",
		representativeEmail: "",
		representativeName: "",
		representativePhoneNo: "",
		password: "",
		type: "",
	});
	const [editPopup, setEditPopup] = useState<boolean>(false);
	const [subChannelPopup, setSubChannelPopup] = useState<boolean>(false);
	updateContext(userContext, tokenContext);
	useGetData(true, user, setUser, token);
	useGetApi(
		"profile/inst",
		{ email: user.email, instEmail: user.instEmail, token: token },
		setData,
		setError,
		setLoad,
		user.email,
		token,
		[]
	);
	useGetApi(
		"addchannel/affiliates",
		{ email: user.email, instEmail: user.instEmail, token: token },
		setAffiliates,
		setError,
		setLoad,
		user.email,
		token,
		[subChannelPopup]
	);

	React.useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
		if (data) {
			setProfileData({
				instituteEmail: data.instEmail,
				identificationNumber: data.instIdentificationNo,
				instituteName: data.instName,
				identificationType: data.instIdentification,
				representativeEmail: data.repEmail,
			});
			setAddNewRepData({
				instituteEmail: data.instEmail,
				identificationNumber: data.instIdentificationNo,
				instituteName: data.instName,
				identificationType: data.instIdentification,
				representativeEmail: data.repEmail,
				repEmail: "",
				repName: "",
				repPhoneNo: "",
				repPassword: "",
			});
			setAddSubChannel({
				affiliatedEmail: data.instEmail,
				instituteEmail: "",
				instituteName: "",
				identificationType: "",
				identificationNumber: "",
				representativeEmail: "",
				representativeName: "",
				representativePhoneNo: "",
				password: "",
				type: 1,
			});
		}
	}, [error, data, subChannelPopup, editPopup]);

	const handleSubmit = async (route: string, details: any, encrypt: Array<string>) => {
		setIsClicked(true);
		switch (route) {
			case "profile/update/inst":
				if (
					!verifiers.isEmail(addNewRepData.repEmail) ||
					!verifiers.isName(addNewRepData.repName) ||
					!verifiers.isPhone(addNewRepData.repPhoneNo) ||
					!verifiers.isPassword(addNewRepData.repPassword)
				) {
					toast.error("Please fill all the fields correctly");
					setIsClicked(false);
					return;
				}
				break;
			case "addchannel/inst":
				if (
					!verifiers.isEmail(addSubChannel.instituteEmail) ||
					!verifiers.isName(addSubChannel.instituteName) ||
					!verifiers.isEmail(addSubChannel.representativeEmail) ||
					!verifiers.isName(addSubChannel.representativeName) ||
					!verifiers.isPhone(addSubChannel.representativePhoneNo) ||
					!verifiers.isPassword(addSubChannel.password)
				) {
					toast.error("Please fill all the fields correctly");
					setIsClicked(false);
					return;
				}
				break;
			default:
		}
		const { data, error, loaded } = await ApiHelper(
			route,
			{ ...details, token: token, email: user.email, instEmail: user.instEmail },
			encrypt
		);
		if (error) {
			toast.error(error.data.message);
			setIsClicked(false);
			return;
		}
		if (loaded && data) {
			//setProfileData(data);
			setIsClicked(false);
			toast.success("Profile updated successfully");
			if (route == "profile/update/inst") {
				toast.info("changed represenstative");
				localStorage.removeItem("token");
				localStorage.removeItem("email");
				localStorage.removeItem("instEmail");
				navigate("/");
			}
		}
		onClose();
	};

	const onClose = () => {
		setEditPopup(false);
		setSubChannelPopup(false);
	};

	return (
		<div className="w-full h-full">
			{!load ? <InstLoader/> : <div className={`w-full h-full flex ${PrimaryBG[100]} flex-col`}>
				<Header profileName={user.instEmail}> 	<div className="autocomplete bg-transparent w-[40%] flex justify-center ">
					<span className={`text-[3rem] ${PrimaryText[900]}`}>Profile-Affliates</span>
				</div></Header>
				<div className="relative mainEP w-full ">
					<div className="w-full h-full">
						<div className="h-full w-full relative">
							<MainLayout>
								<LeftLayout coustomClassName="leftLayout5_5" leftLayoutProps={{ className: "bg-white" }}><div className="left_part_EP w-full h-full p-[2rem] flex flex-col items-start justify-start gap-y-[2rem]">
									<Form
										label="Institute Details"
										isPopup={true}
										headingProps={{ className: `${headingSizes.h4} ${PrimaryText[900]} p-1` }}
										fields={profileInst(profileData)}
										level1PrimaryProps={{
											className: `right_sub1_container_DBID flex flex-col h-[100%] justify-center w-full gap-y-[0rem]`,
										}}
										level2PrimaryProps={{
											className: `left_right_sub2_container_DBID p-[2rem] w-full ${PrimaryBG[50]} items-center justify-between rounded-lg border-[.25rem] rounded-lg flex flex-col gap-x-[4rem] ${PrimaryBorder[900]}`,
										}}
									/>
									<button
										onClick={() => {
											setEditPopup(true);
										}}
										className={`${PrimaryBG[900]} text-white w-[100%] p-[0.5rem] rounded-md ${headingSizes.h4} hover:${PrimaryBG[900]} hover:${PrimaryText[900]} border-[.25rem]  ${PrimaryBorder[900]}`}>
										Edit Profile
									</button>

									<button
										onClick={() => {
											setSubChannelPopup(true);
										}}
										className={`${PrimaryBG[900]} text-white w-[100%] p-[0.5rem] rounded-md ${headingSizes.h4} hover:${PrimaryBG[900]} hover:${PrimaryText[900]} border-[.25rem]  ${PrimaryBorder[900]}`}>
										Add Sub Channel
									</button>
									{editPopup == true ? (
										<Popup height="auto" width={window.innerWidth >= 900 ? "30vw" : "80vw"}>
											<Form
												fields={profileInstDetails(addNewRepData, setAddNewRepData)}
												headingProps={props.headingProps}
												label="Edit Profile"
												isPopup={false}
												onClose={onClose}
												level2PrimaryProps={{
													className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
												}}
												level1PrimaryProps={props.level1PrimaryProps}
												submitLabel="Upadte Changes"
												isClicked={isClicked}
												submitProps={{
													disabled: isClicked,
													onClick: () => {
														handleSubmit("profile/update/inst", addNewRepData, []);
													},
												}}
											/>
										</Popup>
									) : (
										<></>
									)}
									{subChannelPopup == true ? (
										<Popup height="auto" width={window.innerWidth >= 900 ? "30vw" : "80vw"}>
											<Form
												fields={addSubChannelUtil(addSubChannel, setAddSubChannel)}
												headingProps={props.headingProps}
												label="Add Sub Channel"
												isPopup={false}
												onClose={onClose}
												level2PrimaryProps={{
													className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
												}}
												level1PrimaryProps={props.level1PrimaryProps}
												submitLabel="Add Channel"
												isClicked={isClicked}
												submitProps={{
													disabled: isClicked,
													onClick: () => {
														setIsClicked(true);
														handleSubmit("addchannel/inst", addSubChannel, ["representativeEmail", "password"]);
													},
												}}
											/>
										</Popup>
									) : (
										<></>
									)}
								</div></LeftLayout>
								<RightLayout coustomClassName="rightLayout5_5">	<div className={`container_right bg-white w-full h-full border-[0.1rem] min-w-[10%] flex justify-start`}>
									{/* <h1 className="text-[2rem] ${PrimaryText[900]}">Affilates</h1>*/}
									<div className="sub0_contianer_right w-full flex flex-col items-center justify-start">
										<h1 className={`${headingSizes.h2} ${PrimaryText[900]}`}></h1>
										<div className="sub1_container_right flex flex-wrap w-full gap-y-[2rem] overflow-scroll justify-around">
											<div className="flex h-fit flex-wrap w-full gap-[4rem] overflow-scroll affliates">
												{affiliates.map((column) => {
													return (
														<div className=" card_sub2_container_right border-[1px] border-grey-200 flex gap-x-[2rem] rounded-md bg-slate-200 p-[2rem] h-fit">
															<div className="leftPart_sub3_container_right">
																<h4 className="text-[1.7rem] text-black">Name : </h4>
																<h4 className="text-[1.7rem] text-black">Email : </h4>
																<h4 className="text-[1.7rem] text-black">Rep Email :</h4>
															</div>
															<div className="rightPart_sub2_container_right">
																<h4 className="text-[1.7rem] text-black">: {column.instName}</h4>
																<h4 className="text-[1.7rem] text-black">: {column.instEmail}</h4>
																<h4 className="text-[1.7rem] text-black">: {column.repEmail}</h4>
															</div>
														</div>
													);
												})}
											</div>

										</div>
									</div>
								</div></RightLayout>
							</MainLayout>
							<SideBar fields={sideBarDetails.editProfile()} desptopWidth={`w-[27rem]`} nonDesktopWidth={`w-[40rem]`} />
						</div>
					</div>
				</div>
			</div>}
		</div>
	);
};
export default Profile;
