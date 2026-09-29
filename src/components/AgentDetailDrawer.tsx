'use client';

import React from 'react';
import styles from './Components.module.css';
import { Agent } from '../types/nexus';
import {
  X,
  Cpu,
  Layers,
  HardDrive,
  Clock,
  Terminal,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Zap
} from 'lucide-react';

interface AgentDetailDrawerProps {
  agent: Agent | null;
  onClose: () => void;
  onActionNotification: (msg: string) => void;
}

export default function AgentDetailDrawer({
  agent,
  onClose,
  onActionNotification
}: AgentDetailDrawerProps) {
  if (!agent) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          background: '#0a0e19',
          borderLeft: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          overflowY: 'auto',
          gap: '1.5rem',
          animation: 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
              {agent.callsign} // {agent.id}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {agent.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {agent.role}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Telemetry Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          background: 'rgba(255,255,255,0.02)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Current Status
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginTop: '2px' }}>
              {agent.status}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Foundation Model
            </span>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
              {agent.model}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Compute Load
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
              {agent.loadPercentage}%
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              RAM Allocation
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
              {(agent.memoryUsageMb / 1024).toFixed(2)} GB
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Tokens Processed
            </span>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a5b4fc', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
              {agent.tokensProcessed.toLocaleString()}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Container Uptime
            </span>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
              {agent.uptime}
            </div>
          </div>
        </div>

        {/* Current Active Task */}
        <div>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            In-Flight Operation
          </h4>
          <div style={{
            background: 'rgba(6, 182, 212, 0.06)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontSize: '0.85rem',
            color: '#e2e8f0',
            lineHeight: 1.5
          }}>
            {agent.currentTask}
          </div>
        </div>

        {/* System Prompt / Directive Schema */}
        <div>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Autonomous Directive Configuration
          </h4>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#94a3b8',
            lineHeight: 1.6
          }}>
            <code>
              {`{
  "agent_id": "${agent.id}",
  "clearance": "${agent.autonomyLevel}",
  "max_context_window": 1048576,
  "safety_guardrails": "ENFORCED_ZERO_LEAK",
  "tools": [${agent.tools.map((t) => `"${t}"`).join(', ')}]
}`}
            </code>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => {
              onActionNotification(`Flushed VRAM memory cache for ${agent.name}`);
            }}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: '#cbd5e1',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} />
            <span>Purge Memory</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onActionNotification(`Gracefully restarted container instance for ${agent.name}`);
            }}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(99, 102, 241, 0.3))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              fontSize: '0.8rem',
              color: '#38bdf8',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Zap size={14} />
            <span>Restart Agent</span>
          </button>
        </div>
      </div>
    </div>
  );
}
