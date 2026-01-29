import * as React from 'react';
export function IconSignOut(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M20.5 12L9.5 12M20.5 12L16 16.5M20.5 12L16 7.5M11.5 20.5H4.5C3.94772 20.5 3.5 20.0523 3.5 19.5L3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5L11.5 3.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
