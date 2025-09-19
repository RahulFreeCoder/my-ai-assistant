![banner](/images/portolio-banner.png)
# Building My AI Portfolio Assistant: A Step Toward Smarter Career Showcasing  

## 🚀 Why I Built This  
Resumes are static. They struggle to capture the depth of experience, projects, and innovation that a professional brings. Recruiters often skim PDFs, missing the real story.  

That’s why I built an **AI Portfolio Assistant** — a system where recruiters, peers, or collaborators can **chat with my career**. Instead of scrolling through pages, they can simply ask:  
- “Tell me about Rahul’s cloud migration projects.”  
- “What leadership experience does he have?”  
- “How does he apply AI in banking?”  

The assistant responds in real-time, powered by Large Language Models (LLMs), giving context-rich and conversational answers.  

---
![Aarchitecture diagram ](/images/ai-portfolio-architecture.png)
## 🧩 How It Works: Architecture Overview  

The system has three main layers:  

1. **Frontend (React.js + TailwindCSS)**  
   - A clean, professional UI where users can chat with the assistant.  
   - Responsive design for both desktop and mobile.  
   - Simple, branded layout that highlights skills and roles.  

2. **Backend (FastAPI + uv)**  
   - Exposes REST APIs to handle user queries.  
   - Retrieves profile data (from PDFs, summaries, or structured text).  
   - Calls the LLM with system prompts, history, and user messages.  

3. **AI Data Layer**  
   - Profile stored as text + PDF documents.  
   - LLM (Gemini / OpenAI) used for reasoning and generating answers.  
   - Plans to integrate a **vector database** for smarter search.  

---

## ⚙️ Design Choices & Prompt Engineering  

One of the key challenges was getting accurate and relevant responses.  
- I use a **system prompt** that defines the assistant’s persona: *“You are Rahul’s AI Assistant. Answer as if you are him, with details on skills, projects, leadership, and achievements.”*  
- Conversations are structured as:  



---

## 📂 Data Sources & Accuracy

The assistant uses multiple data sources:

- Resume PDF → Parsed to extract detailed project info.
- Profile Summary → A curated text version of my career highlights.
- Skills / Keywords → Tags like Java, Spring Boot, ReactJS, Cloud, Banking Domain.

## Challenge: PDFs don’t always parse cleanly, so future improvements will include OCR and structured data exports.

--- 

## 🎨 User Experience & Branding
The assistant is not just functional but also designed to be engaging:

- Banner Section → My profile photo, title, and key skills.
- Chat UI → Clean, intuitive interface with typing indicators.
- Skills Chips → Visual tags for quick scanning.
- Navigation Tabs → Blogs, portfolio, and chat all in one place.

I wanted recruiters to feel this was a professional product, not just a demo.

## 📈 Feedback & Metrics
Early feedback has been very positive:

- Recruiters find it easier to get answers directly.
- Peers liked the idea of “conversational portfolios”.
- Some suggested it could extend into team/company hiring assistants.

## 🔮 Future Plans

- Vector Database → Smarter retrieval of projects & details.
- Voice Assistant → Let people talk to the portfolio.
- Analytics Dashboard → To monitor engagement.
- Multi-language Support → Expand beyond English.
- Recruiter Mode → Allow uploading of job descriptions and matching skills.

## ✅ Conclusion

The AI Portfolio Assistant is my experiment in reimagining how professionals present themselves. Instead of passive resumes, we can create living, interactive career profiles.

For me, this is just the beginning — a step toward smarter, conversational portfolios that showcase skills, projects, and leadership in real-time.

## Demo video
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/Xa8znaDo7JA" 
  title="AI portfolio demo" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>