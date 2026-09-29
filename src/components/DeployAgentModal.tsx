'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';
import { Agent } from '../types/nexus';
import { X, Sparkles, Cpu, Shield, Wrench } from 'lucide-react';

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agent: Agent) => void;
}

const AVAILABLE_TOOLS = [
  'CodeSandbox',
  'TerminalEnv',
  'GitSync',
  'VectorDB',
  'DocumentParser',
  'FirewallAPI',
  'DockerDaemon',
  'WebRTCSocket'
];

export default function DeployAgentModal({
  isOpen,
  onClose,
  onDeploy
}: DeployAgentModalProps) {
  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [role, setRole] = useState('');
  const [model, setModel] = useState('Gemini 2.5 Ultra');
  const [autonomyLevel, setAutonomyLevel] = useState<Agent['autonomyLevel']>('Autonomous');
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'CodeSandbox',
    'VectorDB',
    'TerminalEnv'
  ]);

  if (!isOpen) return null;

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    const newAgent: Agent = {
      id: `agt-${Date.now().toString(36)}`,
      name: name.trim(),
      callsign: callsign.trim() || `NX-${Math.floor(10 + Math.random() * 89)}`,
      role: role.trim(),
      model,
      status: 'active',
      autonomyLevel,
      currentTask: 'Initialized and joining mesh cluster routing pool',
      loadPercentage: 15,
      memoryUsageMb: 1024 + Math.floor(Math.random() * 1024),
      tokensProcessed: 0,
      uptime: '0m',
      tools: selectedTools,
      latencyMs: 65 + Math.floor(Math.random() * 40)
    };

    onDeploy(newAgent);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className={styles.modalTitle}>Deploy Neural Agent</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Provision new autonomous agent instance into global compute mesh
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="agent-name-input">
                Agent Name *
              </label>
              <input
                id="agent-name-input"
                type="text"
                className={styles.formInput}
                placeholder="e.g. Chronos Synthesizer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="agent-callsign-input">
                Callsign Tag
              </label>
              <input
                id="agent-callsign-input"
                type="text"
                className={styles.formInput}
                placeholder="e.g. CHRONOS-03"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="agent-role-input">
              Specialization & Primary Directives *
            </label>
            <input
              id="agent-role-input"
              type="text"
              className={styles.formInput}
              placeholder="e.g. High-throughput time-series anomaly detection & prediction"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="agent-model-select">
                Foundation Model Engine
              </label>
              <select
                id="agent-model-select"
                className={styles.formSelect}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="Gemini 2.5 Ultra">Gemini 2.5 Ultra (Native Multimodal)</option>
                <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet (Hybrid Reasoning)</option>
                <option value="DeepSeek R1">DeepSeek R1 (Deep Math & Logic)</option>
                <option value="GPT-4.5 Orion">GPT-4.5 Orion (Multi-turn Orchestrator)</option>
                <option value="Llama 3.3 70B">Llama 3.3 70B (Private Edge Node)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="agent-autonomy-select">
                Autonomy Clearance
              </label>
              <select
                id="agent-autonomy-select"
                className={styles.formSelect}
                value={autonomyLevel}
                onChange={(e) => setAutonomyLevel(e.target.value as Agent['autonomyLevel'])}
              >
                <option value="Autonomous">Autonomous (Direct Execution)</option>
                <option value="Supervised">Supervised (Human Approval Required)</option>
                <option value="Deterministic">Deterministic (Strict Pipeline Only)</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Tool & Hardware Entitlements
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
              {AVAILABLE_TOOLS.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#22d3ee' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tool} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-deploy-agent-btn"
              className={styles.confirmBtn}
            >
              Provision & Launch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
