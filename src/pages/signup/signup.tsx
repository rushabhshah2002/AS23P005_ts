import React from "react";
import { userContext } from "../../context/usercontext";
import { tokenContext } from "../../context/tokenContext";
import Form from "../../components/form/form";
import { signupDetailsInd, signupDetailsInst, signupDetailsRep } from "../../utils/Form/utils.signup";
import { SignUpInd, SignUpInst } from "../../utils/types";
import { ApiHelper } from "../../utils/ApiHelper";
import "./signUp.scss";
import { props } from "../../utils/utils.props";
import { toast } from "react-toastify";
import { decrypt } from "../../utils/encyption";
import { assets } from "../../utils/utils.assets";
import { stylings } from "../../utils/utils.css";
import {PrimaryText } from "../../utils/utils.primaryColor";
import { useNavigate } from "react-router";
import { verifiers } from "../../utils/verifier";

const Signup: any = () => {
	const [userType, setUserType] = React.useState<string>("Individual");
	const { user, setUser } = React.useContext(userContext);
	const signupDetailsStruct: SignUpInd = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNo: "",
		type: 0,
		status: 0,
		terms: false,
	};
	const isignupDetailsStruct = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNo: "",
		instituteEmail: "",
		instituteName: "",
		instituteIdentification: "",
		instituteIdentificationType: "",
		type: 1,
		status: 0,
		terms: false,
	};
	const { setToken } = React.useContext(tokenContext);
	const navigate = useNavigate();
	const [signupDetails, setSignupDetails] = React.useState<SignUpInd>(signupDetailsStruct);
	const [stage, setStage] = React.useState<number>(0);
	const [signupInst, setSignupInst] = React.useState<SignUpInst>(isignupDetailsStruct);
	const [isClicked, setIsClicked] = React.useState<boolean>(false);
	React.useEffect(() => {
		setSignupInst({
			type: 1,
			status: 0,
			terms: false,
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			phoneNo: "",
			instituteEmail: "",
			instituteName: "",
			instituteIdentification: "",
			instituteIdentificationType: "",
		});
		setSignupDetails({
			type: 0,
			status: 0,
			terms: false,
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			phoneNo: "",
		});
	}, [userType]);

	const handleSubmit = async () => {
		setIsClicked(true);
		if (userType === "Individual") {
			if (
				!verifiers.isName(signupDetails.name) ||
				!verifiers.isEmail(signupDetails.email) ||
				!verifiers.isPassword(signupDetails.password) ||
				!verifiers.isPhone(signupDetails.phoneNo)
			) {
				toast.error("Please fill all the fields correctly");
				setIsClicked(false);
				return;
			}
			if (signupDetails.confirmPassword !== signupDetails.password) {
				toast.error("Passwords do not match");
				setIsClicked(false);
				return;
			}
			if (!signupDetails.terms) {
				toast.error("Please check the terms and conditions to continue");
				setIsClicked(false);
				return;
			}
			let { data, error, loaded } = await ApiHelper("auth/register", signupDetails, ["password", "email"]);
			if (error) {
				toast.error(error.data.message);
				setIsClicked(false);
				return;
			}
			if (data == null) {
				toast.error("user already exists");
				setIsClicked(false);
				return;
			}
			if (loaded && data != null) {
				setUser({ ...user, email: signupDetails.email, name: signupDetails.name, type: 0 });
				setToken(decrypt(data.token, "ENCRYPT"));
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", signupDetails.email);
				toast.success("signed up successfully");
				navigate("/dashboard");
			}
		}
		if (userType === "Institute") {
			// add validation
			if (
				!verifiers.isName(signupInst.name) ||
				!verifiers.isEmail(signupInst.email) ||
				!verifiers.isPassword(signupInst.password) ||
				!verifiers.isPhone(signupInst.phoneNo) ||
				!verifiers.isEmail(signupInst.instituteEmail) ||
				!verifiers.isName(signupInst.instituteName) ||
				signupDetails.confirmPassword !== signupDetails.password
			) {
				toast.error("Please fill all the fields");
				setIsClicked(false);
				return;
			}
			if (signupInst.confirmPassword !== signupInst.password) {
				toast.error("Passwords do not match");
				setIsClicked(false);
				return;
			}

			if (signupInst.terms == false) {
				toast.error("Please check the terms and conditions to continue");
				setIsClicked(false);
				return;
			}
			let { data, error, loaded } = await ApiHelper("auth/register", signupInst, ["password", "email"]);
			if (error) {
				toast.error(error.data.message);
				setIsClicked(false);
				return;
			}
			if (data == null) {
				toast.error("user already exists");
				setIsClicked(false);
				return;
			}
			if (loaded && data != null) {
				setUser({ ...user, instEmail : signupInst.instituteEmail ,  email: signupInst.email, name: signupInst.name, type: 1 });
				setToken(decrypt(data.token, "ENCRYPT"));
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", signupInst.email);
				localStorage.setItem("instEmail", signupInst.instituteEmail);
				toast.success("signed up successfully");
				navigate("/dashboardinst");
			}
		}
	};
	return (
		<div className="main flex justify-center items-center w-[100%] overflow-hidden">
			<div className="right max-h-full h-fit flex flex-col bg-white px-[3rem] py-[0.5rem] pb-[5rem] items-center gap-y-[0rem]">
				<div className="div flex items-center justify-center w-full gap-x-[1rem] py-[0rem]">
					<img className="w-[10rem]" src={assets.logo} alt="" />
					<h4 className={`text-[5rem] pt-[1rem] ${PrimaryText[900]} font-semibold text-center`}>BlockCerti</h4>
				</div>
				{userType === "Individual" ? (
					<Form
						label="Sign Up"
						level1PrimaryProps={{ className: `${stylings.level1PrimaryCssForLoginSignup} pb-[5rem] gap-y-[1rem]` }}
						level2PrimaryProps={{ className: stylings.level2PrimaryCssForLoginSignup }}
						headingProps={props.headingProps}
						fields={signupDetailsInd(signupDetails, setSignupDetails, userType, setUserType)}
						isPopup={true}
						routeOptions = {{route : "/login" , routeLabel : "Already have an account ?"}}
						submitLabel="Submit"
						isClicked={isClicked}
						submitProps={{
							className: `${stylings.primaryButtonCssDark} w-[60%]`,
							disabled: isClicked,
							onClick: () => {
								handleSubmit();
							},
						}}
						submitContainerProps={{ className: "border-b-[0.1rem] border-slate-400 flex justify-center w-[70%] pb-[1.2rem]" }}
					/>
				) : (
					<div className="w-full">
						{stage == 0 ? (
							<Form
								label="Sign Up"
								containerProps={{ className: "toggle bg-white mt-[10px] flex rounded-lg gap-x-[2rem]" }}
								level1PrimaryProps={{ className: `${stylings.level1PrimaryCssForLoginSignup} gap-y-[1.8rem]` }}
								level2PrimaryProps={{ className: stylings.level2PrimaryCssForLoginSignup }}
								headingProps={props.headingProps}
								isPopup={true}
								fields={signupDetailsInst(signupInst, setSignupInst, userType, setUserType, stage, setStage)}
							/>
						) : (
							<div></div>
						)}
						{stage === 1 ? (
							<Form
								label="Representative Details"
								isPopup={true}
								level1PrimaryProps={{ className: `${stylings.level1PrimaryCssForLoginSignup} gap-y-[1.8rem]` }}
								level2PrimaryProps={{ className: stylings.level2PrimaryCssForLoginSignup }}
								headingProps={props.headingProps}
								fields={signupDetailsRep(signupInst, setSignupInst, stage, setStage)}
								submitLabel="Submit"
								isClicked={isClicked}
								submitProps={{
									className: `${stylings.primaryButtonCssDark} w-full`,
									disabled: isClicked,

									onClick: () => {
										handleSubmit();
									},
								}}
							/>
						) : (
							<div></div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Signup;
