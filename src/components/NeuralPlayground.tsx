'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Components.module.css';
import { Agent } from '../types/nexus';
import {
  Terminal,
  Send,
  Sparkles,
  Bot,
  Zap,
  CornerDownLeft,
  Trash2,
  Check,
  Copy
} from 'lucide-react';

interface NeuralPlaygroundProps {
  agents: Agent[];
  onTriggerLog: (message: string, level: 'INFO' | 'ACTION' | 'SUCCESS') => void;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  tokens?: number;
  durationMs?: number;
}

const PRESET_PROMPTS = [
  'Refactor distributed cache locks to prevent redis thundering herd problem.',
  'Analyze TLS 1.3 handshake anomalies on ingress gateway node #04.',
  'Partition 500,000 vector embeddings into 4-dimensional hypercube shards.'
];

export default function NeuralPlayground({
  agents,
  onTriggerLog
}: NeuralPlaygroundProps) {
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || '');
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-init',
      sender: 'system',
      timestamp: '14:45:00',
      content:
        'Neural Command Console Initialized. Selected model weights mapped into active VRAM buffer.'
    }
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleSendPrompt = async (textToSend?: string) => {
    const query = (textToSend || promptInput).trim();
    if (!query || isGenerating) return;

    const userMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      content: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsGenerating(true);
    onTriggerLog(`Playground execution dispatched to ${selectedAgent.name}: "${query.slice(0, 35)}..."`, 'ACTION');

    // Simulate Agent Thinking & Tool Calling Steps
    await new Promise((r) => setTimeout(r, 600));

    const toolMsg: MessageItem = {
      id: `tool-${Date.now()}`,
      sender: 'system',
      timestamp: new Date().toLocaleTimeString(),
      content: `[TOOL_INVOKE] ${selectedAgent.name} activated tool: ${selectedAgent.tools[0]} // Args: { query: "${query.slice(0, 30)}" }`
    };
    setMessages((prev) => [...prev, toolMsg]);

    await new Promise((r) => setTimeout(r, 800));

    // Synthesized Response
    let responseText = '';
    if (query.toLowerCase().includes('cache') || query.toLowerCase().includes('redis')) {
      responseText = `### Analysis & Resolution from ${selectedAgent.name}\n\nTo prevent the thundering herd latency spike on vector/key lookup:\n\n` +
        `1. **Probabilistic Early Expiration (XFetch algorithm)**:\n` +
        `   Evaluate \`delta * beta * ln(rand())\` against TTL to recompute keys asynchronously before hard expiry.\n` +
        `2. **Distributed Mutex with Singleflight**:\n` +
        `   \`\`\`typescript\n` +
        `   const group = new SingleflightGroup();\n` +
        `   const value = await group.do(cacheKey, async () => {\n` +
        `     return await vectorDatabase.retrieve(embedding);\n` +
        `   });\n` +
        `   \`\`\`\n` +
        `3. **Telemetry Status**: Projected P99 latency drops from **340ms -> 18ms**.`;
    } else if (query.toLowerCase().includes('tls') || query.toLowerCase().includes('anomaly')) {
      responseText = `### Security Telemetry Report from ${selectedAgent.name}\n\n` +
        `- **Anomaly Root Cause**: Ingress gateway node #04 experienced TCP SYN backpressure.\n` +
        `- **Automated Remediation Applied**: \n` +
        `  * Expanded ephemeral socket pool by 4,096 descriptors.\n` +
        `  * Flushed stale cipher renegotiation tickets.\n` +
        `- **Status**: 100% healthy. Cipher negotiation normalized to **14ms**.`;
    } else {
      responseText = `### Multi-Agent Synthesis Completed\n\n` +
        `Agent **${selectedAgent.name}** processed query using foundation model **${selectedAgent.model}**.\n\n` +
        `- Evaluated contextual tensor tokens with cosine similarity threshold: **0.942**.\n` +
        `- All safety and execution constraints verified.\n` +
        `- Actionable output generated and verified against autonomous schema.`;
    }

    const agentMsg: MessageItem = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString(),
      content: responseText,
      tokens: 418 + Math.floor(Math.random() * 200),
      durationMs: 1400 + Math.floor(Math.random() * 400)
    };

    setMessages((prev) => [...prev, agentMsg]);
    setIsGenerating(false);
    onTriggerLog(`Response stream finalized by ${selectedAgent.name} (418 tokens, 142ms)`, 'SUCCESS');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={styles.playgroundContainer}>
      <aside className={styles.playgroundSidebar}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            Agent Target
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Select which neural agent orchestrates this session:
          </p>

          <select
            className={styles.formSelect}
            style={{ width: '100%' }}
            value={selectedAgentId}
            onChange={(e) => setSelectedAgentId(e.target.value)}
          >
            {agents.map((agt) => (
              <option key={agt.id} value={agt.id}>
                {agt.name} ({agt.callsign})
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700 }}>
            Quick Prompts
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PRESET_PROMPTS.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendPrompt(preset)}
                style={{
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.78rem',
                  color: '#cbd5e1',
                  lineHeight: '1.4',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                &ldquo;{preset}&rdquo;
              </button>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 'auto',
          background: 'rgba(0,0,0,0.3)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            Model Engine
          </div>
          <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700, marginTop: '2px' }}>
            {selectedAgent?.model}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Clearance: Level-5 Autonomous Action
          </div>
        </div>
      </aside>

      <section className={styles.playgroundMain} aria-label="Terminal Session">
        <div className={styles.terminalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className={styles.terminalDots}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <span className={styles.terminalTitle}>
              session://nexus-core/terminal/{selectedAgent?.callsign.toLowerCase()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMessages([])}
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
            title="Clear Terminal Output"
          >
            <Trash2 size={13} />
            <span>Clear</span>
          </button>
        </div>

        <div className={styles.terminalOutput}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '0.5rem 0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {msg.sender === 'user' && (
                    <strong style={{ color: '#38bdf8' }}>OPERATOR:</strong>
                  )}
                  {msg.sender === 'agent' && (
                    <strong style={{ color: '#a855f7' }}>{selectedAgent?.name}:</strong>
                  )}
                  {msg.sender === 'system' && (
                    <strong style={{ color: '#eab308' }}>SYSTEM KERNEL:</strong>
                  )}
                  <span>{msg.timestamp}</span>
                </span>

                {msg.sender === 'agent' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {msg.durationMs && <span>{msg.durationMs}ms</span>}
                    {msg.tokens && <span style={{ color: '#06b6d4' }}>{msg.tokens} tokens</span>}
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {copiedId === msg.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    </button>
                  </div>
                )}
              </div>

              <div
                style={{
                  background:
                    msg.sender === 'user'
                      ? 'rgba(6, 182, 212, 0.08)'
                      : msg.sender === 'system'
                      ? 'rgba(234, 179, 8, 0.06)'
                      : 'rgba(255, 255, 255, 0.02)',
                  borderLeft:
                    msg.sender === 'user'
                      ? '3px solid #06b6d4'
                      : msg.sender === 'system'
                      ? '3px solid #eab308'
                      : '3px solid #8b5cf6',
                  borderRadius: '0 8px 8px 0',
                  padding: '0.75rem 1rem',
                  whiteSpace: 'pre-wrap',
                  color: msg.sender === 'system' ? '#fde047' : '#f1f5f9'
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06b6d4', padding: '0.5rem 0' }}>
              <Sparkles size={16} className="animate-spin" />
              <span>{selectedAgent.name} is synthesizing reasoning tensors...</span>
            </div>
          )}

          <div ref={outputEndRef} />
        </div>

        <form
          className={styles.terminalInputArea}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
        >
          <input
            type="text"
            id="playground-prompt-input"
            className={styles.terminalInput}
            placeholder={`Instruct ${selectedAgent.name}... (e.g. Optimize SQL indexing, Refactor code)`}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            disabled={isGenerating}
          />

          <button
            type="submit"
            id="send-prompt-btn"
            className={styles.sendPromptBtn}
            disabled={isGenerating || !promptInput.trim()}
          >
            <Send size={15} />
            <span>Execute</span>
          </button>
        </form>
      </section>
    </div>
  );
}
