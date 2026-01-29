import * as React from 'react';
export function IconDocument(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M12 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V10H15C13.3431 10 12 8.65685 12 7V2Z"
				fill="currentColor"
			/>
			<path
				d="M19.4142 8L14 2.58579V7C14 7.55228 14.4477 8 15 8H19.4142Z"
				fill="currentColor"
			/>
		</svg>
	);
}
