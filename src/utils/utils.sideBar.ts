import { assets } from "../utils/utils.assets";
import { sideBarInterface, popupController } from "./types";
import {PrimaryBG} from "./utils.primaryColor";
export const masterSidebar = (updater: popupController, path: string): Array<sideBarInterface> => {
	const getClassName = (val: string) => {
		if (path == val) {
			return `item rounded-full flex items-center ${PrimaryBG[300]} px-[0.9rem] pl-[2rem] py-[1rem] gap-x-[2rem] w-[100rem] cursor-pointer`;
		} else {
			return `item rounded-full flex items-center ${PrimaryBG[100]} px-[0.9rem] pl-[2rem] py-[1rem] gap-x-[2rem] w-[100rem] cursor-pointer`;
		}
	};
	let state: Array<sideBarInterface> = [
		{
			id: 1,
			action: "/dashboard",
			actionType: "route",
			src: assets.DashBoard,
			label: "Dashboard",
			className: getClassName("/dashboard"),
		},
		{
			id: 2,
			action: "/dashboardinst",
			actionType: "route",
			src: assets.DashBoard,
			label: "Dashboard",
			className: getClassName("/dashboardinst"),
		},
		{
			id: 3,
			action: "/editprofile",
			actionType: "route",
			src: assets.User,
			label: "Edit Profile",
			className: getClassName("/editprofile"),
		},
		{
			id: 4,
			action: "/imageEditor",
			actionType: "route",
			src: assets.Template,
			label: "Create Template",
			className: getClassName("/imageEditor"),
		},
		{
			id: 5,
			action: "/createcertificate",
			actionType: "route",
			src: assets.Pencil,
			label: "Create Certificate",
			className: getClassName("/createcertificate"),
		},
		{
			id: 6,
			action: updater.editProfile,
			actionType: "update",
			src: assets.User,
			label: "Edit Profile",
		},
		{
			id: 7,
			action: updater.uploadCertificateInd,
			actionType: "update",
			src: assets.Upload,
			label: "Upload Certificate",
		},
		{
			id: 8,
			action: updater.uploadCertificateInst,
			actionType: "update",
			src: assets.Upload,
			label: "Upload Certificate",
		},

		{
			id: 9,
			action: "/editProfile",
			actionType: "route",
			src: assets.User,
			label: "Edit Profile",
			className: getClassName("/editProfile"),
		},
		{
			id: 10,
			action: "/forgot",
			actionType: "route",
			src: assets.Reset,
			label: "Change Password",
		},
		{
			id: 11,
			action: "/",
			actionType: "route",
			src: assets.TurnOff,
			label: "Logout",
		},
	];
	const filterHelper = (ids: number[]) => {
		return state.filter((items, idx) => {
			return ids.includes(idx + 1);
		});
	};
	switch (path) {
		case "/dashboard":
			return filterHelper([10, 7, 6, 11]);

		case "/imageEditor":
			return filterHelper([2, 5, 4, 11, 9]);
		case "/dashboardinst":
			return filterHelper([2, 8, 5, 4, 11, 9]);
		case "/createcertificate":
			return filterHelper([2, 5, 4, 11, 9]);
		case "/editProfile":
			return filterHelper([2, 5, 4, 11, 9]);
		default:
			return state;
	}
};

const dashboardIndi = (
	setEditProfilePopUp: React.Dispatch<React.SetStateAction<boolean>> | boolean,
	setUploadCertificatePopUp: React.Dispatch<React.SetStateAction<boolean>> | boolean
) => {
	return masterSidebar(
		{ editProfile: setEditProfilePopUp, uploadCertificateInd: setUploadCertificatePopUp, uploadCertificateInst: false },
		"/dashboard"
	);
};
const createcertificate = () => {
	return masterSidebar({ editProfile: false, uploadCertificateInst: false, uploadCertificateInd: false }, "/createcertificate");
};
const dashboardInst = (setUploadCertificateInstPopUp: React.Dispatch<React.SetStateAction<boolean>>) => {
	return masterSidebar(
		{ editProfile: false, uploadCertificateInst: setUploadCertificateInstPopUp, uploadCertificateInd: false },
		"/dashboardinst"
	);
};
const imageEditor = () => {
	return masterSidebar({ editProfile: false, uploadCertificateInst: false, uploadCertificateInd: false }, "/imageEditor");
};
const editProfile = () => {
	return masterSidebar({ editProfile: false, uploadCertificateInst: false, uploadCertificateInd: false }, "/editProfile");
};

export const sideBarDetails = {
	dashboardIndi,
	dashboardInst,
	imageEditor,
	createcertificate,
	editProfile,
};
