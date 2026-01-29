import * as React from 'react';
export function IconSafety(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M7 3C4.79086 3 3 4.79086 3 7V15C3 16.8638 4.27477 18.4299 6 18.874V20C6 20.5523 6.44772 21 7 21C7.55228 21 8 20.5523 8 20V19H16V20C16 20.5523 16.4477 21 17 21C17.5523 21 18 20.5523 18 20V18.874C19.7252 18.4299 21 16.8638 21 15V7C21 4.79086 19.2091 3 17 3H7ZM16 11C16 13.2091 14.2091 15 12 15C10.1362 15 8.57006 13.7252 8.12602 12H11C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10H8.12602C8.57006 8.27477 10.1362 7 12 7C14.2091 7 16 8.79086 16 11Z"
				fill="currentColor"
			/>
		</svg>
	);
}
