import * as React from 'react';
export function IconDelete(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M7.41633 5C8.18779 3.23448 9.94873 2 12 2C14.0512 2 15.8121 3.23448 16.5836 5H22V7H19.9356L18.9356 22H5.06445L4.06445 7H2V5H7.41633ZM9.76363 5C10.3133 4.38612 11.112 4 12 4C12.8879 4 13.6866 4.38612 14.2363 5H9.76363ZM11 17V10H9V17H11ZM13 10H15V17H13V10Z"
				fill="currentColor"
			/>
		</svg>
	);
}
