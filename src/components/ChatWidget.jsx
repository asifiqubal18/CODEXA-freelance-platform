import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { FAQsData } from '../data/FAQsData';
import '../styles/ChatWidget.css';

export default function ChatWidget({ onOpenAddProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi! Welcome to CODEXA. I'm your AI Assistant. How can I help you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (userText) => {
    const textToSend = userText || inputText;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInputText('');

    // Generate automated bot response
    setTimeout(() => {
      let botAnswer = "Thanks for your message! You can use our Interactive Cost Calculator above for an instant estimate, or submit an inquiry in the Contact section to speak with our tech lead.";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('add project') || lower.includes('portfolio') || lower.includes('manually')) {
        botAnswer = "You can manually add custom portfolio projects to show clients by clicking the '+ Add Project' button in the top navbar or portfolio section!";
      } else if (lower.includes('timeline') || lower.includes('how long')) {
        botAnswer = "Most web & app projects are delivered in 2 to 6 weeks depending on features and scope.";
      } else if (lower.includes('tech stack') || lower.includes('react') || lower.includes('ios')) {
        botAnswer = "We specialize in React, Next.js, React Native, Flutter, Python AI, Node.js, and AWS Cloud.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botAnswer }]);
    }, 600);
  };

  const handleFaqClick = (faq) => {
    handleSend(faq.question);
  };

  return (
    <>
      {/* Widget Trigger Button */}
      <button 
        className="chat-widget-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        title="Open CODEXA Assistant"
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="chat-box-wrapper">
          <div className="chat-header">
            <div className="chat-avatar-title">
              <div className="chat-bot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  CODEXA AI Assistant
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span className="pulse-dot" style={{ width: 6, height: 6 }}></span> Online & Ready
                </div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-msg ${m.sender}`}>
                {m.text}
              </div>
            ))}

            {/* FAQ Chips */}
            {messages.length < 3 && (
              <div className="chat-quick-faqs">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Quick Questions:</div>
                {FAQsData.slice(0, 3).map((faq, idx) => (
                  <button key={idx} className="faq-chip" onClick={() => handleFaqClick(faq)}>
                    {faq.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-footer" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask a question..." 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
            />
            <button type="submit" className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
