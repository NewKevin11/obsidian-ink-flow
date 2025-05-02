
import { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface PostEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const PostEditor = ({ value, onChange }: PostEditorProps) => {
  const [activeTab, setActiveTab] = useState('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="rounded-md border border-gray-700 bg-gray-800 overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-gray-700 px-3 py-2">
          <TabsList className="bg-gray-700">
            <TabsTrigger 
              value="edit" 
              className={`data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300`}
            >
              Edit
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className={`data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300`}
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="p-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextChange}
            className="min-h-[400px] resize-y rounded-none border-0 bg-gray-900 p-4 text-white font-mono leading-relaxed placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Write your content in markdown format..."
          />
        </TabsContent>
        
        <TabsContent value="preview" className="p-0">
          <div className="min-h-[400px] max-w-full overflow-auto bg-gray-900 p-4 text-white">
            {value ? (
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }} 
              />
            ) : (
              <p className="text-gray-500 italic">No content to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Very simple markdown parser
function parseMarkdown(markdown: string): string {
  // Handle headings
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Handle bold and italic
  html = html
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>');
  
  // Handle links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Handle images
  html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="my-4 rounded-md" />');
  
  // Handle code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Handle inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Handle lists
  html = html.replace(/^\s*\n\* (.*)/gm, '<ul>\n<li>$1</li>\n</ul>');
  html = html.replace(/^\s*\n\d+\. (.*)/gm, '<ol>\n<li>$1</li>\n</ol>');
  
  // Handle paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gm, function(m) {
    return /\<(\/)?(h1|h2|h3|h4|h5|h6|ul|ol|li|blockquote|code|pre|img|p)/.test(m) ? m : '<p>' + m + '</p>';
  });
  
  // Fix multiple adjacent lists
  html = html
    .replace(/<\/ul>\s?<ul>/g, '')
    .replace(/<\/ol>\s?<ol>/g, '');
  
  // Handle line breaks
  html = html.replace(/\n/g, '<br />');
  
  return html;
}

export default PostEditor;
