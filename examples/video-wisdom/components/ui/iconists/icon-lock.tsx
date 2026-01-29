import * as React from 'react';
export function IconLock(props: React.JSX.IntrinsicElements['svg']) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C9.23858 2 7 4.23858 7 7V9.12602C5.27477 9.57006 4 11.1362 4 13V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V13C20 11.1362 18.7252 9.57006 17 9.12602V7C17 4.23858 14.7614 2 12 2ZM15 9V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V9H15ZM12 13C12.5523 13 13 13.4477 13 14V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V14C11 13.4477 11.4477 13 12 13Z"
				fill="currentColor"
			/>
		</svg>
	);
}
