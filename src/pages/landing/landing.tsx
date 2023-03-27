import React from "react";
import { landing } from "../../utils/types";
import {LandingDetails} from "../../utils/utils.landing";
import "./landing.scss";

const Landing: React.FC = () => {
  return (
    <div className="Landing overflow-scroll">
    {LandingDetails.map((key:landing,idx:Number):any=>{

      return<div className="container"{...key.containerProps} key = {idx}>
        <img src={key.src} alt="img" {...key.srcProps}/>
        <div className="detiling flex flex-col gap-y-[4rem]">
          <span {...key.headingProps}>{key.heading}</span>
          <span {...key.contentProps}>{key.content}</span>
        </div>
      </div>
    })}
    </div>
  );
};
export default Landing;
