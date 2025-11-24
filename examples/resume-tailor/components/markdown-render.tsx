import { Streamdown } from 'streamdown';

const MarkdownRender = ({ content }: { content: string }) => {
	return <Streamdown>{content}</Streamdown>;
};

export default MarkdownRender;
