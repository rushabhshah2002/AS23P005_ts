import React from 'react';
import './SelectInput.scss';
/**
 *
 * @param {import('../../utils/types').SelectInputProps} param0
 */
const SelectInput = ({
	containerProps,
	label,
	labelProps,
	optionProps,
	options,
	selectProps,
}) => {
	const [selected, setSelected] = React.useState(options[0] || ['No options']);
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className='form_field mt-3' {...containerProps}>
			<label className='text-[1.3rem] text-white' {...labelProps}>{label}</label>
			<div className='relative'>
				<div className='mb-3 border py-2 text-lg rounded-md px-2 border-white-400 text-white'  onClick={() => setIsOpen(!isOpen)} {...selectProps}>
					{selected}
				</div>
				<div className='absolute top-[2.7rem] left-0 h-full w-full border-white-400'>
					{isOpen &&
						options.map((option, idx) => {
							return (
								<div
									
									{...optionProps(idx)}
									onClick={(e) => {
										setSelected(option);
										setIsOpen(false);
										optionProps(idx).onClick(option);
									}}
									className=" py-2 border px-2 cursor-pointer bg-white border-gray-500 w-full"
								>
									{option}
								</div>
							);
						})}
				</div>
			</div>
		
		</div>
	);
};

export default SelectInput;
