import cn from 'mxcn'
import { IconSparkles } from './ui/icons'

// Prompt suggestions – Change these to match your use-case/company
const suggestions = [
  {
    title: `Say hello to begin conversation`,
    prompt: `Hello`
  },
  {
    title: `Help me draw the UML Class diagram for a strategy pattern in C++ code`,
    prompt: `Help me draw the UML for the following C++ code:

    
    enum class Format { Markdown, Html };

    struct ListStrategy {
        virtual ~ListStrategy() = default;
        virtual void add_list_item(ostringstream& oss, string& item) {};
        virtual void start(ostringstream& oss) {};
        virtual void end(ostringstream& oss) {};
    };

    struct MarkdownListStrategy: ListStrategy {
        void add_list_item(ostringstream& oss, string& item) override { oss << " - " << item << endl; }
    };

    struct HtmlListStrategy: ListStrategy {
        void start(ostringstream& oss) override { oss << "<ul>" << endl; }
        void end(ostringstream& oss) override { oss << "</ul>" << endl; }
        void add_list_item(ostringstream& oss, string& item) override { oss << "\t<li>" << item << "</li>" << endl; }
    };

    struct TextProcessor {
        void clear() {
            m_oss.str("");
            m_oss.clear();
        }

        void append_list(vector<string>& items) {
            m_list_strategy->start(m_oss);
            for (auto& item: items)
                m_list_strategy->add_list_item(m_oss, item);
            m_list_strategy->end(m_oss);
        }

        void set_output_format(Format& format) {
            switch (format) {
                case Format::Markdown: m_list_strategy = make_unique<MarkdownListStrategy>(); break;
                case Format::Html: m_list_strategy = make_unique<HtmlListStrategy>(); break;
            }
        }

        string str() { return m_oss.str(); }
    private:
        ostringstream               m_oss;
        unique_ptr<ListStrategy>    m_list_strategy;
    };

    int main() {
        // markdown
        TextProcessor tp;
        tp.set_output_format(Format::Markdown);
        tp.append_list({ "foo", "bar", "baz" });
        cout << tp.str() << endl;

        // html
        tp.clear();
        tp.set_output_format(Format::Html);
        tp.append_list({ "foo", "bar", "baz" });
        cout << tp.str() << endl;

        return EXIT_SUCCESS;
    }
`

  },
]

export const Suggestions = ({
  sendSuggestedPrompt
}: {
  sendSuggestedPrompt: (prompt: string) => void
}) => {
  const handleClick = (prompt: string) => {
    sendSuggestedPrompt(prompt)
  }

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <label className="font-semibold">Suggestions</label>
      <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              className={cn(
                'border-muted-foreground/20 flex cursor-pointer items-center gap-4 rounded-md border p-4',
                'hover:bg-background transition-all'
              )}
              onClick={() => handleClick(suggestion.prompt)}
            >
              <IconSparkles
                className="text-muted-foreground size-4"
                aria-hidden="true"
              />
              <p className="text-foreground/70 line-clamp-2 font-light leading-6">
                {suggestion.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}