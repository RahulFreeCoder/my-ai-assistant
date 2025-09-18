import { Link } from "react-router-dom";
import blogPosts from "../content/blogIndex.json"; // static index of blogs

export default function BlogList() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="block p-6 rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.date}</p>
            <p className="mt-2 text-gray-800">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
