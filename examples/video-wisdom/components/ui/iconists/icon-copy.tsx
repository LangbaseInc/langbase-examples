import * as React from 'react';
export function IconCopy(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M16.4649 4H17C19.2091 4 21 5.79086 21 8V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V8C3 5.79086 4.79086 4 7 4H7.53513C8.22675 2.8044 9.51944 2 11 2H13C14.4806 2 15.7733 2.8044 16.4649 4ZM9 6H15C15 4.89543 14.1046 4 13 4H11C9.89543 4 9 4.89543 9 6Z"
				fill="currentColor"
			/>
		</svg>
	);
}
