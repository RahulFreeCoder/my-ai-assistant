import React, { useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { API_BASE_URL } from "../config";
import html2pdf from 'html2pdf.js';

function Generator() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [longProcess, setLongProcess] = useState(false);
  const controllerRef = useRef(null);
  const  pdfRef = useRef(null);

function convertToPDF() {
  // Create a temporary container
  const tempElement = document.createElement('div');
  document.body.appendChild(tempElement);

  const root = createRoot(tempElement);
  root.render(<PDFTextContent result={result} />);

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

  const handleGenerator = async () => {
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
      const res = await fetch(`${API_BASE_URL}/api/generate`, {
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
  const PDFTextContent = ({ result }) => (
        
     <>
       <h1> Generator</h1>
    </>

    );
return (
    <div
        className="max-w-lg  mx-auto bg-white rounded-md shadow-md"
        style={{ padding: "2rem", marginTop: "4rem" }}
    >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Generator
        </h2>

        {/* File Upload */}
        <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
                Upload JD File (PDF or Docx only)
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
                onClick={handleGenerator}
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? "Generating..." : "Generate"}
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
            <div id="text-container" ref={pdfRef}>
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
                    <PDFTextContent result={result} />
              </div>
             </div>
             </div>
        )}
        <div id="pdf-content-to-convert">
             {result && <PDFTextContent result={result} />}
        </div>
       
    </div>
);
}

export default Generator;
