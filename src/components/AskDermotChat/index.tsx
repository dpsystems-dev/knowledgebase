import React, { useState, useRef, useEffect, type ReactElement } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import styles from './styles.module.css';

// Detect color mode from DOM attribute
function useThemeFromDOM() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setColorMode(theme === 'dark' ? 'dark' : 'light');
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return colorMode;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'How do I install ABM Web Portal?',
  'What is ABM Service Docket?',
];

// Mermaid diagram component
function MermaidDiagram({ code, colorMode }: { code: string; colorMode: string }) {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Initialize mermaid with the correct theme
        mermaid.initialize({
          startOnLoad: false,
          theme: colorMode === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
        });
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        setSvg(svg);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        setSvg('');
      }
    };
    renderDiagram();
  }, [code, colorMode]);

  if (!svg) {
    return <pre className={styles.codeBlock}><code>{code}</code></pre>;
  }

  return (
    <div
      className={styles.mermaidDiagram}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// Factory to create code block component with colorMode
function createCodeBlock(colorMode: string) {
  return function CodeBlock({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const code = String(children).replace(/\n$/, '');

    if (language === 'mermaid') {
      return <MermaidDiagram code={code} colorMode={colorMode} />;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };
}

export default function AskDermotChat(): ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const colorMode = useThemeFromDOM();
  const apiKey = siteConfig.customFields?.docsGptApiKey as string;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  // Create code block component with current color mode
  const CodeBlock = createCodeBlock(colorMode);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  // Hide widget if no API key configured
  if (!apiKey) {
    return null;
  }

  const handleSend = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: messageText }]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://gptcloud.arc53.com/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: messageText, api_key: apiKey }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
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
                    {message.role === 'assistant' ? (
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{ code: CodeBlock }}
                      >
                        {message.content}
                      </Markdown>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
                  <img
                    src="/knowledgebase/img/favicon.svg"
                    alt="Dermot"
                    className={styles.messageAvatar}
                  />
                  <div className={styles.loadingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
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
              disabled={!inputText.trim() || isLoading}
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
