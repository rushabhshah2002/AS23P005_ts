import React from "react";
import Form from "../../components/form/form";
import { loginDetails } from "../../utils/Form/utils.login";
import { Login } from "../../utils/types";
import { ApiHelper } from "../../utils/ApiHelper";
import { userContext } from "../../context/usercontext";
import { tokenContext } from "../../context/tokenContext";
import { decrypt } from "../../utils/encyption";
import { stylings } from "../../utils/utils.css";
import { assets } from "../../utils/utils.assets";
import { props } from "../../utils/utils.props";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { verifiers } from "../../utils/verifier";
import { PrimaryText } from "../../utils/utils.primaryColor";
const Login: React.FC = () => {
	const { user, setUser } = React.useContext(userContext);
	const { setToken } = React.useContext(tokenContext);
	const [credentials, setCredentials] = React.useState<Login>({
		email: "",
		password: "",
	});
	const [isClicked, setIsClicked] = React.useState<boolean>(false);
	const navigate = useNavigate();
	const handleSubmit = async () => {
		//add validation
		let tobeEncrypted: string[] = ["password", "email"];
		let { data, error, loaded } = await ApiHelper("auth/login", credentials, tobeEncrypted);
		if (error) {
			toast.error(error.data.message);
			setIsClicked(false);
			return;
		}
		if (loaded) {
			if (!verifiers.isEmail(credentials.email) || !verifiers.isPassword(credentials.password)) {
				toast.error("Please Fill All Fields correctly");
			} else if (data == null) {
				toast.error("Invalid Credentials or User Not Found");
				setIsClicked(false);
			} else if (data.auth == true && loaded) {
				setIsClicked(false);
				setUser({
					...user,
					email: data.user.email,
					name: data.user.name,
					instEmail: data?.details?.instEmail,
					type: data.user.type,
				});
				setToken(decrypt(data.token, "ENCRYPT"));
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", data.user.email);
				localStorage.setItem("instEmail", data?.details?.instEmail);
				navigate(`${data.user.type == 0 ? "/dashboard" : "/dashboardinst"}`);
				toast.success("Logged in Successfully");
			}
		}
	};
	return (
		<div className="login main flex items-center justify-center w-[100%] overflow-hidden">
			<div className="rightPartLogin  h-fit pb-[6rem] flex flex-col px-[3rem] py-[5px] items-center gap-y-[0rem]">
				<div className="div flex items-center justify-center w-full gap-x-[1rem] py-[0rem]">
					<img className="w-[10rem]" src={assets.logo} alt="" />
					<h4 className={`text-[5rem] pt-[1rem] ${PrimaryText[900]} font-semibold text-center`}>BlockCerti</h4>
				</div>
				<Form
					label="Login"
					level1PrimaryProps={{
						className: `${stylings.level1PrimaryCssForLoginSignup} gap-y-[1.9rem]`,
					}}
					level2PrimaryProps={{ className: `${stylings.level2PrimaryCssForLoginSignup} h-fit pb-[1.7rem]` }}
					headingProps={props.headingProps}
					fields={loginDetails(credentials, setCredentials)}
					submitLabel="Submit"
					routeOptions = {{route : "/signup" , routeLabel : "Create account ?"}}
					isClicked={isClicked}
					isPopup={true}
					submitProps={{
						className: `${stylings.primaryButtonCssDark} w-[60%]`,
						disabled: isClicked,
						onClick: () => {
							setIsClicked(true);
							handleSubmit();
						},
					}}
					submitContainerProps={{
						className: " flex justify-center w-[70%] pb-[0rem]",
					}}
				/>
			</div>
		</div>
	);
};

export default Login;
