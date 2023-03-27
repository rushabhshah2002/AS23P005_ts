import React, { useState } from "react";
import { userContext } from "../../context/usercontext";
import { tokenContext } from "../../context/tokenContext";
import { updateContext } from "../../utils/updateContext";
import useGetData from "../../hooks/useGetProfileData";
import { useGetApi } from "../../hooks/useGetApi";
import { createCertiTemplateInterface, currentlySelectedInterface, dataEnteredInterface } from "../../utils/types";
import { toast } from "react-toastify";
import { props } from "../../utils/utils.props";
import { stylings } from "../../utils/utils.css";
import MainLayout from "../../components/PageLayouts/MainLayout";
import LeftLayout from "../../components/PageLayouts/LeftLayout";
import RightLayout from "../../components/PageLayouts/RightLayout";
import "./CreateCertificate.scss";
import { sideBarDetails } from "../../utils/utils.sideBar";
import { PrimaryBG , PrimaryText } from "../../utils/utils.primaryColor";
import SelectCertificate from "../../components/SelectCertiFicate/SelectCertificate";
import { issueDetailsForCerti } from "../../utils/utils.createCerti";
import InstLoader from "../../components/InstLoader/InstLoader";
import Form from "../../components/form/form";
import SideBar from "../../components/SideBar/SideBar";
import { helper } from "../../utils/utils.helper";
import Header from "../../components/Header/Header";
import { ApiHelper } from "../../utils/ApiHelper";
import { useNavigate } from "react-router";
import { verifiers } from "../../utils/verifier";
const CreateCertificate: React.FC = () => {
	const { user, setUser } = React.useContext(userContext);
	const { token } = React.useContext(tokenContext);
	const [certiData, setCertiData] = React.useState<createCertiTemplateInterface>({});
	const [error, setError] = React.useState<any>();	
	let [isClicked, setIsClicked] = React.useState<boolean>(false);
	const [dataEntered, setDataEntred] = useState<dataEnteredInterface>({
		core: { certiTempId: "", instituteEmail: "", repEmail: "", recEmail: "" },
		text: null,
		image: null,
		qr: undefined,
		meta: undefined,
	});
	const navigate = useNavigate();
	const [load, setLoad] = React.useState<boolean>(false);
	const [fileSelectedName , setFileSelectedName] = React.useState<{[key : number] : string}>();
	const [currentSelectedStatus, setCurrentSelectedStatus] = useState<currentlySelectedInterface>({
		selectedTempData: null,
		selected: false,
	});
	const getValueForImageLabel = (ids : number)=>
	{
		if(!fileSelectedName)
		{
			return currentSelectedStatus?.selectedTempData?.image[ids-1].alias
		}
		else if(fileSelectedName[ids])
		{
			return fileSelectedName[ids]
		}
		else
		{
			return currentSelectedStatus?.selectedTempData?.image[ids-1].alias
		}
	}
	updateContext(userContext, tokenContext);
	useGetData(true, user, setUser, token); 
	useGetApi(
		"create/template",
		{ email: user.email, instEmail: user.instEmail, token: token },
		setCertiData,
		setError,
		setLoad,
		user.email,
		token,
		[]
	);
	const handleSubmit = async () => {
		setIsClicked(true);
		if(!verifiers.isEmail(dataEntered.core.recEmail)){
			toast.error("Please fill all the fields correctly");
			setIsClicked(false);
			return;
		}
		const { data, error, loaded } = await ApiHelper(
			"create/certi",
			{ ...dataEntered, email: user.email, token: token, instEmail: user.instEmail },
			[]
		);
		if (loaded) {					
		if (error) {
			toast.error(error.statusText);
			setIsClicked(false);
			return;
		} else {
			if (data) {
				toast.success("Task completed successfully");
				navigate("/dashboardinst");
				setIsClicked(false);
			}
		}		
	}
	};

	React.useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);
	return (
		<div className="w-full h-full">
			{!load ? <InstLoader/> : <div className={`h-full w-full flex flex-col ${PrimaryBG[100]}`}>
				<Header profileName={user.instEmail}> 	<div className="autocomplete bg-transparent w-[40%] flex justify-center ">
					<span className={`text-[3rem] ${PrimaryText[900]}`}>Create Certificate</span>
				</div></Header>
			<div className="w-full relative masterCC h-full">
			<div className="createCertificate w-full h-full">
							{!currentSelectedStatus.selected ? (
								<SelectCertificate certiData = {certiData} dataEntered={dataEntered} setDataEntred = {setDataEntred} currentSelectedStatus = {currentSelectedStatus} setCurrentSelectedStatus = {setCurrentSelectedStatus} user = {user}/>
							) : (
								<div className="w-full h-full">	
									<MainLayout>
										<LeftLayout coustomClassName="leftLayout7_3">
										<div className="bottomCreateCertificate gap-y-[2rem] flex-1 flex-col-reverse flex w-full h-full">
											<div className={`leftSideCC bg-white flex-[6] flex flex-col items-center overflow-scroll`}>
												<h1 className={stylings.primaryHeadingCss}>File Desk</h1>
												<div className={`w-full flex flex-col max-h-[45vh] overflow-scroll items-center gap-y-[2rem] p-[1rem]`}>
													{currentSelectedStatus.selectedTempData?.image.map((item, ids) => {
														return (
															<div className={`${stylings.level0PrimaryCss} items-center w-full `}>
																<label
																	className="text-[2rem] text-sky-900 border-[2px] w-full border-sky-900 rounded-md overflow-hidden text-center h-[4rem]"
																	htmlFor={`upload${ids}`}>
																		{getValueForImageLabel(ids+1)}
																</label>
																<input
																	type="file"
																	id={`upload${ids}`}
																	className="hidden"
																	onChange={async (e: any) => {
																		setDataEntred({
																			...dataEntered,
																			image: {
																				...dataEntered?.image,
																				[ids + 1]: { ...item, val: String(await helper.fileToBase64(e.target?.files ? e.target.files[0] : null)) },
																			},
																		});
																		setFileSelectedName({...fileSelectedName , [ids+1] : e.target.files[0].name});
																	}}
																/>
															</div>
														);
													})}
												</div>
											</div>
											<div className={`rightSideCC flex-[4] ${PrimaryBG[100]}`}>
												<div className="w-[100%]">
													<Form
														label="Emails"
														isPopup={true}														
														headingProps={props.headingProps}
														fields={issueDetailsForCerti(dataEntered, setDataEntred)}
														level2PrimaryProps={{
															className: `${stylings.level2PrimaryCss} border-[0] rounded-none`,
														}}
														level1PrimaryProps={{
															className: `${stylings.level1PrimaryCss} justify-between p-[3rem]`,
														}}
													/>
												</div>
											</div>
										</div>
										</LeftLayout>
										<RightLayout coustomClassName="rightLayout7_3">
										<div className={`cretiDetailsCC bg-white h-fit flex flex-1 w-full flex-col ${stylings.level2PrimaryCss} h-[2rem] rounded-none`}>		
											<h1 className={stylings.primaryHeadingCss}>Text Desk</h1>
											<div className={`w-full flex flex-col h-fit max-h-[71vh] pt-[2rem] overflow-scroll items-center gap-y-[2rem] `}>
												{currentSelectedStatus.selectedTempData?.text.map((item, ids) => {
													return (
														<div className={stylings.level0PrimaryCss}>
															<label htmlFor={`input ${item.counter}`} id={`label_input ${item.counter}`} className={stylings.primaryLabelCss}>
																{item.alias}
															</label>
															<input
																className={stylings.primaryInputCssForLoginSignup}
																id={`input ${item.counter}`}																																
																type="text"																
																onFocus={(e: { target: { value: string } }) => {
																	helper.focus(e);
																}}
																onBlur={(e: { target: { value: string } }) => {
																	helper.blur(e);
																}}																
																onChange={(e: { target: { value: string } }) => {																	
																	setDataEntred({
																		...dataEntered,
																		text: { ...dataEntered?.text, [ids + 1]: { ...item, val: e.target.value } },
																		qr: { ...currentSelectedStatus.selectedTempData?.qr[0] },
																		meta: { ...currentSelectedStatus.selectedTempData?.meta[0] },
																	});
																	helper.checkValForLabel(e);																	
																}}																														
																></input>																
														</div>
													);
												})}
											</div>
											<div className="buttonBarCreateCerti flex w-full gap-x-[2rem]">
											<button className={`${stylings.primaryButtonCssDark} flex-1`}	
											disabled={isClicked}										
											 onClick={()=>
												{																	
													setDataEntred({
														...dataEntered,
														qr: { ...currentSelectedStatus.selectedTempData?.qr[0] },
														meta: { ...currentSelectedStatus.selectedTempData?.meta[0] },
													});
													setIsClicked(false);
													handleSubmit();													
												}}																							
												>
												submit
											</button>
											<button
												onClick={() => {
													setCurrentSelectedStatus({ ...currentSelectedStatus, selected: false });
												}}
												className={`${stylings.primaryButtonCssDark} flex-1`}>
												change template
											</button>
										</div>
										</div>
										</RightLayout>
									</MainLayout>
								</div>
								
							)}
							
							<SideBar fields={sideBarDetails.createcertificate()} desptopWidth={`w-[27rem]`} nonDesktopWidth={`w-[40rem]`} />
						</div>
			</div>
		</div>}
		
		</div>
	);
};

export default CreateCertificate;
