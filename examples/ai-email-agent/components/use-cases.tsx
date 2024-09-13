import cn from 'mxcn';
import { IconChat, IconClose } from './ui/icons';

const useCases = [
	{
		title: `I'm stuck and frustrated because the billing API isn't working and the API documentation is outdated.`,
		prompt: `I'm stuck and frustrated because the billing API isn't working and the API documentation is outdated.`,
		icon: IconChat
	},
	{
		title: `Congratulations! You have been selected as the winner of a $100 million lottery!`,
		prompt: `Congratulations! You have been selected as the winner of a $100 million lottery!`,
		icon: IconClose
	},
	{
		title: `Ahoy! I be Captain No Beard, and I need yer help finding me lost treasure. All I need is yer bank details to fund the expedition. Yarrr!`,
		prompt: `Ahoy! I be Captain No Beard, and I need yer help finding me lost treasure. All I need is yer bank details to fund the expedition. Yarrr!`,
		icon: IconClose
	},
	{
		title: `I'm really disappointed with the service I received yesterday. The product was faulty and customer support was unhelpful.`,
		prompt: `I'm really disappointed with the service I received yesterday. The product was faulty and customer support was unhelpful.`,
		icon: IconChat
	},
	{
		title: `Following up on our last conversation, have you had a chance to review the proposal I sent?`,
		prompt: `Following up on our last conversation, have you had a chance to review the proposal I sent?`,
		icon: IconChat
	},
	{
		title: `For a limited time only, purchase our brand-new invisible car! It's fast, sleek, and totally see-through. Send $5,000 to claim yours today!`,
		prompt: `For a limited time only, purchase our brand-new invisible car! It's fast, sleek, and totally see-through. Send $5,000 to claim yours today!`,
		icon: IconClose
	}
];

export const UseCases = ({
	sendEmailToAgent
}: {
	sendEmailToAgent: (email: string) => void;
}) => {
	const handleClick = (prompt: string) => {
		sendEmailToAgent(prompt);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<p className="font-semibold">Use cases</p>
			<div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-4">
				{useCases.map((usecase, index) => {
					return (
						<div
							key={index}
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
