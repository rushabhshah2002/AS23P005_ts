import React from "react";
import { assets } from "../../utils/utils.assets";
import { globalContext } from "../../context/globalContext";
import { useContext } from "react";
import { headingSizes } from "../../utils/Utils.fontSize";
import "./SideBar.scss";
import { useNavigate } from "react-router-dom";
import {sideBarParamsInterface} from "../../utils/types";
import {PrimaryBG} from "../../utils/utils.primaryColor";
export default function SideBar({ desptopWidth , nonDesktopWidth, fields } : sideBarParamsInterface) {
	const navigate = useNavigate();
	const { sideBarController, setSideBarController } : {sideBarController : boolean , setSideBarController : React.Dispatch<React.SetStateAction<boolean>>} = useContext(globalContext.sideBarController);
	const getWidth = () => {
		if (window.innerWidth > 900) {
			return desptopWidth;
		} else {
			return nonDesktopWidth;
		}
	};
	return (
		<div
			onMouseOver={() => {
				setSideBarController(true);
			}}
			onMouseLeave={() => {
				setSideBarController(false);
			}}
			className={`top-[0] sideBar justify-between flex rounded-md p-[1rem] pt-[3rem] h-full ease-in-out gap-y-[1rem] bg-sky-100 flex-col overflow-hidden ${
				sideBarController === true && `${getWidth()} right-0`
			}`}>
			<div className="topOfSideBar">
				<div
					onClick={() => {
						setSideBarController(!sideBarController);
					}}
					className={`forTouchScreen w-[5rem] h-[5rem] ${PrimaryBG[300]} rounded-full flex items-center justify-center`}>
					{sideBarController ? <img className="w-[2rem]" src={assets.Forward} alt="img" /> : <img className="w-[2rem]" src={assets.Back} alt="img" />}
				</div>
				{fields?.map((item) => {
					return (
						<div
							onClick={() => {
								if (item.actionType === "route" && item.action === "/") {
									localStorage.removeItem("token");
									localStorage.removeItem("email");
									localStorage.removeItem("instEmail");
								}
								if(typeof item.action != "string" && typeof item.action != "boolean")
								{
									item.action(true);
									return
								}
								if(typeof item.action == "string")
								{
									navigate(String((item.action)));
								}
							}}
							className={`${
								item.className
									? item.className
									: `item rounded-full hover:${PrimaryBG[300]} flex items-center px-[0.9rem] pl-[2rem] py-[1rem] gap-x-[2rem] w-[100rem] cursor-pointer`
							}`}>
							<img className="w-[2.3rem]" height="auto" src={item.src} alt="img" />
							<span className={`${headingSizes.h4}`}>{item.label}</span>
						</div>
					);
				})}
			</div>
			<div className={`bottomOfSideBar flex flex-col items-center`}>
				{true ? (
					<div className={`poweredBy ${sideBarController ===true ? "" : "opacity-0"} flex flex-col gap-y-[3rem] items-center`}>
						<div className="first flex flex-col items-center">
							<span className="text-[1.5rem]">All Rights Reserved</span>
							<span className="text-[1.5rem]">@2023</span>
							<span className="text-[1.5rem] text-[blue]">
								{" "}
								<a href="http://www.arihantsatiate.com/" target="_blank">
									Arihant Satiate
								</a>
							</span>
						</div>
						<div className="middle flex flex-col items-center">
							<span className="text-[1.5rem]">blockcerti@gmail.com</span>
							<span className="text-[1.5rem]">8238972042</span>
						</div>
						<div className="last">
							<span className="text-[1.5rem] font-black"> Beta Version</span>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
