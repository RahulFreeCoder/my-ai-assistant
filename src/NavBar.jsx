import { Home, FileText, Briefcase, BarChart, PenTool, Zap } from "lucide-react";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex space-x-6 bg-blue-700 text-white px-6 py-3 shadow-md">
      <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition">
        <Home size={20} /> Portfolio
      </Link>
      <Link to="/blogs" className="flex items-center gap-2 hover:text-blue-400 transition">
        <FileText size={20} /> Blogs
      </Link>
      <Link to="/job-match" className="flex items-center gap-2 hover:text-blue-400 transition">
        <BarChart size={20} /> Job Match
      </Link>
       <Link to="/generate" className="flex items-center gap-2 hover:text-blue-400 transition">
        <Zap size={20} /> Generator
      </Link>
      <Link to="/ai-lab" className="flex items-center gap-2 hover:text-blue-400 transition">
        <PenTool size={20} /> AI Lab
      </Link>
    </nav>
  );
}

export default Navbar;
