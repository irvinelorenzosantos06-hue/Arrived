'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';
import { Agent } from '../types/nexus';
import {
  Play,
  Pause,
  Sliders,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface AgentFleetProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  onToggleStatus: (agentId: string) => void;
}

export default function AgentFleet({
  agents,
  onSelectAgent,
  onToggleStatus
}: AgentFleetProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'busy' | 'idle'>('all');

  const filteredAgents = agents.filter((agent) => {
    if (filter === 'all') return true;
    return agent.status === filter;
  });

  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-emerald"><span className="pulse-dot pulse-dot-emerald" />ACTIVE</span>;
      case 'busy':
        return <span className="badge badge-cyan"><span className="pulse-dot pulse-dot-cyan" />PROCESSING</span>;
      case 'idle':
        return <span className="badge badge-amber">STANDBY</span>;
      default:
        return <span className="badge badge-indigo">PAUSED</span>;
    }
  };

  return (
    <div className={styles.agentFleetContainer}>
      <div className={styles.filterBar}>
        <div className={styles.filterPills}>
          <button
            type="button"
            className={`${styles.filterPill} ${filter === 'all' ? styles.filterPillActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All Fleet ({agents.length})
          </button>
          <button
            type="button"
            className={`${styles.filterPill} ${filter === 'active' ? styles.filterPillActive : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({agents.filter((a) => a.status === 'active').length})
          </button>
          <button
            type="button"
            className={`${styles.filterPill} ${filter === 'busy' ? styles.filterPillActive : ''}`}
            onClick={() => setFilter('busy')}
          >
            Busy / In-flight ({agents.filter((a) => a.status === 'busy').length})
          </button>
          <button
            type="button"
            className={`${styles.filterPill} ${filter === 'idle' ? styles.filterPillActive : ''}`}
            onClick={() => setFilter('idle')}
          >
            Standby ({agents.filter((a) => a.status === 'idle').length})
          </button>
        </div>
      </div>

      <div className={styles.agentGrid}>
        {filteredAgents.map((agent) => (
          <div key={agent.id} className={styles.agentCard}>
            <div className={styles.agentCardGlow} />

            <div className={styles.agentHeader}>
              <div className={styles.agentTitleArea}>
                <span className={styles.agentCallsign}>{agent.callsign} • {agent.model}</span>
                <h3 className={styles.agentName}>{agent.name}</h3>
                <p className={styles.agentRole}>{agent.role}</p>
              </div>
              <div>{getStatusBadge(agent.status)}</div>
            </div>

            <div className={styles.agentCurrentTask}>
              <Sparkles size={16} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div className={styles.agentCurrentTaskText}>
                <strong>Current:</strong> {agent.currentTask}
              </div>
            </div>

            <div className={styles.loadSection}>
              <div className={styles.loadLabels}>
                <span>Compute Load</span>
                <span>{agent.loadPercentage}%</span>
              </div>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${agent.loadPercentage}%` }}
                />
              </div>
            </div>

            <div className={styles.agentMetaGrid}>
              <div className={styles.agentMetaItem}>
                <span className={styles.agentMetaLabel}>Latency</span>
                <span className={styles.agentMetaValue}>{agent.latencyMs}ms</span>
              </div>
              <div className={styles.agentMetaItem}>
                <span className={styles.agentMetaLabel}>RAM Buffer</span>
                <span className={styles.agentMetaValue}>{(agent.memoryUsageMb / 1024).toFixed(1)} GB</span>
              </div>
              <div className={styles.agentMetaItem}>
                <span className={styles.agentMetaLabel}>Uptime</span>
                <span className={styles.agentMetaValue}>{agent.uptime}</span>
              </div>
            </div>

            <div className={styles.toolsWrapper}>
              {agent.tools.map((tool, i) => (
                <span key={i} className={styles.toolTag}>
                  {tool}
                </span>
              ))}
            </div>

            <div className={styles.agentActions}>
              <button
                type="button"
                className={styles.inspectBtn}
                onClick={() => onSelectAgent(agent)}
              >
                <Sliders size={14} />
                <span>Inspect Telemetry</span>
              </button>

              <button
                type="button"
                className={styles.toggleStateBtn}
                onClick={() => onToggleStatus(agent.id)}
                title={agent.status === 'idle' ? 'Resume Agent' : 'Pause Agent'}
              >
                {agent.status === 'idle' ? (
                  <>
                    <Play size={13} color="#34d399" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause size={13} color="#f59e0b" />
                    <span>Pause</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
