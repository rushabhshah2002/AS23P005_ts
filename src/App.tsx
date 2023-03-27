import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { userContext, User } from "./context/usercontext";
import { tokenContext } from "./context/tokenContext";
import Login from "./pages/Login/login";
import Signup from "./pages/signup/signup";
import Landing from "./pages/landing/landing";
import Dashboard from "./pages/temp/dashboard";
import DashboardInst from "./pages/temp/dashboardInst";
import { globalContext } from "./context/globalContext";
import Navbar from "./components/navbar/Navbar";
import { signUpNavBar } from "./utils/utils.nav";
import ImageEditor from "./pages/ImageEditor/imageEditor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendFiles from "./components/MulitiUpload/multi";
import CreateCertificate from "./pages/CreateCertificate/CreateCertificate";
import Profile from "./pages/Profile/profile";
import Forgot from "./pages/ForgotPassword/forgot";
function App() {
	const [user, setUser] = React.useState<User>({
		email: "",
		name: "",
		type: "",
		instituteEmail: "",
	});
	const location = useLocation();
	const [sideBarController, setSideBarController] = useState({status : false , message : ""});
	const [welcButton, setWelcButton] = useState(false);
	const [token, setToken] = React.useState<string>("null");
	
	useEffect(() => {
		if (location.pathname == "/" || location.pathname == "/signup" || location.pathname == "/login" || location.pathname == "/forgot") {
			setWelcButton(true);
		} else {
			setWelcButton(false);
		}
	}, [location.pathname]);
	return (
		<div className={`App overflow-hidden`}>
			<userContext.Provider value={{ user, setUser }}>
				<tokenContext.Provider value={{ token, setToken }}>
					<globalContext.sideBarController.Provider value={{ sideBarController, setSideBarController }}>
						<ToastContainer
							position="top-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={true}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
							progressClassName="toastProgress"
							bodyClassName="toastBody"
						/>
						<Routes>
							<Route path="/" element={<><Navbar nav={signUpNavBar()[0]} welcButton={welcButton} /> <Landing /></>} />
							<Route path="/signup" element={<><Navbar nav={signUpNavBar()[0]} welcButton={welcButton} /> <Signup /></>} />
							<Route path="/login" element={<><Navbar nav={signUpNavBar()[0]} welcButton={welcButton} /> <Login /></>} />
							<Route path="/imageeditor" element={<ImageEditor />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/dashboardinst" element={<DashboardInst />} />
							<Route path="/createcertificate" element={<CreateCertificate />} />
							<Route path="/example" element={<SendFiles />} />
							<Route path="/editProfile" element={<Profile />} />
							<Route path="/forgot" element={ <><Navbar nav={signUpNavBar()[0]} welcButton={welcButton} /> <Forgot /></>} />
						</Routes>
					</globalContext.sideBarController.Provider>
				</tokenContext.Provider>
			</userContext.Provider>
		</div>
	);
}

export default App;
