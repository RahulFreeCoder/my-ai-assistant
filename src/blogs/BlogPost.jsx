import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import PostImage from './PostImage';

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const meta = {}

  useEffect(() => {
    const loadPost = async () => {
      try {
       // Fetch the file from the public directory
      fetch(`/content/blogs/${slug}.md`)
      .then(res => res.text())
      .then(text => setContent(text))
      .catch(err => console.error('Failed to load markdown file:', err));
       
      } catch (err) {
        setContent("❌ Blog not found");
      }
    };

    loadPost();
  }, [slug]);

  return (
    <div>
      {/* Blog Content */}
       <div className="prose lg:prose-xl max-w-none">
      <ReactMarkdown components={{
        img: PostImage,
      }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
    </div>
  );
}
