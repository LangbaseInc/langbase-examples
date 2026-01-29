import * as React from 'react';
export function IconFeedback(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7ZM19 10H5V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V10ZM10 7.5C10 6.94772 10.4477 6.5 11 6.5H17C17.5523 6.5 18 6.94772 18 7.5C18 8.05228 17.5523 8.5 17 8.5H11C10.4477 8.5 10 8.05228 10 7.5Z"
				fill="currentColor"
			/>
			<path
				d="M9 7.5C9 8.32843 8.32843 9 7.5 9C6.67157 9 6 8.32843 6 7.5C6 6.67157 6.67157 6 7.5 6C8.32843 6 9 6.67157 9 7.5Z"
				fill="currentColor"
			/>
		</svg>
	);
}
