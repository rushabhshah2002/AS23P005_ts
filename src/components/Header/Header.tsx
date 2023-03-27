import React from 'react'
import {PrimaryText} from "../../utils/utils.primaryColor";
import {assets} from "../../utils/utils.assets";
import { Avatar } from "@mui/material";
import { helper } from "../../utils/utils.helper";
import { globalContext } from "../../context/globalContext";
import { useContext } from 'react'; 
import "./Header.scss";
export default function Header({profileName , children} : {profileName : string , children : any}) {
 const { sideBarController, setSideBarController } : {sideBarController : boolean , setSideBarController : React.Dispatch<React.SetStateAction<boolean>>} = useContext(globalContext.sideBarController);
  return (
   <div className="w-full px-[2rem] bg-transparent flex items-center justify-between h-[10%]">
   <div className={`leftNav flex items-center gap-[1rem] font-bold ${PrimaryText[900]}`}>
    <img className="w-[8rem]" src={assets.logo} alt="" onClick={()=>{
      window.location.reload();
    }}/>
    <span className="logoText">BlockCerti</span>
   </div>
   {children}
   <div className="profile flex items-center gap-[0.5rem]">
    <div className="span_flex flex-col">
   <span className={`text-[1.5rem] font-bold ${PrimaryText[900]}`}>Welcome </span>
   <span className={`text-[1.5rem] font-bold ${PrimaryText[900]}`}>{profileName ? profileName : "user"}</span>
    </div>
    <div className='notForMobile'>

    
    <Avatar onClick={()=>
     {
      setSideBarController(!sideBarController);
     }} {...helper.stringAvatar(profileName ? profileName : "user")}/>
     </div>
     <svg onClick={()=>
     {
      setSideBarController(!sideBarController);
     }} xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 64 64"  xmlSpace="preserve" className="w-[3.5rem] forMobile"><g transform="matrix(1.33,0,0,1.33,-10.560000000000002,-10.560000000000002)"><path d="M53 21H11c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3zM53 35H11c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3zM53 49H11c-1.7 0-3-1.3-3-3s1.3-3 3-3h42c1.7 0 3 1.3 3 3s-1.3 3-3 3z" fill="#000000" data-original="#000000" className=""></path></g></svg>
   </div>
  </div>
  )
}
