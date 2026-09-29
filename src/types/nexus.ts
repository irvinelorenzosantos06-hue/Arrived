export interface Agent {
  id: string;
  name: string;
  callsign: string;
  role: string;
  model: string;
  status: 'active' | 'idle' | 'busy' | 'standby';
  autonomyLevel: 'Autonomous' | 'Supervised' | 'Deterministic';
  currentTask: string;
  loadPercentage: number;
  memoryUsageMb: number;
  tokensProcessed: number;
  uptime: string;
  tools: string[];
  latencyMs: number;
}

export interface WorkflowNode {
  id: string;
  title: string;
  type: 'trigger' | 'vector' | 'swarm' | 'consensus' | 'action';
  status: 'idle' | 'running' | 'completed' | 'failed';
  duration?: string;
  details: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  level: 'INFO' | 'ACTION' | 'WARN' | 'SUCCESS' | 'ERROR';
  message: string;
  metadata?: Record<string, string | number>;
}

export interface ClusterMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  unit: string;
  subtext: string;
  sparkline: number[];
}
