// -- Package Imports -----------------------------------------------------------
import React, { useEffect } from 'react';

// -- Action Imports --------------------------------------------------------

// -- Styles Imports --------------------------------------------------------
import './Popup.scss';

/**
 * @param {import('../../utils/types').PopupProps} param0
 * @returns
 */
function Popup({
	children,
	height,
	width,
	verticalAlign,
	horizontalAlign,
	padding,
	...props1
}) {
	const getHorizontalAlign = (align) => {
		switch (align) {
			case 'left':
				return 'flex-start';
			case 'right':
				return 'flex-end';
			default:
				return 'center';
		}
	};
	const getVerticalAlign = (align) => {
		switch (align) {
			case 'top':
				return 'flex-start';
			case 'bottom':
				return 'flex-end';
			default:
				return 'center';
		}
	};
	return (
		<div
			className='popup z-[999]'
			style={{
				alignItems: getVerticalAlign(verticalAlign),
				justifyContent: getHorizontalAlign(horizontalAlign),
				padding,
			}}
		>
			<div
				style={{ height, width }}
				// eslint-disable-next-line react/jsx-props1-no-spreading
				{...props1}
				className={`popup-content ${props1?.props1?.className}`}
			>
				{children}
			</div>
		</div>
	);
}

export default Popup;
