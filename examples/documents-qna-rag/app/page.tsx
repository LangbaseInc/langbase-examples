import DocsQnA from "@/components/langbase/docs-qna";

export const runtime = 'edge';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col items-center justify-between gap-10 max-w-lg w-full">
				<div className="flex flex-col gap-1 w-full items-center">
					<h2 className="text-2xl font-bold tracking-tight">
						⌘ Langbase Documents QnA RAG App
					</h2>
					<p className="text-muted-foreground text-center">
						RAG App for docs QnA with Langbase Pipe and Memory.
					</p>
					<p className="text-muted-foreground text-center text-sm">
						For this demo memory contains data of <a href="https://ahmadawais.com">AhmadAwais.com</a>.
					</p>
					<p className="text-muted-foreground text-center text-sm">
						Ask your questions in the input field below.
					</p>
				</div>
				<DocsQnA />
			</div>
		</div>
	);
}