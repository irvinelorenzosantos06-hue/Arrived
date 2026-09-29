'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Components.module.css';
import { TelemetryLog } from '../types/nexus';
import {
  Search,
  Filter,
  Trash2,
  Download,
  Terminal,
  Activity,
  PauseCircle,
  PlayCircle
} from 'lucide-react';

interface LiveTelemetryLogsProps {
  logs: TelemetryLog[];
  onClearLogs: () => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
}

export default function LiveTelemetryLogs({
  logs,
  onClearLogs,
  isStreaming,
  onToggleStreaming
}: LiveTelemetryLogsProps) {
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = levelFilter === 'ALL' || log.level === levelFilter;
    const matchesSearch =
      searchFilter === '' ||
      log.message.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.agentName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelBadge = (level: TelemetryLog['level']) => {
    switch (level) {
      case 'ACTION':
        return <span className="badge badge-indigo">ACTION</span>;
      case 'SUCCESS':
        return <span className="badge badge-emerald">SUCCESS</span>;
      case 'WARN':
        return <span className="badge badge-amber">WARN</span>;
      case 'ERROR':
        return <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>ERROR</span>;
      default:
        return <span className="badge badge-cyan">INFO</span>;
    }
  };

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nexus-telemetry-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={styles.logsContainer}>
      <div className={styles.logsHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Activity size={18} color="#06b6d4" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
            Real-time Mesh Telemetry Stream
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ({filteredLogs.length} events logged)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '8px', top: '9px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              id="telemetry-search-input"
              placeholder="Search logs..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px 4px 28px',
                fontSize: '0.75rem',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          <select
            className={styles.formSelect}
            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            aria-label="Filter by level"
          >
            <option value="ALL">All Levels</option>
            <option value="INFO">INFO</option>
            <option value="ACTION">ACTION</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="WARN">WARN</option>
          </select>

          <button
            type="button"
            onClick={onToggleStreaming}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: isStreaming ? '#34d399' : '#f59e0b',
              background: 'rgba(255,255,255,0.03)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {isStreaming ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
            <span>{isStreaming ? 'Streaming' : 'Paused'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportLogs}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.03)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}
            title="Export as JSON"
          >
            <Download size={13} />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={onClearLogs}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: 'var(--accent-rose)',
              background: 'rgba(244,63,94,0.08)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(244,63,94,0.2)'
            }}
          >
            <Trash2 size={13} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className={styles.logsList}>
        {filteredLogs.map((log) => (
          <div key={log.id} className={styles.logRow}>
            <span className={styles.logTimestamp}>{log.timestamp}</span>
            <span className={styles.logAgent}>{log.agentName}</span>
            <div>{getLevelBadge(log.level)}</div>
            <span className={styles.logMessage}>{log.message}</span>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
