import * as React from 'react';
export function IconPlayground(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M16 1.5C16.5523 1.5 17 1.94772 17 2.5V4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H17V21.5C17 22.0523 16.5523 22.5 16 22.5C15.4477 22.5 15 22.0523 15 21.5V2.5C15 1.94772 15.4477 1.5 16 1.5Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2 8C2 5.79086 3.79086 4 6 4H13V20H6C3.79086 20 2 18.2091 2 16V8ZM7.70711 8.79289C7.31658 8.40237 6.68342 8.40237 6.29289 8.79289C5.90237 9.18342 5.90237 9.81658 6.29289 10.2071L8.08579 12L6.29289 13.7929C5.90237 14.1834 5.90237 14.8166 6.29289 15.2071C6.68342 15.5976 7.31658 15.5976 7.70711 15.2071L10.2071 12.7071C10.5976 12.3166 10.5976 11.6834 10.2071 11.2929L7.70711 8.79289Z"
				fill="currentColor"
			/>
		</svg>
	);
}
