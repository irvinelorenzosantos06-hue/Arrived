import { Agent, WorkflowNode, TelemetryLog, ClusterMetric } from '../types/nexus';

export const initialAgents: Agent[] = [
  {
    id: 'agt-atlas-v4',
    name: 'Atlas Prime',
    callsign: 'ATLAS-01',
    role: 'Autonomous Reasoning & Multi-Step Code Architect',
    model: 'Gemini 2.5 Ultra / Claude 3.7 Hybrid',
    status: 'busy',
    autonomyLevel: 'Autonomous',
    currentTask: 'Refactoring distributed vector cache shards for sub-10ms lookup',
    loadPercentage: 86,
    memoryUsageMb: 4120,
    tokensProcessed: 14890200,
    uptime: '14d 6h',
    tools: ['CodeSandbox', 'TerminalEnv', 'GitSync', 'LinterEngine', 'DockerDaemon'],
    latencyMs: 142
  },
  {
    id: 'agt-krypton-rag',
    name: 'Krypton Semantic',
    callsign: 'KRYPTON-09',
    role: 'Real-time Vector Embedding & RAG Pipeline Orchestrator',
    model: 'Text-Embedding-3-Large / Mistral Large',
    status: 'active',
    currentTask: 'Ingesting 140k corporate compliance documents across 8 enterprise buckets',
    autonomyLevel: 'Autonomous',
    loadPercentage: 54,
    memoryUsageMb: 2890,
    tokensProcessed: 28340100,
    uptime: '28d 12h',
    tools: ['PineconeVector', 'QdrantCluster', 'DocumentParser', 'TokenizerPro'],
    latencyMs: 64
  },
  {
    id: 'agt-sentinel-sec',
    name: 'Sentinel Aegis',
    callsign: 'SENTINEL-X',
    role: 'Security Guardrail & Threat Anomaly Detection',
    model: 'DeepSeek R1 / Llama 3.3 Guard',
    status: 'active',
    currentTask: 'Live packet deep inspection across API ingress gateway',
    autonomyLevel: 'Supervised',
    loadPercentage: 38,
    memoryUsageMb: 1950,
    tokensProcessed: 9400200,
    uptime: '42d 18h',
    tools: ['FirewallAPI', 'PayloadAuditor', 'TokenSanitizer', 'AlertNotifier'],
    latencyMs: 38
  },
  {
    id: 'agt-aura-voice',
    name: 'Aura Omni-Stream',
    callsign: 'AURA-04',
    role: 'Low-latency Multimodal Voice & Audio Intelligence',
    model: 'Gemini 2.5 Flash Native Audio',
    status: 'idle',
    currentTask: 'Standing by for WebRTC audio session dispatch',
    autonomyLevel: 'Deterministic',
    loadPercentage: 12,
    memoryUsageMb: 1420,
    tokensProcessed: 4210900,
    uptime: '7d 2h',
    tools: ['AudioDSP', 'WebRTCSocket', 'VoiceSynthesis', 'SpeechSTT'],
    latencyMs: 88
  },
  {
    id: 'agt-vulcan-devops',
    name: 'Vulcan Infrastructure',
    callsign: 'VULCAN-02',
    role: 'Kubernetes Pod Auto-Scaler & Cluster Self-Healing',
    model: 'Claude 3.7 Sonnet Fast',
    status: 'active',
    currentTask: 'Balancing GPU memory allocations across worker nodes in us-east-1a',
    autonomyLevel: 'Autonomous',
    loadPercentage: 62,
    memoryUsageMb: 3200,
    tokensProcessed: 6890300,
    uptime: '19d 4h',
    tools: ['KubernetesKubelet', 'TerraformState', 'PrometheusQuery', 'AWSCloudWatch'],
    latencyMs: 95
  }
];

export const initialWorkflowNodes: WorkflowNode[] = [
  {
    id: 'node-trigger',
    title: 'Event Trigger: Ingress Request',
    type: 'trigger',
    status: 'completed',
    duration: '4ms',
    details: 'Webhook payload validated via HMAC SHA-256'
  },
  {
    id: 'node-vector',
    title: 'Semantic Context Enrichment',
    type: 'vector',
    status: 'completed',
    duration: '28ms',
    details: 'Top-8 cosine similarity embeddings matched in Qdrant cluster'
  },
  {
    id: 'node-swarm',
    title: 'Multi-Agent Swarm Synthesis',
    type: 'swarm',
    status: 'running',
    duration: '112ms',
    details: 'Atlas Prime & Sentinel Aegis executing cross-model verification'
  },
  {
    id: 'node-consensus',
    title: 'Consensus & Guardrail Audit',
    type: 'consensus',
    status: 'idle',
    details: 'Zero jailbreak risk, confidence score threshold >= 0.98'
  },
  {
    id: 'node-action',
    title: 'Execution Dispatch & Webhook',
    type: 'action',
    status: 'idle',
    details: 'Deliver formatted schema to downstream CRM & Slack Alert'
  }
];

export const initialLogs: TelemetryLog[] = [
  {
    id: 'log-1',
    timestamp: '14:48:02.140',
    agentId: 'agt-atlas-v4',
    agentName: 'Atlas Prime',
    level: 'ACTION',
    message: 'Compiling AST subtree for microservice distributed cache module'
  },
  {
    id: 'log-2',
    timestamp: '14:48:01.890',
    agentId: 'agt-krypton-rag',
    agentName: 'Krypton Semantic',
    level: 'INFO',
    message: 'Partitioned shard #22 completed (2,450 vectors indexed in 42ms)'
  },
  {
    id: 'log-3',
    timestamp: '14:48:00.612',
    agentId: 'agt-sentinel-sec',
    agentName: 'Sentinel Aegis',
    level: 'SUCCESS',
    message: 'Ingress packet stream audited. 0 malicious signatures found'
  },
  {
    id: 'log-4',
    timestamp: '14:47:58.330',
    agentId: 'agt-vulcan-devops',
    agentName: 'Vulcan Infrastructure',
    level: 'INFO',
    message: 'Node cluster us-east-1a H100 memory balance adjusted to 76%'
  },
  {
    id: 'log-5',
    timestamp: '14:47:55.102',
    agentId: 'agt-atlas-v4',
    agentName: 'Atlas Prime',
    level: 'SUCCESS',
    message: 'Unit test suite passed with 100% coverage (48/48 tests green)'
  }
];

export const clusterMetrics: ClusterMetric[] = [
  {
    title: 'Active Agent Fleet',
    value: '24 / 28',
    change: '+4 vs yesterday',
    isPositive: true,
    unit: 'nodes',
    subtext: '86% fleet capacity utilized',
    sparkline: [18, 20, 21, 19, 22, 24, 24]
  },
  {
    title: 'Real-time Token Throughput',
    value: '1.48M',
    change: '+14.2%',
    isPositive: true,
    unit: 'tok/min',
    subtext: 'Peak bandwidth: 2.1M tok/min',
    sparkline: [1.1, 1.25, 1.18, 1.35, 1.42, 1.45, 1.48]
  },
  {
    title: 'Fleet Average Latency',
    value: '94',
    change: '-18ms',
    isPositive: true,
    unit: 'ms',
    subtext: 'Target SLA < 150ms (Optimal)',
    sparkline: [120, 115, 110, 105, 99, 97, 94]
  },
  {
    title: 'Workflow Success Rate',
    value: '99.94%',
    change: '+0.04%',
    isPositive: true,
    unit: 'sla',
    subtext: '14,290 executions today, 0 drops',
    sparkline: [99.8, 99.85, 99.88, 99.9, 99.92, 99.93, 99.94]
  }
];
