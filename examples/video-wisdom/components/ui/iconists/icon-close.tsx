import * as React from 'react';
export function IconClose(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M5.25 3.12891L12 9.87891L18.75 3.12891L20.8713 5.25023L14.1213 12.0002L20.8713 18.7502L18.75 20.8715L12 14.1215L5.25 20.8715L3.12868 18.7502L9.87868 12.0002L3.12868 5.25023L5.25 3.12891Z"
				fill="currentColor"
			/>
		</svg>
	);
}
