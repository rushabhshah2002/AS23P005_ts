import "./imageSelector.scss";
import { headingSizes } from "../../utils/Utils.fontSize";
import {PrimaryBG ,PrimaryBorder} from "../../utils/utils.primaryColor";
import {assets} from "../../utils/utils.assets";
export default function imageSelector({ staticWidth, data, heading  , onClose , setUpdator , updatorValue}: { staticWidth: string, data: Array<any>, heading: string  , onClose :any , setUpdator : any , updatorValue : any}) {
  return (
    <div>
      <div className={`masterIS h-fit w-${staticWidth ? staticWidth : "fit"} flex flex-col p-[1rem] ${PrimaryBG[100]} gap-[2rem]`}>
        <div className="topIS flex w-full justify-center">
          <span className={`${headingSizes.h3} text-center`}>{heading}</span>
          <svg
						width={20}
						height={20}
						className="absolute top-8 right-8 cursor-pointer text-white z-10 "
						viewBox="0 0 320.591 320.591"
						onClick={onClose}>
						<path
							d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"
							fill="#000"
						/>
						<path
							d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"
							fill="#000"
						/>
					</svg>
        </div>
        <div className="bottomIS flex w-full max-h-[69vh] gap-[2rem] overflow-scroll">
          <div className="leftIS flex-1 flex flex-col gap-[2rem]">
            {data.map((item, ids) => {
              return <>{ids % 2 == 0 && <div className={`div leftInner flex relative border-[0.2rem] rounded-lg ${PrimaryBorder[900]} flex-col item-center ${PrimaryBG} p-[1rem] w-full h-fit`}>
                <div
                onClick={()=>{setUpdator({...updatorValue , src : item.url})
                 onClose()}}
                  className={`overLey bg-slate-900 opacity-75 flex-col items-center justify-center absolute top-0 left-0 w-[100%] h-[100%] z-[999]`}>
                  <img width="60" src={assets.TouchScreen} alt="img" />
                  <h1 className="text-[2rem] text-center text-white"> 
                    SELECT THIS TEMPLATE
                  </h1>
                </div>
                <span className={`text-center ${headingSizes.h4}`}>certi {ids}</span>
                <img src={item.url} alt="" />
              </div>}</>
            })}
          </div>
          <div className="rightIS flex-1 flex flex-col gap-[2rem]">
            {data.map((item, ids) => {
              return <>{ids % 2 != 0 && <div className={`div rightInner flex relative border-[0.2rem] rounded-lg ${PrimaryBorder[900]} flex-col item-center ${PrimaryBG} p-[1rem] w-full h-fit`}>
                <div
                onClick={()=>{setUpdator({...updatorValue , src : item.url})
                onClose()}}
                  className={`overLey bg-slate-900 opacity-75 flex-col items-center justify-center absolute top-0 left-0 w-[100%] h-[100%] z-[999]`}>
                  <img width="60" src={assets.TouchScreen} alt="img" />
                  <h1 className="text-[2rem] text-center text-white">
                    SELECT THIS TEMPLATE
                  </h1>
                </div>
                <span className={`text-center ${headingSizes.h4}`}>certi {ids}</span>
                <img src={item.url} alt="" />
              </div>}</>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
