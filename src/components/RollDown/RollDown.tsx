import { useState } from 'react'
import "./RollDown.scss";
import {assets} from "../../utils/utils.assets";
import {PrimaryBG , PrimaryBorder} from "../../utils/utils.primaryColor";
import {headingSizes} from "../../utils/Utils.fontSize";
export default function RollDown({children , label} : {children :any , label : string}) {
 const [rollDown , setRollDown] = useState<boolean>(false);
  return (
    <div className={`mainRollDown w-full ${PrimaryBG[50]} border-[1px] ${PrimaryBorder[900]}  flex items-center justify-center`}>
     <div onClick={() => {
											setRollDown(!rollDown);
										}} className="optionsOpener p-[2rem] py-[1rem] cursor-pointer flex items-center w-full justify-center gap-x-[2rem]">
											<img className={`w-[2rem] ${rollDown ? "rotate-90" : ""}`} src={assets.Forward} alt="img" />
											<span className={`${headingSizes.h4}`}>{label}</span>
										</div>
          {rollDown && children}
    </div>

  )
}
