import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function ProfileCard() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m Rahul’s AI Assistant. Ask me about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // TODO: Replace with HuggingFace API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🤖 (Mock reply) I’ll be connected to Rahul’s AI API soon!" }
      ]);
    }, 1000);

    setInput("");
  };

  return (
<div className="max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden border">
      {/* Banner with info */}
      <div className="relative bg-tech h-48 flex items-center px-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/rahulphoto.png" // 👈 replace with your photo in /public
            alt="Rahul Kolhe"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Info section */}
        <div className="ml-6 text-white">
          <h1 className="text-3xl font-bold">Rahul Kolhe</h1>
          <p className="text-lg font-medium">
            Technology Lead | AVP | Driving Digital Banking Innovation
          </p>
          <p className="text-sm text-gray-200">
            Cloud Transformation • Enterprise Resilience • Banking Domain
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com/in/rahul-kolhe-1346398/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-gray-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/RahulFreeCoder"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-gray-300"
            >
              GitHub
            </a>
            <a
              href="mailto:rahul.d.kolhe@gmail.com"
              className="underline hover:text-gray-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Skills & Experience */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Java", "Spring Boot", "Microservices", "ReactJS", "Angular", "AWS", "Kubernetes", "Cloud Architecture"].map(
            (skill) => (
              <span key={skill} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Chat Box */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Ask My AI Assistant</h2>
        <div className="bg-gray-50 border rounded-lg h-64 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-3">
          <input
            type="text"
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
            placeholder="Ask about Rahul’s experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}