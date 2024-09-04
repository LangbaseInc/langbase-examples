export const Welcome = () => {
	return (
		<div className="max-w-4xl mx-auto pt-16 pb-4 flex flex-col items-center gap-y-4">
			<h2 className="text-2xl sm:text-5xl font-semibold flex">
				AI Email Agent
			</h2>
			<span className="w-full sm:w-2/3 text-center text-muted-foreground leading-7">
				An AI powered email agent that analyzes sentiment, summarizes
				content, decides on responses, and generates replies for your
				emails
			</span>
		</div>
	);
};
