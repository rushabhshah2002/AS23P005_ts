import React from 'react';
import { useState } from 'react';
import './FileInput.scss';
/**
 * @param {import('../../utils/types').FileInputProps} param0
 * @returns
 */
const FileInput = ({
	containerProps,
	inputProps,
	labelProps,
	primaryLabel,
	primaryLabelProps,
	inputContainerProps,
	file,
}) => {
	// const [file , setFile] = useState("");
	if (file) {
		
		return (
			<div className='form__field' {...containerProps}>
				<p className='form__field__label' {...primaryLabelProps}>
					{primaryLabel}
				</p>
				<div className='w-full flex justify-center'>
					<input
						type='file'
						id='file'
						style={{ display: 'none' }}
						{...inputProps}
					/>
					<label
						className='w-full text-[1.7rem] text-center flex items-center form__field__input'
						htmlFor='file'
						{...labelProps}
					>
						{file.name}
					</label>
				</div>
			</div>
		);
	}
	return (
		<div className='form__field' {...containerProps}>
			<p className='form__field__label' {...primaryLabelProps}>
				{primaryLabel}
			</p>
			<div className='w-full flex justify-center' {...inputContainerProps}>
				<input
					type='file'
					id='file'
					style={{ display: 'none' }}
					{...inputProps}
				/>
				<label
					className='inputLabelForm text-[1.7rem] text-center flex items-center border-[1px] bg-white border-sky-900 p-[0.5rem] rounded-md'
					htmlFor='file'
					{...labelProps}
				>
					Choose File
				</label>
			</div>
		</div>
	);
};

export default FileInput;
