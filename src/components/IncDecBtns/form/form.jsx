import React from "react";
import FileInput from "../FileInput/FileInput";
import IncDecBtns from "../IncDecBtns/IncDecBtns";
import MultiInput from "../MultiInput/MultiInput";
import MultiSelectInput from "../MultiSelectInput/MultiSelectInput";
import Popup from "../Popup/Popup";
import PDF from "../../assets/pdf.pdf";
import "./form.scss";
import { PrimaryBG } from "../../../utils/utils.primaryColor";
/**
 *
 * @param {import('../../utils/types').FormProps} param0
 * @returns
 */
const Form = ({
  fields,
  formCss,
  label,
  headingProps,
  onSubmit,
  level2PrimaryProps,
  level1PrimaryProps,
  containerProps,
  fieldContainerProps,
  labelProps,
  submitLabel,
  submitProps,
  mainConstinerProps,
  onClose,
  onBack,
  secondaryBtnLabel,
  secondaryBtnProps,
  isPopup,
}) => {
  return (
    <div className="form relative" {...level2PrimaryProps}>
      {!isPopup && (
        <>
          {" "}
          <svg
            width={20}
            height={20}
            className="absolute top-8 right-8 cursor-pointer text-white z-10 "
            viewBox="0 0 320.591 320.591"
            onClick={onClose}
          >
            <path
              d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"
              fill="#000"
            />
            <path
              d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"
              fill="#000"
            />
          </svg>
       
        </>
      )}
      <h4 {...headingProps}>{label}</h4>
      <form
        className="form__form w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        {...level1PrimaryProps}
      >
        {fields.map((field) => {
          if (field.type === "checkbox") {
            return (
              <div {...field.containerProps}>
              <input type="checkbox" id="agree" {...field} />
              <label htmlFor="agree"> I agree to <a href={field.href} className = "text-[blue]" target = "_blank">terms and conditions</a></label>
            </div>
              )
          }
          if (field.type === "file") {
            return (
              <FileInput
              labelProps = {field.labelBoxProp}
              primaryLabelProps = {field.labelProps}
                containerProps={field.fieldContainerProps}
                primaryLabel={field.label}
                file={field.file}
                inputProps={field}
              />
            );
          }
          if (field.type == "toggle") {
            const styleChanger = (val) => {
              if (field.currForm == val) {
                return `rounded-lg text-[1.5rem] p-[7px] ${PrimaryBG[900]} text-white`;
              } else {
                return " rounded-lg text-[1.5rem] p-[7px]";
              }
            };
            return (
              <>
                <div className="toggle bg-white  mt-[10px] flex rounded-lg">
                  {field.buttons.map((toggelLabel, ids) => {
                    return (
                      <>
                        <button
                          className={styleChanger(ids)}
                          id={ids}
                          type="button"
                          {...field}
                        >
                          {toggelLabel}
                        </button>
                      </>
                    );
                  })}
                </div>
              </>
            );
          }
          if (field.type === "image") {
            return (
              <div {...fieldContainerProps}>
                <img src={field.src} {...field}></img>
              </div>
            );
          }
          if(field.type == "svg")
          {
            return(<div {...field.fieldContainerProps}>
              <img {...field} src={field.svg} alt="img"/>
              <span {...field.labelProps}>{field.label}</span>
            </div>)
          }
          if (field.type === "dynamic") {
            return (
              <MultiInput trackLabelCss = {field.trackLabelCss} trackLable = {field.trackLable} mainConstinerProps={mainConstinerProps} containerProps = {containerProps} fields={field.totalFields} iteration={field.limit} />
            );
          }
          if (field.type === "incdec") {

            return (  
              <IncDecBtns
              labelProps = {field.labelProps} 
              containerProps = {field.fieldContainerProps}
              btnContainerProps = {field.btnContainerProps}
                count={field.value}
                incrementLabel={field.inc.label}        
                decrementLabel={field.dec.label}
                label={field.label}
                incrementProps={field.inc}
                decrementProps={field.dec}
              />
            );
          }
          if (field.type == "dynamic_option") {
            return (
              <MultiSelectInput
                label={field.label}
                options={field.totalFields.option}
                iteration={field.limit}
                optionProps={(idx) => ({
                  ...field.totalFields.option,
                  onClick: field.onChange,
                })}
              />
            );
          }
          if (field.type == "button") {
            return (
              <div className="h-fit form__field mt-3 font-sans w-full"//doubt
                {...field.fieldContainerProps}
              >
                <button type="button" {...field}>
                  {field.label}
                </button>
              </div>
            );
          }

          return (
            <div
              className="form__field mt-3 font-sans w-full   "
              {...field.fieldContainerProps}
            >
              <label className="form__field__label " {...field.labelProps}>
                {field.label}
              </label>
              <input
                className="px-2 text-lg rounded-md py-2 border focus:border-black border-gray-400 focus:outline-none"
                {...field}
              />
            </div>
          );
        })}
        {submitLabel && (
          <button
            className={`btn w-full text-[1.7rem] py-4 px-3 ${PrimaryBG[900]} text-white transition-all border mt-3 rounded-lg`}
            // onClick={onSubmit}
            {...submitProps}
          >
            {submitLabel}
          </button>
        )}
        {secondaryBtnLabel && (
          <button
            className="btn w-full text-[2rem] mt-4"
            {...secondaryBtnProps}
          >
            {secondaryBtnLabel}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
