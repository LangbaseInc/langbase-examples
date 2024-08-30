import { sql } from '@codemirror/lang-sql';
import {
	SandpackCodeEditor,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import PromptForm from './prompt-form';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import BlurFade from './magicui/blur-fade';

const Sandbox = ({
	prompt,
	loading,
	setPrompt,
	completion,
	showPreview,
	improveCode,
	showSandbox
}: {
	prompt: string;
	loading: boolean;
	completion: string;
	showPreview: boolean;
	showSandbox: boolean;
	setPrompt: Dispatch<SetStateAction<string>>;
	improveCode: ({
		e,
		prompt
	}: {
		e: FormEvent<HTMLFormElement>;
		prompt: string;
	}) => Promise<void>;
}) => {
	if (!showSandbox) return <></>;

	return (
		<BlurFade delay={0.25} className="w-full">
			<div className="w-full">
				<SandpackProvider
					theme="auto"
					template="react-ts"
					files={{
						'/App.tsx': completion
					}}
					options={{
						autorun: true,
						autoReload: true,
						recompileDelay: 1000,
						recompileMode: 'delayed',
						externalResources: ['https://cdn.tailwindcss.com']
					}}
				>
					<SandpackLayout>
						<SandpackCodeEditor
							additionalLanguages={[
								{
									name: 'sql',
									extensions: ['sql'],
									language: sql()
								}
							]}
						/>
						{showPreview && <SandpackPreview />}
					</SandpackLayout>
				</SandpackProvider>
				<PromptForm
					prompt={prompt}
					isLoading={loading}
					setPrompt={setPrompt}
					onSubmit={improveCode}
					className="mt-6 md:w-full"
					title="Ask follow up questions"
					placeholder="Improve the code or schema..."
				/>
			</div>
		</BlurFade>
	);
};

export default Sandbox;
