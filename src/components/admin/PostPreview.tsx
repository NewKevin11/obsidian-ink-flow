
import React from 'react';

interface PostPreviewProps {
  content: string;
  className?: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({ content, className = "" }) => {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
    </div>
  );
};

// Simple markdown parser (using the same function from PostEditor)
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

export default PostPreview;
