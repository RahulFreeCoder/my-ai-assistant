import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { API_BASE_URL } from "../config";
import html2pdf from 'html2pdf.js';



function JobMatch() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [longProcess, setLongProcess] = useState(false);
  const controllerRef = useRef(null);
  const  pdfRef = useRef(null);

  // A simple utility function to truncate text
  const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
  };
  const ReportContent = ({ result }) => (
  <>
    {/* ... All your JSX for the report goes here ... */}
   
                    <h3 className="text-xl font-bold mb-2 text-green-700">Analysis Result</h3>

                    
                   {/* --- Good Match Section --- */}
                    {result.relevance > 50 && (
                        <div className="mb-4 p-4 border border-green-400 rounded-lg bg-green-50">
                           <p className="font-bold text-green-800">Excellent! This looks like a great match.</p>
                        </div>
                    )}
                    {result.relevance <= 50 && result.relevance > 20 && (
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
                    <div className="px-0 pb-0">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Matched Skills:</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {result?.matched_skills.map((skill) => (
                            <span
                            key={skill}
                            className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                            >
                           {truncateText(skill, 25)}
                            </span>
                        ))}
                    </div>
                    </div>
                    <div className="px-0 pb-0">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Partial Matched Skills (Top 10 skills):</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {result?.partial_skills.slice(0, 10).map((skill) => (
                            <span
                            key={skill}
                            className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full"
                            >
                            {truncateText(skill, 25)}
                            </span>
                        ))}
                    </div>
                    </div>
                     
                    {result.missing_skills && result.missing_skills.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-md font-bold mb-2 text-red-700">Missing Skills:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                {result.missing_skills.slice(0,5).map((skill, index) => (
                                    <li key={index} className="mb-1">{skill}</li>
                                ))}
                            </ul>
                            {/* --- Add the manual check note here --- */}
                            
                        </div>
                    )}
                    {result && result.reasoning && (
                        <div className="mt-4">
                            <h4 className="text-md font-bold mb-2 text-red-700">Reasoning :</h4>
                            {Object.entries(result.reasoning).map(([skill, reason]) => (
                                <div key={skill}>
                                    <p><strong>Reasoning for {skill}:</strong> {reason}</p>
                                </div>
                            ))}
                           
                        </div>
                    )}
                     {/* --- Add the manual check note here --- */}
                    <p className="text-sm text-gray-500 italic mt-3">
                                Note: This analysis is automated. Please review the missing skills manually against resume & JD.
                    </p>
                
  </>
  );
