import cn from 'mxcn';

export function Bulb({
	isProdVersion,
	isConfigDirty
}: {
	isProdVersion: boolean;
	isConfigDirty: boolean;
}) {
	return (
		<div
			className={cn(
				!isProdVersion &&
					!isConfigDirty &&
					`text-gray-500 bg-gray-200/50 dark:bg-gray-300/50`,
				isProdVersion &&
					!isConfigDirty &&
					`text-green-400 bg-green-300/20 dark:text-green-700 dark:bg-green-600/50`,
				'flex-none rounded-full p-1'
			)}
		>
			<div className="h-2 w-2 rounded-full bg-current" />
		</div>
	);
}
