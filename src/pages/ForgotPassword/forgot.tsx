import React from "react";
import { assets } from "../../utils/utils.assets";
import Form from "../../components/form/form";
import { stylings } from "../../utils/utils.css";
import { props } from "../../utils/utils.props";
import { forgotPassword } from "../../utils/types";
import { forgotPassDetails } from "../../utils/Form/utils.forgotpass";
import { toast } from "react-toastify";
import { ApiHelper } from "../../utils/ApiHelper";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss"
import { verifiers } from "../../utils/verifier";
import {PrimaryText} from "../../utils/utils.primaryColor";
const Forgot: React.FC = () => {
	const navigate = useNavigate();
	const [forgotDetails, setForgotDetails] = React.useState<forgotPassword>({
		email: "",
		password: "",
		confirmPassword: "",
		OTP: "",
		isOTPSend: false,
		isOTPValid: false,
	});
	const handleSubmit = async () => {
		if (!forgotDetails.isOTPValid && !forgotDetails.isOTPSend) {
			toast.error("OTP not verified");
			return;
		}
		if (forgotDetails.password === "") {
			toast.error("password cannot be empty");
			return;
		}
		const { data, error, loaded } = await ApiHelper("auth/forgotPassword", { email: forgotDetails.email, password: forgotDetails.password }, [
			"email",
			"password",
		]);
		if (loaded) {
			if(!verifiers.isPassword(forgotDetails.password)){
				toast.error("Please fill the fileds correctly,").toLocaleString;
			}
			else if (error) {
				toast.error(error.data.message);
				return;
			}
			else if (data.status === 200) {
				navigate("/login");
				toast.success("password changed");
			}
		}
	};

	return (
		<div className="forgotPass w-full">
			<div className="main flex justify-center items-center w-[100%] h-full overflow-hidden">
				<div className="right_left h-fit flex flex-col bg-white px-[3rem] py-[0.5rem] pb-[5rem] items-center gap-y-[0rem]">
				<div className="div flex items-center justify-center w-full gap-x-[1rem] py-[0rem]">
					<img className="w-[10rem]" src={assets.logo} alt="" />
					<h4 className={`text-[5rem] pt-[1rem] ${PrimaryText[900]} font-semibold text-center`}>BlockCerti</h4>
				</div>
					<Form
						label="Forgot Password"
						level1PrimaryProps={{
							className: `${stylings.level1PrimaryCssForLoginSignup} gap-y-[1rem]`,
						}}
						level2PrimaryProps={{ className: `${stylings.level2PrimaryCssForLoginSignup} h-fit` }}
						headingProps={props.headingProps}
						fields={forgotPassDetails(forgotDetails, setForgotDetails)}
						routeOptions = {{route : "/login" , routeLabel : "Login ?"}}
						isPopup={true}
						submitLabel="Update Password"
						submitProps={{
							className: `${stylings.primaryButtonCssDark} w-[60%]`,
							disabled: !forgotDetails.isOTPSend,
							onClick: () => {
								handleSubmit();
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default Forgot;