// Define the ReportContent component to use simple inline styles
  const PDFReportContent = ({ result }) => (
        
        <>
        {/* ... All your JSX for the report goes here ... */}
    
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#16a34a' }}>Analysis Result</h3>

        {/* --- Good Match Section --- */}
        {result.relevance > 50 && (
            <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #4ade80', borderRadius: '0.5rem', backgroundColor: '#ecfdf5' }}>
            <p style={{ fontWeight: 'bold', color: '#065f46' }}>Excellent! This looks like a great match.</p>
            </div>
        )}
        {result.relevance <= 50 && result.relevance > 20 && (
            <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #fde047', borderRadius: '0.5rem', backgroundColor: '#fefce8' }}>
            <p style={{ fontWeight: 'bold', color: '#a16207' }}>Caution: Your profile has a lower skill match for this role.</p>
            </div>
        )}
        {result.relevance < 20 && (
            <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #fca5a5', borderRadius: '0.5rem', backgroundColor: '#fef2f2' }}>
            <p style={{ fontWeight: 'bold', color: '#f87171' }}>Caution: Your profile is NO match for this role.</p>
            </div>
        )}

        <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#16a34a' }}>{result.message}</p>
        {result.relevance && (
            <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>
                Relevance Score: <span style={{ fontWeight: 'bold' }}>{result.relevance}%</span>
            </p>
        )}
        <div style={{ paddingLeft: '0', paddingBottom: '0' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>Matched Skills:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {result?.matched_skills.map((skill) => (
                    <span
                    key={skill}
                    style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.875rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', borderRadius: '9999px' }}
                    >
                {truncateText(skill, 25)}
                    </span>
                ))}
            </div>
        </div>
        <div style={{ paddingLeft: '0', paddingBottom: '0' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>Partial Matched Skills (Top 10 skills):</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {result?.partial_skills.slice(0, 10).map((skill) => (
                    <span
                    key={skill}
                    style={{ backgroundColor: '#fffbe0', color: '#9a3412', fontSize: '0.875rem', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', borderRadius: '9999px' }}
                    >
                    {truncateText(skill, 25)}
                    </span>
                ))}
            </div>
        </div>
        
        {result.missing_skills && result.missing_skills.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#b91c1c' }}>Missing Skills:</h4>
                <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#4b5563' }}>
                    {result.missing_skills.slice(0,5).map((skill, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>{skill}</li>
                    ))}
                </ul>
            </div>
        )}
        {result && result.reasoning && (
            <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#b91c1c' }}>Reasoning :</h4>
                {Object.entries(result.reasoning).map(([skill, reason]) => (
                    <div key={skill}>
                        <p><strong>Reasoning for {skill}:</strong> {reason}</p>
                    </div>
                ))}
            </div>
        )}
        <p style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic', marginTop: '0.75rem' }}>
            Note: This analysis is automated. Please review the missing skills manually against resume & JD.
        </p>
    </>

    );
function convertToPDF() {
  // Create a temporary container
  const tempElement = document.createElement('div');
  document.body.appendChild(tempElement);

  const root = createRoot(tempElement);
  root.render(<PDFReportContent result={result} />);

  // Wait for React to render the component before proceeding
  setTimeout(() => {
    const options = {
      margin: 1,
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(tempElement).save().finally(() => {
      root.unmount();
      document.body.removeChild(tempElement);
    });
  }, 1000); // Increased timeout to 500ms for safety
}

const LoadingModal = ({ onCancel, longProcess }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-4 text-gray-700 text-lg mt-2">
                {longProcess ? "This is taking a bit longer than usual..." : "Analyzing..."}
            </span>
            <button
                onClick={onCancel}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
                Cancel
            </button>
        </div>
    </div>
);

  const handleAnalyze = async () => {
    setLoading(true);
    setLongProcess(false); 
    // Create a new AbortController instance
    controllerRef.current = new AbortController();
    const timer = setTimeout(() => {
        setLongProcess(true);
    }, 60000); // 60 seconds

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
        signal: controllerRef.current.signal, // Pass the signal to fetch
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        // This is a deliberate cancellation, so do nothing.
        console.log('Fetch aborted by user.');
      } else {
        // For all other errors, show the alert.
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      controllerRef.current = null; // Clear the controller state
    }
  };

  const handleCancel = () => {
  if (controllerRef.current) {
    controllerRef.current.abort();
    setLoading(false); // Also set loading to false to hide the modal
  }
};

return (
    <div
        className="max-w-lg  mx-auto bg-white rounded-md shadow-md"
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
    accept=".pdf, .docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    onChange={(e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const acceptedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            // You can also check for extensions as a fallback
            const fileExtension = selectedFile.name.split('.').pop();
            const isPdf = selectedFile.type === "application/pdf";
            const isDocx = fileExtension === "docx" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            if (!isPdf && !isDocx) {
                alert("Only PDF and DOCX files are allowed.");
                e.target.value = "";
                setFile(null);
                return;
            }
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
       {loading && <LoadingModal onCancel={handleCancel} longProcess={longProcess} />}
        {/* Result Modal */}
        {result && (
            <div id="report-container" ref={pdfRef}>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-lg p-8 w-4/5 max-h-[80vh] overflow-y-auto relative">
                    <button onClick={() => convertToPDF()}   className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50">
                        Download(Pdf)
                    </button>
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                        onClick={() => setResult(null)}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <ReportContent result={result} />
              </div>
             </div>
             </div>
        )}
        <div id="pdf-content-to-convert">
             {result && <PDFReportContent result={result} />}
        </div>
       
    </div>
);
}

export default JobMatch;
