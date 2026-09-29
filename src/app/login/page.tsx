'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './login.module.css';
import {
  ShieldAlert,
  Lock,
  HeartPulse,
  Stethoscope,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  X
} from 'lucide-react';

export default function VeterinaryLoginPage() {
  const [staffId, setStaffId] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [department, setDepartment] = useState('icu');
  const [shift, setShift] = useState('day');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyCode, setEmergencyCode] = useState('');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickFill = (role: 'surgeon' | 'tech' | 'triage') => {
    if (role === 'surgeon') {
      setStaffId('dvm-vance.elena@vespera.care');
      setPinCode('8492');
      setDepartment('surgery');
      setShift('day');
    } else if (role === 'tech') {
      setStaffId('rvt-miller.david@vespera.care');
      setPinCode('3104');
      setDepartment('icu');
      setShift('day');
    } else if (role === 'triage') {
      setStaffId('dvm-thorne.alex@vespera.care');
      setPinCode('5921');
      setDepartment('triage');
      setShift('swing');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId || !pinCode) return;

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
    }, 1200);
  };

  const handleEmergencyBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyCode) return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowEmergencyModal(false);
      setAuthSuccess(true);
    }, 900);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Clinical Station Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.brandArea}>
          <div className={styles.brandLogo} aria-hidden="true">
            <HeartPulse size={18} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>CuraVet Clinical OS</span>
            <span className={styles.brandSub}>
              Vespera Animal Medical Center • Station ICU-04
            </span>
          </div>
        </div>

        <div className={styles.systemStatus}>
          <span className={styles.statusPill}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8be0bd' }} />
            Ward telemetry online
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {timeString || '07:30:00'}
          </span>
          <Link
            href="/"
            style={{ color: '#9cb5ab', textDecoration: 'none', fontSize: '0.75rem', border: '1px solid #334e45', padding: '3px 8px', borderRadius: '4px' }}
          >
            Switch to Command Center
          </Link>
        </div>
      </header>

      {/* Main Clinical Grid */}
      <main className={styles.mainGrid}>
        {/* Left Column: Active Clinic Handover & Census */}
        <section className={styles.statusPane} aria-labelledby="clinic-census-title">
          <h1 id="clinic-census-title" className={styles.clinicHeading}>
            Inpatient Care & Surgical Handover
          </h1>
          <p className={styles.clinicSubheading}>
            Review current ward telemetry, active surgical cases, and attending veterinary staff before authenticating your station.
          </p>

          {/* Emergency Triage Notice */}
          <div className={styles.triageNotice} role="alert">
            <ShieldAlert size={20} color="#c87d32" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div className={styles.triageNoticeTitle}>
                Emergency Fast-Track Triage Active
              </div>
              <div className={styles.triageNoticeText}>
                Severe trauma and toxic ingestion cases bypass standard admission queues. Direct surgical suite #2 is prepped.
              </div>
            </div>
          </div>

          {/* Active Wards Census */}
          <div className={styles.wardSectionTitle}>
            <span>Active Ward Census (26 Inpatients)</span>
            <span style={{ color: '#556c64', fontWeight: 500 }}>Live sync</span>
          </div>

          <div className={styles.wardList}>
            <div className={styles.wardItem}>
              <div className={styles.wardItemLeft}>
                <div className={styles.speciesIcon} title="Canine Ward">🐕</div>
                <div>
                  <div className={styles.wardName}>Canine Recovery Ward Alpha</div>
                  <div className={styles.wardCount}>14 patients • 2 post-splenectomy</div>
                </div>
              </div>
              <span className={`${styles.wardStatusTag} ${styles.statusRecovery}`}>
                Stable monitoring
              </span>
            </div>

            <div className={styles.wardItem}>
              <div className={styles.wardItemLeft}>
                <div className={styles.speciesIcon} title="Feline Critical Care">🐈</div>
                <div>
                  <div className={styles.wardName}>Feline ICU & Oxygen Suite</div>
                  <div className={styles.wardCount}>9 patients • 1 feline asthma incubator</div>
                </div>
              </div>
              <span className={`${styles.wardStatusTag} ${styles.statusIcu}`}>
                Critical continuous
              </span>
            </div>

            <div className={styles.wardItem}>
              <div className={styles.wardItemLeft}>
                <div className={styles.speciesIcon} title="Equine & Exotic">🐎</div>
                <div>
                  <div className={styles.wardName}>Equine & Exotics Holding</div>
                  <div className={styles.wardCount}>3 patients • 1 equine arthroscopy pre-op</div>
                </div>
              </div>
              <span className={`${styles.wardStatusTag} ${styles.statusSurgery}`}>
                Scheduled 08:30
              </span>
            </div>
          </div>

          {/* Shift Staff Handover */}
          <div className={styles.handoverStaff}>
            <div>
              <div className={styles.staffLabel}>Attending Veterinary Surgeon</div>
              <div className={styles.staffValue}>Dr. Elena Vance, DVM, DACVS</div>
            </div>
            <div>
              <div className={styles.staffLabel}>Charge Veterinary Technician</div>
              <div className={styles.staffValue}>David Miller, RVT, VTS (ECC)</div>
            </div>
          </div>
        </section>

        {/* Right Column: Authentication Terminal */}
        <section className={styles.authPane} aria-labelledby="auth-title">
          <h2 id="auth-title" className={styles.authTitle}>
            Sign In to Clinical Station
          </h2>
          <p className={styles.authSubtitle}>
            Authorized veterinary practitioners, surgeons, and veterinary nurses only.
          </p>

          {/* Clinician Quick-Fill Presets for Testing */}
          <div className={styles.quickFillGroup}>
            <span className={styles.quickFillLabel}>Quick clinician profile:</span>
            <div className={styles.quickFillButtons}>
              <button
                type="button"
                className={styles.quickFillBtn}
                onClick={() => handleQuickFill('surgeon')}
              >
                Dr. Vance (Surgeon)
              </button>
              <button
                type="button"
                className={styles.quickFillBtn}
                onClick={() => handleQuickFill('tech')}
              >
                Tech Miller (ICU Nurse)
              </button>
              <button
                type="button"
                className={styles.quickFillBtn}
                onClick={() => handleQuickFill('triage')}
              >
                Dr. Thorne (Triage Lead)
              </button>
            </div>
          </div>

          {authSuccess ? (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <CheckCircle2 size={36} color="#059669" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#065f46' }}>
                Credentials Verified
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#047857', lineHeight: 1.4 }}>
                Loading electronic veterinary health records, dosage charts, and active patient monitors for <strong>{department.toUpperCase()}</strong>...
              </p>
              <button
                type="button"
                onClick={() => setAuthSuccess(false)}
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.78rem',
                  color: '#065f46',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Sign out or change station
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="staff-id-input">
                  Staff Email or Clinician License ID
                </label>
                <input
                  id="staff-id-input"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. dvm-vance@vespera.care"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  required
                  autoComplete="username"
                />
                <span className={styles.helperText}>
                  Standard veterinary medical board identifier or clinic credentials.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="pin-code-input">
                  Security Passcode / Biometric PIN
                </label>
                <input
                  id="pin-code-input"
                  type="password"
                  className={styles.input}
                  placeholder="••••••••"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="dept-select">
                    Clinical Department
                  </label>
                  <select
                    id="dept-select"
                    className={styles.select}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="surgery">Surgical Suite & Operatory</option>
                    <option value="icu">ICU & Critical Monitoring</option>
                    <option value="triage">Triage & Urgent Intake</option>
                    <option value="radiology">Imaging & Ultrasound</option>
                    <option value="lab">Clinical Pathology & Bloodwork</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="shift-select">
                    Shift Assignment
                  </label>
                  <select
                    id="shift-select"
                    className={styles.select}
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <option value="day">Day (07:00 – 15:00)</option>
                    <option value="swing">Swing (15:00 – 23:00)</option>
                    <option value="night">Night ER (23:00 – 07:00)</option>
                  </select>
                </div>
              </div>

              <div className={styles.checkboxRow}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    style={{ accentColor: '#2e5e4e' }}
                  />
                  <span>Keep session active on this station</span>
                </label>

                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => alert('Please contact IT Clinical Systems at ext 409 or the charge nurse.')}
                >
                  Reset PIN
                </button>
              </div>

              <button
                type="submit"
                id="submit-login-btn"
                className={styles.submitBtn}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <>
                    <span>Verifying clinic credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Authenticate Station Access</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Emergency Triage Fast-Track Bypass */}
          <div className={styles.bypassSection}>
            <div style={{ fontSize: '0.75rem', color: '#6c7f79' }}>
              Stat emergency patient arrival?
            </div>
            <button
              type="button"
              id="emergency-bypass-btn"
              className={styles.bypassBtn}
              onClick={() => setShowEmergencyModal(true)}
            >
              <AlertTriangle size={15} color="#c87d32" />
              <span>Emergency Rapid Triage Override</span>
            </button>
          </div>
        </section>
      </main>

      {/* Emergency Bypass Modal */}
      {showEmergencyModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalBox}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8c4e12' }}>
                <ShieldAlert size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  Stat Emergency Admission Override
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmergencyModal(false)}
                style={{ background: 'none', border: 'none', color: '#6c7f79', cursor: 'pointer' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#556c64', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              This protocol grants immediate, temporary access to patient telemetry and dosage calculators for acute emergency admissions. All actions are logged and audited per Veterinary Medical Board compliance.
            </p>

            <form onSubmit={handleEmergencyBypass} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="emergency-code-input">
                  Hospital Emergency Station Override Code
                </label>
                <input
                  id="emergency-code-input"
                  type="password"
                  className={styles.input}
                  placeholder="Enter 6-digit emergency badge PIN"
                  value={emergencyCode}
                  onChange={(e) => setEmergencyCode(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowEmergencyModal(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    backgroundColor: '#f1f5f2',
                    border: '1px solid #d2e0d8',
                    color: '#556c64',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '6px',
                    backgroundColor: '#c87d32',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Confirm Emergency Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hospital Footer */}
      <footer className={styles.footer}>
        <div>
          <strong>CuraVet Clinical OS</strong> v4.2.8 • Vespera Animal Medical Center
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>HIPAA & Veterinary Board Compliant</span>
          <span>Pharmacy Schedule II Lock Active</span>
          <span>Help Desk Ext: 409</span>
        </div>
      </footer>
    </div>
  );
}
