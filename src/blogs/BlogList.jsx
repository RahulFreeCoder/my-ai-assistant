import { Link } from "react-router-dom";
import blogPosts from "../content/blogIndex.json";

export default function ZigZagBlogTimeline() {
  let lastMonthYear = "";

  // Sort blogs by date descending (latest first)
  const sortedPosts = blogPosts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center md:text-left">
        My Blogs
      </h1>

      <div className="relative">
        {/* Central vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

        {sortedPosts.map((post, index) => {
          const isLeft = index % 2 === 0;

          // Format month/year for timeline label
          const postDate = new Date(post.date);
          const monthYear = postDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });

          // Determine whether to show the label above dot
          const showLabel = monthYear !== lastMonthYear;
          lastMonthYear = monthYear;

          // Full date for the card
          const fullDate = postDate.toLocaleDateString("default", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={post.slug}
              className={`mb-16 relative w-full flex justify-${isLeft ? "start" : "end"}`}
            >
              {/* Timeline dot */}
              <span className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white z-10"></span>

              {/* Month/Year label (show once per month) */}
              {showLabel && (
                <span
                  className={`absolute left-1/2 transform -translate-x-1/2 -top-6 text-xs font-semibold text-gray-600 ${
                    isLeft
                      ? "translate-x-12 md:translate-x-16 text-left"
                      : "-translate-x-12 md:-translate-x-16 text-right"
                  }`}
                >
                  {monthYear}
                </span>
              )}

              {/* Blog card */}
              <Link
                to={`/blogs/${post.slug}`}
                className={`w-full md:w-5/12 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 duration-300 bg-white ${
                  isLeft ? "text-left" : "text-right"
                }`}
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-1">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{fullDate}</p>
                <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
