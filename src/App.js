import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./blogs/BlogList";
import BlogPost from "./blogs/BlogPost";
import ProfileCard from "./ProfileCard";
import JobMatch from "./analyzer/JobMatch";
import Navbar from "./NavBar";

function App() {
  return (
   <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
      <Navbar />

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProfileCard />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/job-match" element={<JobMatch />} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
}

export default App;
