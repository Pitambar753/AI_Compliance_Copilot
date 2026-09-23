import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Trash2, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import axios from 'axios';

const API_BASE = '/api';

function TypingIndicator({ waitTime }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{ background: 'var(--color-primary)', padding: '8px', borderRadius: '50%', display: 'flex', flexShrink: 0 }}>
        <Bot size={16} color="#FFF" />
      </div>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: '0 6px 6px 6px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxShadow: 'var(--shadow-elevation)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', animation: 'bounce 1.2s infinite', animationDelay: '0s', display: 'inline-block' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', animation: 'bounce 1.2s infinite', animationDelay: '0.2s', display: 'inline-block' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', animation: 'bounce 1.2s infinite', animationDelay: '0.4s', display: 'inline-block' }} />
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginLeft: '4px' }}>AI Assistant is analyzing compliance documents...</span>
        </div>
        {waitTime > 8 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
            <Clock size={11} />
            {waitTime > 40
              ? `Processing policy context, please wait... (${waitTime}s)`
              : `Analyzing regulatory requirements... (${waitTime}s)`}
          </div>
        )}
        <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }`}</style>
      </div>
    </div>
  );
}

function SourcesPanel() {
  return null;
}

function renderFormattedMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, lIdx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const lineContent = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} style={{ color: '#C084FC', fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    return (
      <div key={lIdx} style={{ minHeight: line.trim() ? 'auto' : '8px', marginBottom: '4px' }}>
        {lineContent}
      </div>
    );
  });
}

function Message({ msg }) {
  const isUser = msg.sender === 'user';
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
      justifyContent: isUser ? 'flex-end' : 'flex-start'
    }}>
      {!isUser && (
        <div style={{
          background: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)',
          padding: '8px', borderRadius: '50%', display: 'flex', flexShrink: 0, marginTop: '2px',
          boxShadow: '0 0 12px rgba(168, 85, 247, 0.4)'
        }}>
          <Bot size={16} color="#FFF" />
        </div>
      )}

      <div style={{ maxWidth: '82%' }}>
        <div style={{
          background: isUser
            ? 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)'
            : 'rgba(15, 23, 42, 0.85)',
          color: '#F8FAFC',
          padding: '14px 18px',
          borderRadius: isUser ? '12px 12px 0 12px' : '0 12px 12px 12px',
          border: isUser
            ? '1px solid rgba(168, 85, 247, 0.5)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          fontSize: '14px',
          lineHeight: 1.6,
          wordBreak: 'break-word',
          boxShadow: isUser
            ? '0 4px 15px rgba(124, 58, 237, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)'
        }}>
          {renderFormattedMessage(msg.text)}
        </div>

        {!isUser && <SourcesPanel sources={msg.sources} />}

        <div style={{
          fontSize: '11px', color: '#94A3B8', marginTop: '6px',
          fontFamily: 'var(--font-mono)', textAlign: isUser ? 'right' : 'left'
        }}>
          {msg.time}
        </div>
      </div>

      {isUser && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '8px', borderRadius: '50%', display: 'flex', flexShrink: 0, marginTop: '2px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <User size={16} color="#FFF" />
        </div>
      )}
    </div>
  );
}

export default function ChatView() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Welcome to the Bank of India AI Compliance Assistant.\n\nAsk any question regarding SEBI and RBI regulatory circulars, internal policy compliance, or audit mandates.",
      sources: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGreeting: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const waitTimerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (loading) {
      setWaitTime(0);
      waitTimerRef.current = setInterval(() => setWaitTime(t => t + 1), 1000);
    } else {
      clearInterval(waitTimerRef.current);
      setWaitTime(0);
    }
    return () => clearInterval(waitTimerRef.current);
  }, [loading]);

  const handleSend = async () => {
    const text = query.trim();
    if (!text || loading) return;
    setQuery('');

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text, time: now };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const realMsgs = messages.filter(m => !m.isGreeting);
    const history = [];
    for (let i = 0; i < realMsgs.length - 1; i++) {
      if (realMsgs[i].sender === 'user' && realMsgs[i + 1]?.sender === 'bot') {
        history.push({
          query: realMsgs[i].text,
          answer: realMsgs[i + 1].text
        });
        i++;
      }
    }
    const recentHistory = history.slice(-4);

    try {
      const res = await axios.post(`${API_BASE}/chat`, {
        query: text,
        regulator: 'ALL',
        chat_history: recentHistory
      }, { timeout: 180000 });

      const botNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: res.data.answer || 'No response received.',
        sources: res.data.sources || [],
        time: botNow
      }]);
    } catch (err) {
      const botNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const errMsg = err.code === 'ECONNREFUSED' || err.message.includes('Network')
        ? '⚠️ Cannot connect to backend service. Please ensure the server is running on port 8001.'
        : `⚠️ Error: ${err.response?.data?.detail || err.message}`;

      setMessages(prev => [...prev, { sender: 'bot', text: errMsg, sources: [], time: botNow }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setMessages([{
      sender: 'bot',
      text: "Chat cleared. How can I help you?",
      sources: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const suggestions = [
    "What is the re-KYC requirement for high risk accounts?",
    "Explain SEBI SCORES 2.0 penalty rules",
    "What is the 6-hour cyber incident reporting SLA?",
    "Summarize RBI KYC master directions"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', minHeight: '600px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: 0 }}>

        {/* ── Header ── */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          background: 'rgba(15, 23, 42, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)',
              padding: '8px', borderRadius: '8px', display: 'flex',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.4)'
            }}>
              <Bot size={20} color="#FFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                AI Compliance Assistant
              </h3>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                SEBI & RBI Regulatory Knowledge Retrieval Engine
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              {messages.length - 1} message{messages.length !== 2 ? 's' : ''}
            </span>
            <button
              onClick={handleClear}
              className="action-btn-secondary"
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              <Trash2 size={13} /> Clear
            </button>
          </div>
        </div>

        {/* ── Messages ── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'rgba(7, 8, 12, 0.95)'
        }}>
          {messages.map((msg, idx) => <Message key={idx} msg={msg} />)}
          {loading && <TypingIndicator waitTime={waitTime} />}
          <div ref={bottomRef} />
        </div>

        {/* ── Quick Suggestions ── */}
        {messages.length === 1 && (
          <div style={{ padding: '12px 20px', background: 'rgba(15, 23, 42, 0.85)', borderTop: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
              Suggested Queries:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(s); inputRef.current?.focus(); }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    color: '#C084FC',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Input Bar ── */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '10px',
          background: 'rgba(15, 23, 42, 0.9)',
          flexShrink: 0
        }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask a regulatory compliance or policy query..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="search-input"
            disabled={loading}
            style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', color: '#F8FAFC', border: '1px solid rgba(255, 255, 255, 0.15)' }}
          />
          <button
            className="action-btn"
            onClick={handleSend}
            disabled={loading || !query.trim()}
            style={{ opacity: (loading || !query.trim()) ? 0.55 : 1, flexShrink: 0 }}
          >
            <Send size={14} />
            {loading ? 'Analyzing...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

