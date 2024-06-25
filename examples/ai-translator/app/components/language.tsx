import { LANGUAGES } from "./constants";


export const LanguageSelector = ({
	id,
	language,
	setLanguage
}: {
	id: string;
	language: string;
	setLanguage: (language: string) => void;
}) => {
	return (
		<select
			value={language}
			onChange={e => {
				setLanguage(e.target.value);
			}}
			name={id}
			id={id}
			className="block bg-muted w-full rounded-lg border-0 py-1.5 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 px-4 mt-2"
		>
			{Object.entries(LANGUAGES).map(([key, value]) => (
				<option key={key} value={key}>
					{value}
				</option>
			))}
		</select>
	);
};
