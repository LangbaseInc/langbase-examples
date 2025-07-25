import { cn } from '@/lib/utils';
import * as React from 'react';
import Textarea, { TextareaAutosizeProps } from 'react-textarea-autosize'; // Import AutosizeTextarea from the library

const AutosizeTextarea = React.forwardRef<
	HTMLTextAreaElement,
	TextareaAutosizeProps
>(({ className, style, ...props }, ref) => {
	return (
		<Textarea // Use AutosizeTextarea instead of textarea
			className={cn(
				'block w-full rounded-lg border-0 py-1.5 text-foreground shadow-sm  placeholder:text-muted-foreground sm:text-sm sm:leading-6',
				'shadow-inner bg-muted focus:ring-1 focus:ring-inset focus:ring-muted-foreground/25 placeholder:text-muted-foreground/80 dark:placeholder:text-muted-foreground/50',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});

AutosizeTextarea.displayName = 'AutosizeTextarea';

export { AutosizeTextarea };
