import cn from 'mxcn';
import { IconChat } from './ui/iconists/icon-chat';
import { IconCode } from './ui/iconists/icon-code';
import { IconDb } from './ui/iconists/icon-db';
import { Dispatch, FormEvent, SetStateAction } from 'react';

const useCases = [
	{
		title: 'Build a Todo App',
		prompt: 'Build a simple Todo app using React and Tailwind CSS. Save the todos in user local storage.',
		icon: IconCode
	},
	{
		title: 'Database schema of a Calendar app',
		prompt: 'Write the database schema of a simple calendar app. The user can create, edit, and delete events.',
		icon: IconDb
	},
	{
		title: 'Calculator for basic math operations',
		prompt: 'Build a simple calculator that can add, subtract, multiply, and divide.',
		icon: IconCode
	},
	{
		title: 'Database schema for a GitHub star feature',
		prompt: 'Write the database schema to build simplest version of GitHub star feature. The user can star and unstar repositories.',
		icon: IconDb
	},
	{
		title: 'Paginate a list of movies',
		prompt: 'Write a component that can paginate a list of movies',
		icon: IconCode
	},
	{
		title: 'Query to fetch users with name containing "John"',
		prompt: 'Write an SQL query to fetch users with name containing a string: "John"',
		icon: IconDb
	}
];

const Usecases = ({
	onSubmit,
	setPrompt,
	showTitle
}: {
	showTitle: boolean;
	onSubmit: ({
		e,
		prompt
	}: {
		e?: FormEvent<HTMLFormElement>;
		prompt: string;
	}) => Promise<void>;
	setPrompt: Dispatch<SetStateAction<string>>;
}) => {
	function handleClick(prompt: string) {
		setPrompt(prompt);
		onSubmit({ prompt });
	}

	return (
		<div className="md:w-[640px] space-y-4 text-sm">
			{showTitle && <p className="font-semibold">Use cases</p>}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{useCases.map((usecase, i) => {
					return (
						<div
							key={i}
							className={cn(
								'rounded-md border border-muted-foreground/20 p-4 space-y-3 cursor-pointer',
								'transition-all hover:bg-background'
							)}
							onClick={() => handleClick(usecase.prompt)}
						>
							<usecase.icon
								className="text-muted-foreground/50 size-4 -ml-[1px]"
								aria-hidden="true"
							/>
							<p className="font-light leading-6 line-clamp-2">
								{usecase.title}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Usecases;
