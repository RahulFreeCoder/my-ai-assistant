import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext, createContext } from "react";
import BlogList from "./blogs/BlogList";
import BlogPost from "./blogs/BlogPost";
import MemoProfileCard from "./ProfileCard";
import JobMatch from "./analyzer/JobMatch";
import Navbar from "./NavBar";
import Generator from "./generator/generator";

export const ThemeContext = createContext("light");
function App() {

  

  return (
    <ThemeContext.Provider value="dark">
   <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
      <Navbar />

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MemoProfileCard />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/job-match" element={<JobMatch />} />
            <Route path="/generate" element={<Generator />} />
          </Routes>
        </main>
      </div>
    </Router>
    </ThemeContext.Provider>
    
  );
}

export default App;
