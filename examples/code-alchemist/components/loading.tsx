import { Skeleton } from "./skeleton";

export default function Loading({ isLoading }: { isLoading: boolean }) {
	if (!isLoading) return <></>;

	return (
		<div className="w-full">
			<p className="text-sm font-medium animate-pulse">AI is thinking...</p>
			<div className="mt-4 space-y-4">
				<Skeleton className="h-4 w-full rounded-xl" />
				<Skeleton className="h-4 w-2/3 rounded-xl" />
				<Skeleton className="h-4 w-full rounded-xl" />
				<Skeleton className="h-4 w-full rounded-xl" />
			</div>
		</div>
	);
}
