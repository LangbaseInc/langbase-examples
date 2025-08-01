'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import { Spinner } from '../spinner';

interface TextInputInterfaceProps {
	textInput: string;
	meetingTitle: string;
	isLoading: boolean;
	onTextInputChange: (value: string) => void;
	onMeetingTitleChange: (value: string) => void;
	onProcessText: () => void;
}

export const TextInputInterface = ({
	textInput,
	meetingTitle,
	isLoading,
	onTextInputChange,
	onMeetingTitleChange,
	onProcessText
}: TextInputInterfaceProps) => {
	return (
		<>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Meeting Title (Optional)
					</label>
					<Input
						value={meetingTitle}
						disabled={isLoading}
						onChange={e => onMeetingTitleChange(e.target.value)}
						placeholder="e.g., Team Standup, Client Call, Project Review"
						className="bg-muted text-white placeholder:text-gray-400 rounded-lg"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Meeting Content *
					</label>
					<Textarea
						value={textInput}
						disabled={isLoading}
						onChange={e => onTextInputChange(e.target.value)}
						placeholder="Paste your meeting transcript, notes, or any text content you'd like to analyze..."
						className="bg-muted border-muted text-white placeholder:text-gray-400 rounded-lg min-h-[200px] resize-none"
					/>
				</div>

				<div className="text-sm text-gray-400">
					{textInput.length} characters
				</div>
			</div>

			<Button
				onClick={onProcessText}
				disabled={!textInput.trim() || isLoading}
				className="w-full gap-3 bg-black hover:bg-gray-800 rounded-2xl py-3 text-white font-medium"
			>
				{isLoading ? (
					<Spinner loading className="w-5 h-5" />
				) : (
					<FileText className="w-5 h-5" />
				)}
				Process Text Content
			</Button>
		</>
	);
};
