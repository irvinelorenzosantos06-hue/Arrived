'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import compStyles from '../components/Components.module.css';
import Navbar from '../components/Navbar';
import MetricsCards from '../components/MetricsCards';
import AgentFleet from '../components/AgentFleet';
import WorkflowVisualizer from '../components/WorkflowVisualizer';
import NeuralPlayground from '../components/NeuralPlayground';
import LiveTelemetryLogs from '../components/LiveTelemetryLogs';
import DeployAgentModal from '../components/DeployAgentModal';
import AgentDetailDrawer from '../components/AgentDetailDrawer';
import {
  initialAgents,
  initialWorkflowNodes,
  initialLogs,
  clusterMetrics as initialMetrics
} from '../data/nexusData';
import { Agent, TelemetryLog, ClusterMetric } from '../types/nexus';
import {
  Layers,
  Bot,
  GitBranch,
  Terminal,
  Activity,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'workflows' | 'playground' | 'telemetry'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [logs, setLogs] = useState<TelemetryLog[]>(initialLogs);
  const [isStreaming, setIsStreaming] = useState(true);
  const [metrics, setMetrics] = useState<ClusterMetric[]>(initialMetrics);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [unreadAlerts, setUnreadAlerts] = useState(3);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addLog = (message: string, level: TelemetryLog['level'] = 'INFO', agentName = 'Kernel Mesh') => {
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'kernel',
      agentName,
      level,
      message
    };
    setLogs((prev) => [...prev.slice(-99), newLog]);
  };

  // Subtle real-time simulation tick for live feel
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // Slightly fluctuate metrics
      setMetrics((prev) =>
        prev.map((m, idx) => {
          if (idx === 1) {
            // Token throughput
            const jitter = (Math.random() * 0.04 - 0.02).toFixed(2);
            const base = 1.48 + parseFloat(jitter);
            return {
              ...m,
              value: `${base.toFixed(2)}M`,
              sparkline: [...m.sparkline.slice(1), base]
            };
          }
          if (idx === 2) {
            // Latency
            const jitter = Math.floor(Math.random() * 6 - 3);
            const lat = Math.max(82, 94 + jitter);
            return {
              ...m,
              value: `${lat}`,
              sparkline: [...m.sparkline.slice(1), lat]
            };
          }
          return m;
        })
      );

      // Periodically drop a simulated heartbeat log
      const tickEvents = [
        { msg: 'Qdrant vector cluster shard replication verified (3 replicas in sync)', level: 'INFO' as const, agent: 'Krypton Semantic' },
        { msg: 'Evaluated 48 distributed edge requests with zero policy violations', level: 'SUCCESS' as const, agent: 'Sentinel Aegis' },
        { msg: 'Worker thread pool optimized: garbage collector reclaimed 184MB memory', level: 'INFO' as const, agent: 'Vulcan Infrastructure' }
      ];
      const randomEvent = tickEvents[Math.floor(Math.random() * tickEvents.length)];
      addLog(randomEvent.msg, randomEvent.level, randomEvent.agent);
    }, 7000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleToggleAgentStatus = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === agentId) {
          const newStatus = a.status === 'idle' ? 'active' : 'idle';
          const msg = `Agent ${a.name} transition state: ${a.status.toUpperCase()} -> ${newStatus.toUpperCase()}`;
          addLog(msg, newStatus === 'active' ? 'SUCCESS' : 'WARN', a.name);
          showToast(msg);
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  const handleDeployAgent = (newAgent: Agent) => {
    setAgents((prev) => [newAgent, ...prev]);
    addLog(`Autonomous Agent ${newAgent.name} (${newAgent.callsign}) provisioned to cluster`, 'SUCCESS', newAgent.name);
    showToast(`Successfully deployed ${newAgent.name} to mesh!`);
  };

  // Filter agents by search query across tabs if present
  const searchedAgents = agents.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.callsign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.mainContainer}>
      <Navbar
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadAlertsCount={unreadAlerts}
      />

      <main className={styles.contentWrapper}>
        <section className={styles.heroHeader}>
          <div className={styles.heroTitleGroup}>
            <div className={styles.heroCategory}>
              <Sparkles size={14} />
              <span>Next-Gen Neural Orchestration</span>
            </div>
            <h1 className={styles.heroTitle}>
              NexUS <span className="gradient-text">Command Center</span>
            </h1>
            <p className={styles.heroDescription}>
              Autonomous multi-agent synthesis, real-time semantic pipeline telemetry, and distributed high-performance neural computing.
            </p>
          </div>

          <div className={styles.heroQuickStats}>
            <div className={styles.quickStatItem}>
              <span className={styles.quickStatLabel}>Active Cluster</span>
              <span className={styles.quickStatValue} style={{ color: '#22d3ee' }}>us-east-1a</span>
            </div>
            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
            <div className={styles.quickStatItem}>
              <span className={styles.quickStatLabel}>Compute Tier</span>
              <span className={styles.quickStatValue}>H100 SXM5</span>
            </div>
            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
            <div className={styles.quickStatItem}>
              <span className={styles.quickStatLabel}>Uptime SLA</span>
              <span className={styles.quickStatValue} style={{ color: '#34d399' }}>99.992%</span>
            </div>
          </div>
        </section>

        {/* Global Navigation Tabs */}
        <nav className={compStyles.tabsContainer} aria-label="Dashboard Views">
          <div className={compStyles.tabsList}>
            <button
              type="button"
              id="tab-overview"
              className={`${compStyles.tabItem} ${activeTab === 'overview' ? compStyles.tabItemActive : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Layers size={15} />
              <span>Overview</span>
            </button>

            <button
              type="button"
              id="tab-agents"
              className={`${compStyles.tabItem} ${activeTab === 'agents' ? compStyles.tabItemActive : ''}`}
              onClick={() => setActiveTab('agents')}
            >
              <Bot size={15} />
              <span>Agent Fleet</span>
              <span className={compStyles.tabBadge}>{searchedAgents.length}</span>
            </button>

            <button
              type="button"
              id="tab-workflows"
              className={`${compStyles.tabItem} ${activeTab === 'workflows' ? compStyles.tabItemActive : ''}`}
              onClick={() => setActiveTab('workflows')}
            >
              <GitBranch size={15} />
              <span>Workflow Studio</span>
            </button>

            <button
              type="button"
              id="tab-playground"
              className={`${compStyles.tabItem} ${activeTab === 'playground' ? compStyles.tabItemActive : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Terminal size={15} />
              <span>Neural Playground</span>
            </button>

            <button
              type="button"
              id="tab-telemetry"
              className={`${compStyles.tabItem} ${activeTab === 'telemetry' ? compStyles.tabItemActive : ''}`}
              onClick={() => setActiveTab('telemetry')}
            >
              <Activity size={15} />
              <span>Telemetry & Logs</span>
              <span className={compStyles.tabBadge}>{logs.length}</span>
            </button>
          </div>

          <div className={compStyles.tabControls}>
            <div className={compStyles.liveBadge}>
              <span className="pulse-dot pulse-dot-emerald" />
              <span>LIVE MESH TELEMETRY</span>
            </div>
          </div>
        </nav>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <MetricsCards metrics={metrics} />

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                    Active Agent Fleet Spotlight
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('agents')}
                    style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}
                  >
                    View All Fleet &rarr;
                  </button>
                </div>
                <AgentFleet
                  agents={searchedAgents.slice(0, 3)}
                  onSelectAgent={(agt) => setSelectedAgent(agt)}
                  onToggleStatus={handleToggleAgentStatus}
                />
              </div>

              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
                  Live System Telemetry
                </h2>
                <LiveTelemetryLogs
                  logs={logs.slice(-15)}
                  onClearLogs={() => setLogs([])}
                  isStreaming={isStreaming}
                  onToggleStreaming={() => setIsStreaming(!isStreaming)}
                />
              </div>
            </div>

            <WorkflowVisualizer
              initialNodes={initialWorkflowNodes}
              onTriggerLog={addLog}
            />
          </div>
        )}

        {/* Tab 2: Agent Fleet */}
        {activeTab === 'agents' && (
          <section aria-labelledby="fleet-heading">
            <h2 id="fleet-heading" className="sr-only">Autonomous Agent Fleet</h2>
            <AgentFleet
              agents={searchedAgents}
              onSelectAgent={(agt) => setSelectedAgent(agt)}
              onToggleStatus={handleToggleAgentStatus}
            />
          </section>
        )}

        {/* Tab 3: Workflow Studio */}
        {activeTab === 'workflows' && (
          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" className="sr-only">Workflow Studio</h2>
            <WorkflowVisualizer
              initialNodes={initialWorkflowNodes}
              onTriggerLog={addLog}
            />
          </section>
        )}

        {/* Tab 4: Neural Playground */}
        {activeTab === 'playground' && (
          <section aria-labelledby="playground-heading">
            <h2 id="playground-heading" className="sr-only">Neural Playground</h2>
            <NeuralPlayground
              agents={agents}
              onTriggerLog={addLog}
            />
          </section>
        )}

        {/* Tab 5: Telemetry & Logs */}
        {activeTab === 'telemetry' && (
          <section aria-labelledby="telemetry-heading">
            <h2 id="telemetry-heading" className="sr-only">Telemetry and Logs</h2>
            <LiveTelemetryLogs
              logs={logs}
              onClearLogs={() => setLogs([])}
              isStreaming={isStreaming}
              onToggleStreaming={() => setIsStreaming(!isStreaming)}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#fff' }}>NexUS Autonomous Platform</span>
            <span>•</span>
            <span>Enterprise Multi-Agent Command Core</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Next.js 16 App Router</span>
            <span>TypeScript 5</span>
            <span>Vanilla Glassmorphic CSS</span>
            <span style={{ color: '#34d399', fontWeight: 600 }}>● All Clusters Nominal</span>
          </div>
        </div>
      </footer>

      {/* Deploy Agent Modal */}
      <DeployAgentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeployAgent}
      />

      {/* Agent Details Slide-over Drawer */}
      <AgentDetailDrawer
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
        onActionNotification={(msg) => {
          addLog(msg, 'ACTION', selectedAgent?.name);
          showToast(msg);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toastNotification} role="status">
          <CheckCircle2 size={18} color="#06b6d4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
