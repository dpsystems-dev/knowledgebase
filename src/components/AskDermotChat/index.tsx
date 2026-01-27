import React, { useState, useRef, useEffect, type ReactElement } from 'react';
import styles from './styles.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'How do I install ABM Web Portal?',
  'What is ABM Service Docket?',
];

const mockResponse = `To install ABM Web Portal, follow these steps:

1. Download the installer from the releases page
2. Run the setup wizard and follow the prompts
3. Configure your database connection
4. Start the service and access the web interface

For detailed instructions, check the ABM Web Portal installation guide.`;

export default function AskDermotChat(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate assistant response (mock for now)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: mockResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={styles.fab}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open Ask Dermot chat'}
      >
        {isOpen ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className={styles.fabText}>Close</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className={styles.fabText}>Ask Dermot</span>
          </>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className={styles.modal}>
          {/* Header */}
          <div className={styles.header}>
            <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className={styles.headerDot} />
            <span className={styles.headerTitle}>Ask Dermot</span>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className={styles.welcomeScreen}>
              <img
                src="/knowledgebase/img/favicon.svg"
                alt="Dermot avatar"
                className={styles.avatar}
              />
              <div className={styles.greeting}>Hello there!</div>
              <div className={styles.subGreeting}>
                I am your DP Systems<br />Knowledge Base Assistant.
              </div>
              <div className={styles.helpText}>How can I help you today?</div>
              <div className={styles.suggestions}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className={styles.suggestionButton}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Thread */
            <div className={styles.thread} ref={threadRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.messageRow} ${
                    message.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant
                  }`}
                >
                  {message.role === 'assistant' && (
                    <img
                      src="/knowledgebase/img/favicon.svg"
                      alt="Dermot"
                      className={styles.messageAvatar}
                    />
                  )}
                  <div
                    className={
                      message.role === 'user' ? styles.userMessage : styles.assistantMessage
                    }
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.input}
              placeholder="Type your question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.sendButton}
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
