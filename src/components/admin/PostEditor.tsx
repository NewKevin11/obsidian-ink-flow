
import { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import PostPreview from './PostPreview';

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
              className="data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300"
            >
              Edit
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300"
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
              <PostPreview content={value} />
            ) : (
              <p className="text-gray-500 italic">No content to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
