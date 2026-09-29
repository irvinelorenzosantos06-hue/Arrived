'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { Cpu, Search, Bell, Plus, ShieldCheck, ChevronDown, Stethoscope } from 'lucide-react';

interface NavbarProps {
  onOpenDeployModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadAlertsCount: number;
}

export default function Navbar({
  onOpenDeployModal,
  searchQuery,
  onSearchChange,
  unreadAlertsCount
}: NavbarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.leftSection}>
          <div className={styles.brandLogo}>
            <div className={styles.logoIconWrapper}>
              <Cpu size={22} />
            </div>
            <div className={styles.brandTitleGroup}>
              <div className={styles.brandTitle}>
                NEXUS
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                  v3.4-PROD
                </span>
              </div>
              <span className={styles.brandSubtitle}>Autonomous AI Command</span>
            </div>
          </div>

          <div className={styles.statusIndicator}>
            <span className="pulse-dot pulse-dot-emerald" />
            <span>MESH: ONLINE (99.99%)</span>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            id="global-search-input"
            className={styles.searchInput}
            placeholder="Search agents, models, workflows... (⌘K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </div>

        <div className={styles.rightSection}>
          <Link
            href="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(46, 94, 78, 0.25)',
              border: '1px solid rgba(139, 224, 189, 0.4)',
              color: '#8be0bd',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Stethoscope size={14} />
            <span>CuraVet Login</span>
          </Link>

          <select className={styles.regionSelect} defaultValue="us-east-1" aria-label="Select Cloud Region">
            <option value="us-east-1">US-East (N. Virginia)</option>
            <option value="eu-central-1">EU-Central (Frankfurt)</option>
            <option value="ap-northeast-1">AP-Northeast (Tokyo)</option>
          </select>

          <button
            type="button"
            id="deploy-agent-btn"
            className={styles.deployButton}
            onClick={onOpenDeployModal}
          >
            <Plus size={16} />
            <span>Deploy Agent</span>
          </button>

          <button
            type="button"
            id="notifications-btn"
            className={styles.iconButton}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadAlertsCount > 0 && (
              <span className={styles.notificationBadge}>{unreadAlertsCount}</span>
            )}
          </button>

          <div className={styles.userProfile}>
            <div className={styles.avatar}>NX</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Director Ops</span>
              <span className={styles.userRole}>Level-5 Clearance</span>
            </div>
            <ChevronDown size={14} color="#94a3b8" />
          </div>
        </div>
      </div>
    </header>
  );
}
