import React, { useState } from "react";
import "./navbar.scss";
import {globalContext} from "../../context/globalContext";
import { useContext } from "react";
// import digiLogo from "../../assets/71.png"
import { useNavigate } from "react-router-dom";

export default function navbar({welcButton , nav }) {
  const [routeOptions, setRouteOptions] = useState(false);
  const navigate = useNavigate();
  const {sideBarController , setSideBarController} = useContext(globalContext.sideBarController);
  // let displayy;
  // if(!nav.display)
  // {
  //   displayy = "flex";
  // }
  // else
  // {
  //   if(nav.display == false)
  //   {
  //     displayy = "hidden";
  //   }
  //   else
  //   {
  //     displayy = "flex"
  //   }
  // }
  // const green = `navbar flex justify-between items-center ${nav.bgColor} px-5`;
  return (
    <div className={nav.className}>
      {/* <h3>cool</h3> */}
      <div className="left flex items-center gap-x-4 ">
        {/* <img src={digiLogo} className='h-[50px] w-auto' alt="img" /> */}
        {nav.leftSide.components.map((component) => {
          if (component.type == "logo") {
            return (
              <>
                <img
                  className={component.className}
                  src={component.src}
                  alt="img"
                />  
              </>
            );
          }
          if (component.type == "heading") {
            return (
              <>
                {component.route?<><span onClick={()=>{navigate(`${component.routeDestination}`)}}
                  className={`head ${component.fColor} ${component.fWeight}`}
                >
                  {component.value}
                </span></>:<><span
                  className={`head ${component.fColor} ${component.fWeight}`}
                >
                  {component.value}
                </span></>}
              </>
            );
          }
          if (component.type == "text") {
            return (
              <>
                <span className={component.className}>{component.value}</span>
              </>
            );
          }
          if (component.type == "select") {
            return (
              <>
                <select
                  className={component.className}
                  onChange={(e) => {
                    navigate(e.target.value);
                  }}
                  name={component.name}
                  id="one"
                  style={{ backgroundColor: "transparent" }}
                >
                  {component.value.map((val) => {
                    return (
                      <>
                        <option
                          className="bg-[rgb(34,8,105)] text-white"
                          value={val.nav}
                        >
                          {val.value}
                        </option>
                      </>
                    );
                  })}
                </select>
              </>
            );
          }
          if (component.type == "button") {
            return (
              <>
                <button
                  onClick={() => {
                    navigate(component.nav);
                  }}
                  className={component.className}
                >
                  {component.value}
                </button>
              </>
            );
          }
        })}
      </div>
      <div className="right flex gap-x-4">
        {nav.rightSide.components.map((component) => {
          if (component.type == "text") {
            return (
              <>
                <span className={component.className}>{component.value}</span>
              </>
            );
          }
          if (component.type == "profile" && !welcButton) {
            return (
              <div className="flex justify-center items-center">
                
              <div
                onClick={() => {
                  setSideBarController(!sideBarController);
                }}
                className="relative"
              >
                <img  
                  className="profile w-[3.9rem]"
                  src={component.src}
                  onClick={() => {
                    if(component.onClickSideBar)
                    {
                      setSideBar(!sideBar);
                    }
                    // localStorage.getItem("type") == 1
                    //   ? navigate("/editprofile")
                    //   : navigate("/dashboard");
                  }}
                  alt="img"
                />
              </div>
              </div>
            );
          }
        })}
        {welcButton === true && (
          <>
            <button
              className="text-[1.6rem] text-white"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
            <button
              className="text-[1.6rem] text-white"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
