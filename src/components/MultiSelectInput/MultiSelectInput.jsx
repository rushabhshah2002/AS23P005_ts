import React from 'react';
import SelectInput from '../SelectInput/SelectInput';
import './MultiSelectInput.scss';
/**
 * 
 * @param {import('../../utils/types').MultiSelectInputProps} param0 
 * @returns 
 */
const MultiSelectInput = ({containerProps,iteration,label,labelProps,optionProps=() =>{},options,selectProps}) => {
	return (
		<div className='form__field' {...containerProps}>
			{Array.from(Array(iteration)).map((_, idx) => {
				return (
					<SelectInput options={options} label={label} labelProps={labelProps} optionProps={optionProps} selectProps={{id:idx}}   />
				);
			})}
		</div>
	);
};

export default MultiSelectInput;
