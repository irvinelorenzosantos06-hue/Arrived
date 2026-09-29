'use client';

import React from 'react';
import styles from './Components.module.css';
import { ClusterMetric } from '../types/nexus';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface MetricsCardsProps {
  metrics: ClusterMetric[];
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <section className={styles.metricsGrid} aria-label="System Metrics">
      {metrics.map((metric, idx) => {
        // Calculate sparkline points for SVG
        const minVal = Math.min(...metric.sparkline);
        const maxVal = Math.max(...metric.sparkline);
        const range = maxVal - minVal || 1;
        const width = 240;
        const height = 28;
        const step = width / (metric.sparkline.length - 1);

        const points = metric.sparkline
          .map((val, i) => {
            const x = i * step;
            const y = height - ((val - minVal) / range) * (height - 6) - 3;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <div key={idx} className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricTitle}>{metric.title}</span>
              <span
                className={`${styles.metricChange} ${
                  metric.isPositive ? styles.metricChangePositive : ''
                }`}
              >
                <ArrowUpRight size={13} />
                {metric.change}
              </span>
            </div>

            <div className={styles.metricValueRow}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricUnit}>{metric.unit}</span>
            </div>

            <p className={styles.metricSubtext}>{metric.subtext}</p>

            <svg
              className={styles.sparklineSvg}
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        );
      })}
    </section>
  );
}
