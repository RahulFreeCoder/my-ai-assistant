import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./config";

export default function ProfileCard() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m Rahul’s AI Assistant. Ask me about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, history: newMessages }),
        mode: "cors"
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, server error." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white shadow-2xl rounded-2xl overflow-hidden border">
      {/* Banner */}
      <div className="relative bg-tech h-56 flex items-center px-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/rahulphoto.png"
            alt="Rahul Kolhe"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="ml-6 text-white">
          <h1 className="text-3xl font-bold">Rahul Kolhe</h1>
          <p className="text-lg font-medium">
            Technology Lead | AVP | Driving Digital Banking Innovation
          </p>
          <p className="text-sm text-gray-200">
            Cloud Transformation • Enterprise Resilience • Banking Domain
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-white">
            <a className="flex items-center gap-2" href="Tel:+918975870365">
              <FaPhone className="text-lg" />
              <span>8975870365</span>
            </a>
            <a
              href="mailto:rahul.d.kolhe@gmail.com"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaEnvelope className="text-lg" />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rahul-kolhe-1346398/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaLinkedin className="text-lg" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/RahulFreeCoder"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaGithub className="text-lg" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "Java",
            "Spring Boot",
            "Microservices",
            "ReactJS",
            "Angular",
            "AWS",
            "Kubernetes",
            "Cloud Architecture",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Ask My AI Assistant
        </h2>
        <div className="bg-gray-50 border rounded-lg h-[30rem] overflow-y-auto p-4 space-y-2 w-full">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[75%] break-words ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="mr-auto bg-gray-200 text-gray-700 px-3 py-2 rounded-lg inline-block animate-pulse">
              🤖 Typing...
            </div>
          )}
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
