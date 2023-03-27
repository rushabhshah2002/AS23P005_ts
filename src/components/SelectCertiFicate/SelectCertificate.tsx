import React from 'react'
import { stylings } from "../../utils/utils.css";
import { PrimaryBG, PrimaryBorder } from "../../utils/utils.primaryColor";
import { assets } from "../../utils/utils.assets";
import { toast } from "react-toastify";
import { headingSizes } from "../../utils/Utils.fontSize";

import MainLayout from '../PageLayouts/MainLayout';
import LeftLayout from '../PageLayouts/LeftLayout';
import RightLayout from '../PageLayouts/RightLayout';
import { createCertiTemplateInterface, dataEnteredInterface, currentlySelectedInterface } from "../../utils/types";
export default function SelectCertificate({ certiData, dataEntered, currentSelectedStatus, setCurrentSelectedStatus, setDataEntred, user }: { certiData: createCertiTemplateInterface, dataEntered: dataEnteredInterface, setDataEntred: React.Dispatch<React.SetStateAction<dataEnteredInterface>>, currentSelectedStatus: currentlySelectedInterface, setCurrentSelectedStatus: React.Dispatch<React.SetStateAction<currentlySelectedInterface>>, user: any }) {
 return (
  <div className='masterCC w-full'>
   <MainLayout>
    <LeftLayout>
    <div className={`leftCC w-full  flex flex-col items-center bg-white`}>
     <h1 className={stylings.primaryHeadingCss}>Templates</h1>
     <div className="scroller flex items-center gap-y-[3rem] p-[0rem]">
      {Object.keys(certiData).map((key: string) => {
       return (
        <div
         className={`headCC h-fit border-[2px] ${PrimaryBorder[900]} relative flex flex-col items-center rounded-md ${PrimaryBG[100]} p-[1rem]`}>
         <div
          id={certiData[key].meta[0].certiTempId}
          onClick={() => {
           setDataEntred({
            ...dataEntered,
            core: {
             ...dataEntered.core,
             certiTempId: certiData[key].meta[0].certiTempId,
             instituteEmail: user.instEmail,
             repEmail: user.email,
            },
            qr:
            {
             ...certiData[key].qr[0]
            },
            meta:
            {
             ...certiData[key].meta[0]
            }

           });
           setCurrentSelectedStatus({ ...currentSelectedStatus, selectedTempData: certiData[key] });
          }}
          className={`overLey bg-slate-900 opacity-75 flex flex-col items-center justify-center absolute top-0 left-0 w-[100%] h-[100%] z-[999]`}>
          <img id={certiData[key].meta[0].certiTempId} width="60" src={assets.TouchScreen} alt="img" />
          <h1 id={certiData[key].meta[0].certiTempId} className="text-[2rem] text-center text-white">
           SELECT THIS TEMPLATE
          </h1>
         </div>
         <h1 className="text-[2.5rem]">{certiData[key].meta[0].alias}</h1>
         <div
          className={`createCertiImg flex justify-center`}
          onClick={() => {
           setCurrentSelectedStatus({ ...currentSelectedStatus, selectedTempData: certiData[key] });
          }}>
          <div className="imgSelector">
           <img className="h-auto w-full" src={String(certiData[key].meta[0].link)}></img>
          </div>
         </div>
         <button
          className={`${headingSizes.h3} templateSelector py-[0.5rem] w-full border-2 border-sky-900 rounded-lg mt-[1rem]`}
          onClick={() => {
           setDataEntred({
            ...dataEntered,
            core: {
             ...dataEntered.core,
             certiTempId: certiData[key].meta[0].certiTempId,
             instituteEmail: user.instEmail,
             repEmail: user.email,
            },
           });
           setCurrentSelectedStatus({ ...currentSelectedStatus, selectedTempData: certiData[key] });
          }}>
          Select
         </button>
        </div>
       );
      })}
     </div>
    </div>
    </LeftLayout>
    <RightLayout coustomClassName='bg-white'>
    <div
     className={`rightCC w-full flex items-center gap-y-[1rem]`}>
     <div className="controllerCC flex flex-col items-center justify-center  gap-y-[2rem]">
      <div className="createCertificateOptions gap-x-[2rem] flex">
       <button
        className={`${headingSizes.h4} optionButtonsCC float-right ${PrimaryBG[900]} text-white justify-center flex items-center px-[1rem] rounded-md py-[0.5rem]`}
        onClick={() => {
         if (currentSelectedStatus.selectedTempData?.meta) {
          setCurrentSelectedStatus({ ...currentSelectedStatus, selected: true });
         } else { 
          toast.error("please select a template first");
         }
        }}>
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"  x="0" y="0" viewBox="0 0 64 64" xmlSpace="preserve" className="w-[3rem]"><g><path d="M32.016 58.003c-9.888.001-19.006-5.665-23.373-14.583-4.419-9.027-3.081-20.285 3.331-28.014C18.379 7.685 28.792 4.316 38.5 6.823a2.002 2.002 0 0 1-1 3.874c-8.212-2.121-17.026.729-22.447 7.264-5.424 6.539-6.556 16.064-2.817 23.702 3.725 7.608 11.942 12.564 20.376 12.334 8.433-.23 16.086-5.359 19.497-13.066a22.13 22.13 0 0 0 1.192-14.432 2.001 2.001 0 0 1 3.874-1 26.155 26.155 0 0 1-1.407 17.051c-4.032 9.11-13.079 15.173-23.046 15.445-.236.005-.472.008-.706.008z" fill="#ffffff" data-original="#000000" className=""></path><path d="M32 38.24a2 2 0 0 1-1.414-3.414l24-24a2 2 0 1 1 2.828 2.828l-24 24c-.39.39-.902.586-1.414.586z" fill="#ffffff" data-original="#000000" className=""></path><path d="M32 38.24a1.99 1.99 0 0 1-1.414-.586l-8.485-8.485a2 2 0 1 1 2.828-2.828l8.485 8.485A2 2 0 0 1 32 38.24z" fill="#ffffff" data-original="#000000" className=""></path></g></svg>
        <span>Get</span>
        <span>This</span>
        <span>Template</span>
       </button>
       <button
        className={`${headingSizes.h4} optionButtonsCC float-right ${PrimaryBG[900]} text-white justify-center flex items-center px-[1rem] rounded-md py-[0.5rem]`}
        type="button">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512"  xmlSpace="preserve" className="w-[3rem]"><g><path d="M282.208 19.67a16.105 16.105 0 0 0-13.152-3.392l-256 48A15.955 15.955 0 0 0 0 79.99v352c0 7.68 5.472 14.304 13.056 15.712l256 48a15.3 15.3 0 0 0 2.944.288c3.68 0 7.328-1.28 10.208-3.68A16.006 16.006 0 0 0 288 479.99v-448c0-4.768-2.112-9.28-5.792-12.32zM256 460.694 32 418.71V93.27l224-41.984v409.408z" fill="#ffffff" data-original="#000000" className=""></path><path d="M496 79.99H272c-8.832 0-16 7.168-16 16s7.168 16 16 16h208v288H272c-8.832 0-16 7.168-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16v-320c0-8.832-7.168-16-16-16z" fill="#ffffff" data-original="#000000" className=""></path><path d="M336 143.99h-64c-8.832 0-16 7.168-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM336 207.99h-64c-8.832 0-16 7.168-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM336 271.99h-64c-8.832 0-16 7.168-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM336 335.99h-64c-8.832 0-16 7.168-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 143.99h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 207.99h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 271.99h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 335.99h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM220.064 309.462l-112-128c-5.888-6.688-15.968-7.328-22.592-1.504-6.656 5.824-7.328 15.936-1.504 22.56l112 128A15.951 15.951 0 0 0 208 335.99c3.744 0 7.488-1.312 10.56-3.968 6.656-5.824 7.328-15.904 1.504-22.56z" fill="#ffffff" data-original="#000000" className=""></path><path d="M217.824 163.382c-6.976-5.472-17.024-4.16-22.464 2.784l-112 144c-5.408 6.976-4.16 17.056 2.816 22.464A16.015 16.015 0 0 0 96 335.99c4.736 0 9.472-2.112 12.608-6.144l112-144c5.44-7.008 4.192-17.056-2.784-22.464z" fill="#ffffff" data-original="#000000" className=""></path></g></svg>
        <span>Get</span>
        <span>Excel</span>
        <span>Format</span>
       </button>
       <label className=" text-[2rem] text-sky-900 border-2 border-sky-900 w-[15rem] text-center" htmlFor="fileChoose">
        Choose File
       </label>
       <input className=" ml-[2rem] hidden" id="fileChoose" type="f ile" />
      </div>
     </div>
     {currentSelectedStatus.selectedTempData != null ? (<div className='selectedTemplate relative'>
      <img className=' object-contain h-full w-full' src={String(currentSelectedStatus.selectedTempData.meta[0].preview)} alt="please select any template" />
      </div>
     ) : (
      <>
       <div
        className={` w-[90%] mb-[2rem] h-[90%] justify-center p-[5rem] flex flex-col items-center bg-gradient-to-b from-slate-700 to-[#008080]`}>
        <img width="300" src={assets.PleaseSelect} alt="img"/>
        <h1 className={` ${headingSizes.h2} text-white`}>Please Select a Template</h1>
       </div>
      </>
     )}
    </div>
    </RightLayout>
   </MainLayout>
  </div>
 )
}
