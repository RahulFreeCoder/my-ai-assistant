import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./blogs/BlogList";
import BlogPost from "./blogs/BlogPost";
import ProfileCard from "./ProfileCard";

function App() {
  return (
   <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-900 text-white p-4 flex gap-6">
          <Link to="/" className="hover:underline">Profile</Link>
          <Link to="/blogs" className="hover:underline">Blogs</Link>
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProfileCard />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
