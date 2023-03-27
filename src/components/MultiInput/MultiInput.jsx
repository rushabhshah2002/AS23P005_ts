import React from "react";
import "./MultiInput.scss";
/**
 * @param {import('../../utils/types').MultiInputProps} param0
 *
 */
const MultiInput = ({
  containerProps,
  mainContainerProps,
  trackLable,
  trackLabelCss,
  iteration,  
  fields
}) => {
  return (
    <div className="form-field flex flex-wrap" {...mainContainerProps}>
      {Array.from(Array(iteration)).map((_, ids) => {
        return (
          <div className="w-[30vw] mr-2 " {...containerProps}>
            <h1 className={trackLabelCss}>{trackLable}{ids+1}</h1>
            {fields.map((field, idx) => {
              if (field.type === "button") {
                return (
                  <div className=" w-full relative" {...field.fieldContainerProps}>
                  <button className={field.css?field.css(ids +1):"form__field_button"}  id={ids+1} {...field}>
                    {field.label}
                  </button>
                  </div>
                );
              } else {
                return (
                  <div className="form__field flex" {...field.containerProps} >
                    <label className="form__field__label"  id={`label_${ids+1}`} {...field.labelProps}>
                      {field.label}
                    </label>
                    <input
                      className="form__field__input"
                      id={ids + 1}
                      {...field}
                      value={field.pr ? field.pr(ids + 1) : ""}
                    />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
export default MultiInput;
