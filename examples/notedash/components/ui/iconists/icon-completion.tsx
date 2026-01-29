import * as React from 'react';
export function IconCompletion(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M4 18H7M4 12H9M4 6H20M17 10L18.5 13.5L22 15L18.5 16.5L17 20L15.5 16.5L12 15L15.5 13.5L17 10Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
