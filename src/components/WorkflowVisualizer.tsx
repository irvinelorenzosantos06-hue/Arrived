'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';
import { WorkflowNode } from '../types/nexus';
import {
  Play,
  CheckCircle,
  Clock,
  ArrowRight,
  Database,
  Brain,
  ShieldCheck,
  Send,
  Zap,
  RotateCcw
} from 'lucide-react';

interface WorkflowVisualizerProps {
  initialNodes: WorkflowNode[];
  onTriggerLog: (message: string, level: 'INFO' | 'ACTION' | 'SUCCESS') => void;
}

export default function WorkflowVisualizer({
  initialNodes,
  onTriggerLog
}: WorkflowVisualizerProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const getNodeIcon = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger':
        return <Zap size={18} color="#06b6d4" />;
      case 'vector':
        return <Database size={18} color="#8b5cf6" />;
      case 'swarm':
        return <Brain size={18} color="#6366f1" />;
      case 'consensus':
        return <ShieldCheck size={18} color="#10b981" />;
      case 'action':
        return <Send size={18} color="#f59e0b" />;
    }
  };

  const runPipelineSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset all nodes to idle
    setNodes((prev) =>
      prev.map((n) => ({ ...n, status: 'idle', duration: undefined }))
    );
    onTriggerLog('Starting pipeline orchestration simulation: #WF-9941', 'INFO');

    for (let i = 0; i < nodes.length; i++) {
      setActiveStepIndex(i);
      setNodes((prev) =>
        prev.map((n, idx) =>
          idx === i ? { ...n, status: 'running' } : n
        )
      );
      onTriggerLog(`Executing stage: ${nodes[i].title}`, 'ACTION');

      const stepDelay = 600 + Math.floor(Math.random() * 400);
      await new Promise((r) => setTimeout(r, stepDelay));

      const simulatedDuration = `${(stepDelay / 10).toFixed(0)}ms`;
      setNodes((prev) =>
        prev.map((n, idx) =>
          idx === i
            ? { ...n, status: 'completed', duration: simulatedDuration }
            : n
        )
      );
    }

    setActiveStepIndex(null);
    setIsRunning(false);
    onTriggerLog('Pipeline #WF-9941 completed successfully across 5 nodes', 'SUCCESS');
  };

  return (
    <div className={styles.workflowContainer}>
      <div className={styles.workflowHeader}>
        <div className={styles.workflowTitleArea}>
          <h2>
            <Zap size={22} color="#06b6d4" />
            Autonomous Pipeline Orchestrator
          </h2>
          <p>Multi-agent sequential consensus pipeline with sub-millisecond semantic dispatch</p>
        </div>

        <button
          type="button"
          id="run-workflow-btn"
          className={styles.workflowRunBtn}
          onClick={runPipelineSimulation}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <RotateCcw size={16} className="animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              <span>Trigger Pipeline</span>
            </>
          )}
        </button>
      </div>

      <div className={styles.workflowPipelineFlow}>
        {nodes.map((node, index) => {
          const isActive = node.status === 'running';
          const isCompleted = node.status === 'completed';

          return (
            <React.Fragment key={node.id}>
              <div
                className={`${styles.workflowNodeCard} ${
                  isActive ? styles.workflowNodeActive : ''
                } ${isCompleted ? styles.workflowNodeCompleted : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className={styles.workflowNodeStep}>Stage 0{index + 1}</span>
                  <div>{getNodeIcon(node.type)}</div>
                </div>

                <h4 className={styles.workflowNodeTitle}>{node.title}</h4>
                <p className={styles.workflowNodeDesc}>{node.details}</p>

                <div className={styles.nodeStatusPill}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isCompleted && <CheckCircle size={13} color="#10b981" />}
                    {isActive && <Clock size={13} color="#06b6d4" className="animate-pulse" />}
                    {node.status.toUpperCase()}
                  </span>
                  {node.duration && (
                    <span style={{ color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>
                      {node.duration}
                    </span>
                  )}
                </div>
              </div>

              {index < nodes.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', color: isActive || isCompleted ? '#06b6d4' : 'rgba(255,255,255,0.15)' }}>
                  <ArrowRight size={20} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-indigo">PIPELINE ID: WF-9941</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Trigger: <code style={{ color: '#38bdf8' }}>POST /v3/events/autonomous-mesh</code>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Timeout SLA: <strong>1,200ms</strong></span>
          <span>Max Fallback Retries: <strong>3</strong></span>
          <span>State: <strong style={{ color: '#34d399' }}>IDLE READY</strong></span>
        </div>
      </div>
    </div>
  );
}
