import {assets} from  "../utils/utils.assets";
import {PrimaryText , PrimaryGradient} from "./utils.primaryColor";
export const signUpNavBar = () => {
    const userType = localStorage.getItem("type");
    return [
      {
        bgColor: "bg-[#E8DAF7]",
        display: true,  
        className: `navbar z-[99] flex justify-between items-center bg-gradient-to-r ${PrimaryGradient.from} ${PrimaryGradient.to} px-5`,
        leftSide: {
          components: [
            {
              type: "logo",
              src: assets.logo,
              className: "h-[4rem]",
            },
            {
              type: "heading",
              value: "BlockCerti",
              fSize: "text-[2rem]",
              fWeight: "font-bold",
              fColor: `${PrimaryText[900]}`,
              route : true,
              routeDestination : userType == "1"? "/dashboardinst" : "/dashboard" 
            },
          ],
        },
        rightSide: {
          components: [
            {
              type: "profile",
              src: assets.Profile,
              onClickSideBar : true,
              // onClickSideBarVariable : [sideBar , setSideBar]  
            },
          ],
        },
      },
    ];
  };