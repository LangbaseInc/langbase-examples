import * as React from 'react';
export function IconDate(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M8 5V3M16 5V3M20 8.5V5H4V20H8.5M17 15.0002V16.9999L18.5 18.5002M15.0873 12.3818C17.6382 11.3252 20.5615 12.5368 21.6182 15.0876C22.6748 17.6383 21.4632 20.5615 18.9123 21.6182C16.3615 22.6748 13.4382 21.4632 12.3815 18.9124C11.3257 16.3625 12.5365 13.4385 15.0873 12.3818Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
