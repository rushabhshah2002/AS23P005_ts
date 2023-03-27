import React, { useEffect, useState } from "react";
import { ApiHelper } from "../../utils/ApiHelper";
import { toast } from "react-toastify";
import SideBar from "../../components/SideBar/SideBar";
import { sideBarDetails } from "../../utils/utils.sideBar";
import { UploadCertificateInstitute } from "../../utils/types";
import Form from "../../components/form/form";
import Popup from "../../components/Popup/Popup";
import { dashboardInstDetails } from "../../utils/Form/utils.dashaboardInst";
import { PrimaryText } from "../../utils/utils.primaryColor";
import { props } from "../../utils/utils.props";
import { chartsApi, PieChartApi } from "../../utils/utils.struct";
import Charts from "../../components/Charts/Charts";
import { stylings } from "../../utils/utils.css";
import { userContext } from "../../context/usercontext";
import { tokenContext } from "../../context/tokenContext";
import { updateContext } from "../../utils/updateContext";
import useGetData from "../../hooks/useGetProfileData";
import { useGetApi } from "../../hooks/useGetApi";
import CertificateTable from "../../components/Table/Table";
import MainLayout from "../../components/PageLayouts/MainLayout";
import LeftLayout from "../../components/PageLayouts/LeftLayout";
import RightLayout from "../../components/PageLayouts/RightLayout";
import Header from "../../components/Header/Header";
import InstLoader from "../../components/InstLoader/InstLoader";
import "./dashboardInst.scss";
import { verifiers } from "../../utils/verifier";
const DashboardInst: React.FC = () => {
	const { user, setUser } = React.useContext(userContext);
	const { token } = React.useContext(tokenContext);
	const [uploadCertificateInfo, setUploadCertificateInfo] = React.useState<UploadCertificateInstitute>({
		instituteEmail: "",
		representativeEmail: "",
		dataUrl: "",
		receiverEmail: "",
		certificateImage: "",
		degree: "",
		CGPA: "",
	});
	const [uploadPopup, setUploadPopup] = useState(false);
	const [expand, setExpand] = useState(true);
	const [isClicked, setIsClicked] = React.useState<boolean>(false);
	const [data, setData] = React.useState<Array<any>>([]);
	const [error, setError] = React.useState<any>();
	const [loaded, setLoaded] = React.useState<boolean>(false);

	const colData = React.useMemo(() => [...data], [loaded, data]);
	updateContext(userContext, tokenContext);
	useGetData(true, user, setUser, token);
	useGetApi(
		"getcertificate/inst",
		{ email: user.email, token: token, instEmail: user.instEmail },
		setData,
		setError,
		setLoaded,
		user.email,
		token,
		[uploadPopup ]
	);
	const onClose = () => {
		setUploadPopup(false);
	};	
	useEffect(() => {
		setExpand(!expand);
	}, [SideBar]);
	React.useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
		setIsClicked(false);
		setUploadCertificateInfo({
			instituteEmail: user.instEmail,
			representativeEmail: user.email,
			dataUrl: "",
			receiverEmail: "",
			certificateImage: "",
			degree: "",
			CGPA: "",
		});
	}, [user.email, uploadPopup, error]);
	const handleSubmit = async () => {

		if (!verifiers.isEmail(uploadCertificateInfo.receiverEmail) ||
			!verifiers.isAlias(uploadCertificateInfo.degree)||
			!verifiers.isCGPA(uploadCertificateInfo.CGPA)
		) {
			toast.error("Please fill all the fields correctly");
			setIsClicked(false);
			return;
		}
		else if (
			uploadCertificateInfo.instituteEmail == "" ||
			uploadCertificateInfo.representativeEmail == "" ||
			uploadCertificateInfo.receiverEmail == "" ||
			uploadCertificateInfo.certificateImage == "" ||
			uploadCertificateInfo.degree == "" ||
			uploadCertificateInfo.CGPA == ""
		) {
			toast.error("Please Fill All Fields");
			setIsClicked(false);
			return;
		}
		let { data, error, loaded } = await ApiHelper(
			"upload/inst",
			{ ...uploadCertificateInfo, email: user.email, token: token, instEmail: user.instEmail },
			[]
		);
		if (error) {
			toast.error(error.message);
			setIsClicked(false);
		} else {
			if (loaded) {
				setIsClicked(false);

				if (data == null) {
					toast.error("Invalid Information");
				} else if (data !== null && loaded) {
					toast.success("Certificate uploaded successfully !");
				}
				setUploadPopup(false);
			}
		}
	};
	return (
		<div className="w-full h-full">
			{!loaded ? <InstLoader/> : <div className="master w-full h-full flex bg-sky-100 flex-col">
				<Header profileName={user.instEmail}> 	<div className="autocomplete bg-transparent w-[40%] flex justify-center ">
					<span className={`text-[3rem] ${PrimaryText[900]}`}>Dashboard</span>
				</div></Header>
				<div className="w-full h-[100%] relative">
					<MainLayout>
						<LeftLayout>
							<div className="chartsContianer w-full h-full flex overflow-x-hidden items-center bg-white overflow-y-scroll">
								<div className="chartContiner flex flex-col items-center">
									<Charts data={chartsApi} type="BAR" />
								</div>
								<div className="chartContiner flex flex-col items-center">
									<Charts data={chartsApi} type="LINE" />
								</div>
								<div className={`chartContiner flex flex-col items-center `}>
									<span className="text-[2rem]">Credits Track</span>

									<div className="chart w-[100%] h-[100%] flex flex-col items-center">

										<Charts data={PieChartApi} type="PIE" niddleValue={130} />
									</div>
									<div className="div flex items-center gap-[1rem] justify-between w-full px-[2rem]">
										<div className="indentifier flex items-center gap-[1rem]"><svg height="15" width="15">
											<circle cx="10" cy="10" r="5" stroke="transparent" stroke-width="3" fill="red" />
										</svg> <span className="text-[2rem]">low</span></div>
										<div className="indentifier flex items-center gap-[1rem]"><svg height="15" width="15">
											<circle cx="10" cy="10" r="5" stroke="transparent" stroke-width="3" fill="green" />
										</svg><span className="text-[2rem]">medium</span></div>
										<div className="indentifier flex items-center gap-[1rem]"><svg height="15" width="15">
											<circle cx="10" cy="10" r="5" stroke="transparent" stroke-width="3" fill="blue" />
										</svg> <span className="text-[2rem]">high</span></div>
									</div>
								</div>
							</div>
						</LeftLayout>
						<RightLayout>
							<div className="certificateContainer w-full h-full bg-white px-[4rem]">
								<CertificateTable data={colData ? colData : []}></CertificateTable>
							</div>
						</RightLayout>
					</MainLayout>
					<SideBar fields={sideBarDetails.dashboardInst(setUploadPopup)} desptopWidth={`w-[27rem]`} nonDesktopWidth={`w-[40rem]`} />
					{uploadPopup == true && (
						<Popup props1={{ className: "popCss" }} height="auto" >
							<Form
								label="Upload Certificate"
								level1PrimaryProps={props.level1PrimaryProps}
								level2PrimaryProps={{ className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]` }}
								headingProps={props.headingProps}
								fields={dashboardInstDetails(uploadCertificateInfo, setUploadCertificateInfo)}
								submitLabel="Upload"
								isClicked={isClicked}
								isPopup={false}
								submitProps={{
									className: `${stylings.primaryButtonCssDark} w-[40%]`,
									disabled: isClicked,
									onClick: () => {
										setIsClicked(true);
										handleSubmit();
									},
								}}
								onClose={onClose}
							/>
						</Popup>
					)}
				</div>
			</div>}

		</div>

	);
};
export default DashboardInst;
