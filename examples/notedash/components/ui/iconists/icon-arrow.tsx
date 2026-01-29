import * as React from 'react';
export function IconArrow(props: React.JSX.IntrinsicElements['svg']) {
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
				d="M8.64645 3.14645C8.84171 2.95118 9.15829 2.95118 9.35355 3.14645L13.8536 7.64645C14.0488 7.84171 14.0488 8.15829 13.8536 8.35355C13.6583 8.54882 13.3417 8.54882 13.1464 8.35355L9.5 4.70711V17.5C9.5 18.8807 10.6193 20 12 20H19.5C19.7761 20 20 20.2239 20 20.5C20 20.7761 19.7761 21 19.5 21H12C10.067 21 8.5 19.433 8.5 17.5V4.70711L4.85355 8.35355C4.65829 8.54882 4.34171 8.54882 4.14645 8.35355C3.95118 8.15829 3.95118 7.84171 4.14645 7.64645L8.64645 3.14645Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export const xIconArrow = (props: React.JSX.IntrinsicElements['svg']) => {
	return (
		<svg
			{...props}
			width="200"
			height="100"
			viewBox="0 0 200 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M 10 80 Q 100 150 190 20"
				stroke="gray"
				fill="none"
				strokeWidth="2"
			/>
			<polyline
				points="185,25 190,20 180,20"
				fill="none"
				stroke="gray"
				strokeWidth="2"
			/>
		</svg>
	);
};
