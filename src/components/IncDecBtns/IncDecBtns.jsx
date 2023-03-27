import React from 'react';
import './IncDecBtns.scss';
/**
 *
 * @param {import('../../utils/types').IncDecBtnsProps} props
 * @returns
 */
const IncDecBtns = (props) => {
	return (
		<div className='form-field' {...props.containerProps}>
			<div className='flex' {...props.labelContainerProps}>
				<p className='form__field__label mr-2' {...props.labelProps}>
					{props.label}
				</p>
				<p className='form__field__label' {...props.countProps}>
					{props.count}
				</p>
			</div>
			<div className='flex' {...props.btnContainerProps}>
				<button type="button" className='form__field__input' {...props.incrementProps}>
					{props.incrementLabel}
				</button>
				<button className='form__field__input' type='button' {...props.decrementProps}>
					{props.decrementLabel}
				</button>
			</div>
		</div>
	);
};

export default IncDecBtns;
