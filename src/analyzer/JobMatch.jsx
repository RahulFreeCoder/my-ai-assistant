import React, { useState } from "react";
import { API_BASE_URL } from "./config";

function JobMatch() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null); // Add state for AbortController


  const handleAnalyze = async () => {
    setLoading(true);
    let formData = new FormData();

    if (file) {
      formData.append("file", file);
    } else if (jdText.trim().length > 0) {
      const blob = new Blob([jdText], { type: "text/plain" });
      formData.append("file", blob, "jd.txt");
    } else {
      alert("Please upload a file or enter JD text.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/match`, {
        method: "POST",
        body: formData,
        signal: AbortController.signal, // Pass the signal to fetch
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setController(null); // Clear the controller state
    }
  };

  const handleCancel = () => {
  if (controller) {
    controller.abort();
  }
};

return (
    <div
        className="max-w-xl mx-auto p-10 bg-white rounded-2xl shadow-md"
        style={{ padding: "2rem", marginTop: "4rem" }}
    >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Job Match Analyzer
        </h2>

        {/* File Upload */}
        <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
                Upload JD File (PDF only)
            </label>
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile && selectedFile.type !== "application/pdf") {
                        alert("Only PDF files are allowed.");
                        e.target.value = "";
                        setFile(null);
                        return;
                    }
                    setFile(selectedFile);
                }}
                className="w-full border rounded px-3 py-2"
            />
        </div>

        {/* OR Divider */}
        <div className="text-center my-2 text-gray-500 font-medium">OR</div>

        <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
                Paste Job Description
            </label>
            <textarea
                rows="12"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full border rounded px-3 py-2 min-h-[200px] resize-y"
                style={{ minHeight: "200px" }}
            />
        </div>

        {/* Analyze Button */}
        <div className="flex space-x-4">
            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? "Analyzing..." : "Analyze"}
            </button>

            {loading && (
                <button
                onClick={handleCancel}
                className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
                >
                Cancel
                </button>
            )}
        </div>

        {/* Result Modal */}
        {result && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                        onClick={() => setResult(null)}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <h3 className="text-xl font-bold mb-2 text-green-700">Analysis Result</h3>
                   {/* --- Good Match Section --- */}
                    {result.relevance > 30 && (
                        <div className="mb-4 p-4 border border-green-400 rounded-lg bg-green-50">
                           <p className="font-bold text-green-800">Excellent! This looks like a great match.</p>
                        </div>
                    )}
                    {result.relevance <= 30 && result.relevance > 20 && (
                        <div className="mb-4 p-4 border border-yellow-400 rounded-lg bg-yellow-50">
                           <p className="font-bold text-yellow-800">Caution: Your profile has a lower skill match for this role.</p>
                        </div>
                    )}
                    {result.relevance < 20 && (
                        <div className="mb-4 p-4 border border-red-400 rounded-lg bg-red-50">
                           <p className="font-bold text-yellow-800">Caution: Your profile is NO match for this role.</p>
                        </div>
                    )}

                    <p className="text-lg font-semibold text-green-700">{result.message}</p>
                    {result.relevance && (
                        <p className="text-gray-700 mt-2">
                            Relevance Score: <span className="font-bold">{result.relevance}%</span>
                        </p>
                        
                    )}
                    
                    {result.missing_skills && result.missing_skills.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-md font-bold mb-2 text-red-700">Missing Skills:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                {result.missing_skills.map((skill, index) => (
                                    <li key={index} className="mb-1">{skill}</li>
                                ))}
                            </ul>
                            {/* --- Add the manual check note here --- */}
                            
                        </div>
                    )}
                    <p className="text-sm text-gray-500 italic mt-3">
                                Note: This analysis is automated. Please review the missing skills manually against resume & JD.
                    </p>
                </div>
            </div>
        )}
        
    </div>
);
}

export default JobMatch;
