'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './landing.module.css';
import {
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Activity,
  Layers,
  FileSpreadsheet,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Pill,
  Syringe,
  Microscope,
  Lock,
  Sparkles
} from 'lucide-react';

interface PatientScenario {
  id: 'canine' | 'feline' | 'equine';
  name: string;
  species: string;
  breed: string;
  weight: string;
  caseType: string;
  hr: number;
  spo2: number;
  map: number;
  etco2: number;
  temp: string;
  cri: string;
  fluids: string;
  notes: string;
  safetyAlert: string;
}

const PATIENTS: Record<'canine' | 'feline' | 'equine', PatientScenario> = {
  canine: {
    id: 'canine',
    name: 'Bella',
    species: 'Canine',
    breed: 'Golden Retriever (Female Spayed, 4y)',
    weight: '28.4 kg (62.6 lbs)',
    caseType: 'Post-Op Hemilaminectomy (L2–L4)',
    hr: 86,
    spo2: 99,
    map: 78,
    etco2: 38,
    temp: '38.2°C (100.8°F)',
    cri: 'Fentanyl CRI @ 3.0 mcg/kg/hr (85.2 mcg/hr)',
    fluids: 'Plasmalyte-A @ 85 mL/hr (3 mL/kg/hr maintenance)',
    notes: 'Awake and responsive. Pain score 1/4 (Glasgow Modified). Bladder expressed clear.',
    safetyAlert: 'MDR1 Mutation Profile: Negative. Verified 7-day NSAID washout prior to surgery.'
  },
  feline: {
    id: 'feline',
    name: 'Jasper',
    species: 'Feline',
    breed: 'Domestic Shorthair (Male Neutered, 6y)',
    weight: '4.8 kg (10.6 lbs)',
    caseType: 'Acute Feline Urethral Obstruction (Post-Unblocking)',
    hr: 142,
    spo2: 98,
    map: 84,
    etco2: 34,
    temp: '37.8°C (100.0°F)',
    cri: 'Buprenorphine @ 0.02 mg/kg sublingual q8h',
    fluids: 'Normosol-R @ 25 mL/hr (accounting for post-obstructive diuresis)',
    notes: 'Closed urinary catheter patent. Urine production 4.2 mL/kg/hr. ECG sinus rhythm.',
    safetyAlert: 'FELINE SAFETY GUARD: Acetaminophen & Permethrin strictly blacklisted on patient chart.'
  },
  equine: {
    id: 'equine',
    name: 'Sterling Monarch',
    species: 'Equine',
    breed: 'Thoroughbred Gelding (9y)',
    weight: '520.0 kg (1,146 lbs)',
    caseType: 'Large Colon Impaction & Medical Colic Evaluation',
    hr: 44,
    spo2: 97,
    map: 92,
    etco2: 40,
    temp: '37.5°C (99.5°F)',
    cri: 'Lidocaine CRI @ 0.05 mg/kg/min (Prokinetic protocol)',
    fluids: 'Balanced polyionic electrolytes @ 3.5 L/hr via 10G jugular catheter',
    notes: 'Gut sounds 2/4 all 4 quadrants. Nasogastric reflux 500 mL net. Reflux monitored q2h.',
    safetyAlert: 'EQUINE WITHDRAWAL: Prohibited FEI substance flags tagged for competition registry.'
  }
};

export default function LandingPage() {
  const [activePatient, setActivePatient] = useState<'canine' | 'feline' | 'equine'>('canine');
  const [activeTourTab, setActiveTourTab] = useState<'emergency' | 'surgery' | 'pharmacy'>('emergency');

  const patient = PATIENTS[activePatient];

  return (
    <div className={styles.pageWrapper}>
      {/* Clinical Top Navigation */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink}>
            <div className={styles.brandIcon}>
              <HeartPulse size={20} />
            </div>
            <div className={styles.brandTitleGroup}>
              <span className={styles.brandName}>CuraVet Clinical OS</span>
              <span className={styles.brandTagline}>Veterinary Hospital Management System</span>
            </div>
          </Link>

          <nav className={styles.navLinks} aria-label="Main Navigation">
            <a href="#clinical-chart" className={styles.navLink}>Ward Telemetry</a>
            <a href="#pillars" className={styles.navLink}>Clinical Capabilities</a>
            <a href="#scenarios" className={styles.navLink}>Emergency Scenarios</a>
            <a href="#compliance" className={styles.navLink}>Accreditations</a>
          </nav>

          <div className={styles.headerActions}>
            <Link href="/login" className={styles.loginBtn}>
              <Lock size={14} />
              <span>Staff Station Login</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Sparkles size={14} />
              <span>Hospital Operating System v4.2 • Multi-Species Intelligence</span>
            </div>

            <h1 className={styles.heroHeading}>
              Built for the biological complexity of veterinary medicine.
            </h1>

            <p className={styles.heroLead}>
              Replace disjointed flowsheets, siloed lab diagnostics, and generic human EHR templates with an operating system engineered specifically for 24/7 veterinary emergency, surgical referral, and companion animal hospitals.
            </p>

            <div className={styles.heroActions}>
              <Link href="/login" className={styles.primaryCta}>
                <Lock size={16} />
                <span>Enter Clinician Station</span>
              </Link>

              <a href="#clinical-chart" className={styles.secondaryCta}>
                <Activity size={16} />
                <span>Explore Interactive Ward Chart</span>
              </a>
            </div>
          </div>

          {/* Interactive Live Patient Flowsheet & Telemetry */}
          <div id="clinical-chart" className={styles.chartPreviewCard}>
            <div className={styles.chartCardHeader}>
              <div className={styles.patientIdentity}>
                <div className={styles.patientAvatar}>
                  {activePatient === 'canine' ? '🐕' : activePatient === 'feline' ? '🐈' : '🐎'}
                </div>
                <div>
                  <div className={styles.patientName}>{patient.name}</div>
                  <div className={styles.patientMeta}>
                    {patient.breed} • Weight: {patient.weight}
                  </div>
                </div>
              </div>

              {/* Species switcher tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '4px', borderRadius: '6px' }}>
                <button
                  type="button"
                  onClick={() => setActivePatient('canine')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: activePatient === 'canine' ? '#2e5e4e' : 'transparent',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Canine ICU
                </button>
                <button
                  type="button"
                  onClick={() => setActivePatient('feline')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: activePatient === 'feline' ? '#2e5e4e' : 'transparent',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Feline Critical Care
                </button>
                <button
                  type="button"
                  onClick={() => setActivePatient('equine')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: activePatient === 'equine' ? '#2e5e4e' : 'transparent',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Equine Ward
                </button>
              </div>
            </div>

            <div className={styles.chartCardBody}>
              {/* Column 1: Active Vital Parameters */}
              <div className={styles.chartColumn}>
                <div className={styles.columnHeading}>Continuous Vital Telemetry</div>

                <div className={styles.vitalBlock}>
                  <span className={styles.vitalLabel}>Heart Rate & Rhythm</span>
                  <div className={styles.vitalValueRow}>
                    <span className={styles.vitalValue}>{patient.hr} <small style={{ fontSize: '0.8rem' }}>bpm</small></span>
                    <span className={styles.vitalStatusNormal}>Normal sinus</span>
                  </div>
                </div>

                <div className={styles.vitalBlock}>
                  <span className={styles.vitalLabel}>Pulse Oximetry (SpO2)</span>
                  <div className={styles.vitalValueRow}>
                    <span className={styles.vitalValue}>{patient.spo2}%</span>
                    <span className={styles.vitalStatusNormal}>Optimal perfusion</span>
                  </div>
                </div>

                <div className={styles.vitalBlock}>
                  <span className={styles.vitalLabel}>Mean Arterial Pressure (MAP)</span>
                  <div className={styles.vitalValueRow}>
                    <span className={styles.vitalValue}>{patient.map} <small style={{ fontSize: '0.8rem' }}>mmHg</small></span>
                    <span className={styles.vitalStatusNormal}>Adequate renal flow</span>
                  </div>
                </div>

                <div className={styles.vitalBlock}>
                  <span className={styles.vitalLabel}>End-Tidal CO2 & Temp</span>
                  <div className={styles.vitalValueRow}>
                    <span className={styles.vitalValue}>{patient.etco2} <small style={{ fontSize: '0.8rem' }}>mmHg</small></span>
                    <span style={{ fontSize: '0.75rem', color: '#556c64', fontWeight: 600 }}>{patient.temp}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Infusions, Pharmacology & Orders */}
              <div className={styles.chartColumn}>
                <div className={styles.columnHeading}>Precision Infusions & Fluids</div>

                <div style={{
                  background: '#f8faf8',
                  border: '1px solid #e1ebe5',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#6c7f79', textTransform: 'uppercase', fontWeight: 700 }}>
                      Constant Rate Infusion (CRI)
                    </span>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#142328', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      {patient.cri}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e1ebe5', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#6c7f79', textTransform: 'uppercase', fontWeight: 700 }}>
                      IV Fluid Resuscitation Rate
                    </span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2e5e4e', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      {patient.fluids}
                    </div>
                  </div>
                </div>

                <div className={styles.dosageAlertBlock}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                    <ShieldCheck size={16} />
                    <span>Species-Specific Safety Check</span>
                  </div>
                  <div>{patient.safetyAlert}</div>
                </div>
              </div>

              {/* Column 3: Surgical Case & Clinical Handover */}
              <div className={styles.chartColumn}>
                <div className={styles.columnHeading}>Clinical Case Status</div>

                <div style={{
                  background: '#f8faf8',
                  border: '1px solid #e1ebe5',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#6c7f79', textTransform: 'uppercase', fontWeight: 700 }}>
                      Current Diagnosis & Procedure
                    </span>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#142328', marginTop: '2px' }}>
                      {patient.caseType}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#6c7f79', textTransform: 'uppercase', fontWeight: 700 }}>
                      Charge Nurse Handover Notes
                    </span>
                    <p style={{ fontSize: '0.8rem', color: '#4a6159', lineHeight: 1.4, marginTop: '4px' }}>
                      {patient.notes}
                    </p>
                  </div>
                </div>

                <Link
                  href="/login"
                  style={{
                    marginTop: 'auto',
                    backgroundColor: '#142328',
                    color: '#ffffff',
                    textAlign: 'center',
                    padding: '0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Authenticate to edit chart</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section id="pillars" className={styles.pillarsSection}>
          <div className={styles.pillarsInner}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPretitle}>Hospital Capabilities</div>
              <h2 className={styles.sectionTitle}>
                Engineered for genuine veterinary workflows
              </h2>
              <p className={styles.sectionDescription}>
                Unlike human medical software retrofitted for animals, CuraVet natively understands multi-species physiology, hazardous drug toxicities, and rapid emergency handover routines.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <Pill size={22} />
                </div>
                <h3 className={styles.pillarTitle}>Multi-Species Pharmacology & Safety</h3>
                <p className={styles.pillarText}>
                  Species-tailored dose formulas with automated weight conversion (kg / lbs) and built-in toxic drug blocks — preventing accidental administration of feline-toxic compounds or non-steroidal collisions.
                </p>
                <ul className={styles.pillarList}>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Feline Permethrin & Acetaminophen lockouts</li>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> MDR1 Collie gene sensitivity alerts</li>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Constant Rate Infusion (CRI) automated math</li>
                </ul>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <Stethoscope size={22} />
                </div>
                <h3 className={styles.pillarTitle}>Surgical Operatory & Anesthesia</h3>
                <p className={styles.pillarText}>
                  Digital anesthesia record sheets that capture multiparameter monitor streams (ECG, Pulse Ox, NIBP, Capnography, Temperature) with 5-minute auto-logging and DEA Schedule II drug ledger reconciliation.
                </p>
                <ul className={styles.pillarList}>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Automated gas concentration records</li>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Dual-witness controlled drug waste signatures</li>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> One-click surgical consent & owner authorization</li>
                </ul>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <Microscope size={22} />
                </div>
                <h3 className={styles.pillarTitle}>Integrated In-House Lab & DICOM PACS</h3>
                <p className={styles.pillarText}>
                  Direct bidirectional sync with reference laboratories (IDEXX, Antech, Heska) and digital radiography systems, automatically linking bloodwork and ultrasound studies to the patient record in under 3 seconds.
                </p>
                <ul className={styles.pillarList}>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Zero manual transcription of CBC/Chemistry</li>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Native cloud DICOM image viewer</li>
                  <li className={styles.pillarListItem}><CheckCircle2 size={14} /> Real-time trend graphs for renal & liver biomarkers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Scenario Walkthrough */}
        <section id="scenarios" className={styles.tourSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionPretitle}>Clinical Walkthroughs</div>
            <h2 className={styles.sectionTitle}>
              Real-world hospital emergency protocols
            </h2>
            <p className={styles.sectionDescription}>
              See how CuraVet streamlines high-stress patient intake, surgical anesthesia monitoring, and controlled pharmacy management.
            </p>
          </div>

          <div className={styles.tabControls}>
            <button
              type="button"
              className={`${styles.tourTabBtn} ${activeTourTab === 'emergency' ? styles.tourTabBtnActive : ''}`}
              onClick={() => setActiveTourTab('emergency')}
            >
              1. Canine Acute Toxicity Triage
            </button>
            <button
              type="button"
              className={`${styles.tourTabBtn} ${activeTourTab === 'surgery' ? styles.tourTabBtnActive : ''}`}
              onClick={() => setActiveTourTab('surgery')}
            >
              2. Feline Surgical Perineal Urethrostomy
            </button>
            <button
              type="button"
              className={`${styles.tourTabBtn} ${activeTourTab === 'pharmacy' ? styles.tourTabBtnActive : ''}`}
              onClick={() => setActiveTourTab('pharmacy')}
            >
              3. DEA Schedule II Pharmacy Auditing
            </button>
          </div>

          {activeTourTab === 'emergency' && (
            <div className={styles.scenarioCard}>
              <div>
                <h3 className={styles.scenarioTitle}>Emergency Rapid Triage Protocol</h3>
                <p className={styles.scenarioText}>
                  Patient presents with acute dark chocolate and xylitol gum ingestion. CuraVet calculates toxic theobromine and methylxanthine threshold mg/kg in real-time, prompts apomorphine emesis protocols, and pre-orders IV lipid emulsion if cardiac arrhythmia threshold is approached.
                </p>
                <div className={styles.scenarioPoints}>
                  <div><strong>Toxicology Engine:</strong> Calculated 42 mg/kg methylxanthine exposure (Moderate risk)</div>
                  <div><strong>Action:</strong> Apomorphine 0.03 mg/kg IV administered at 07:14 • Emesis successful</div>
                  <div><strong>Continuity:</strong> Patient placed on 24h telemetry with continuous lead II ECG monitoring</div>
                </div>
              </div>
              <div className={styles.scenarioTerminal}>
                <code>
                  {`[07:12:04] INTAKE: Canine "Max" (Labrador, 32.1 kg)
[07:12:08] TOXICOLOGY: 250g Dark Chocolate (60% Cacao)
[07:12:10] CALC: Theobromine dose = 42.8 mg/kg (Emesis indicated)
[07:12:15] ORDER: Apomorphine 0.03 mg/kg IV -> 0.96 mg
[07:12:45] DISPENSE: Controlled vault auto-logged
[07:13:30] TELEMETRY: Inpatient cage #08 assigned`}
                </code>
              </div>
            </div>
          )}

          {activeTourTab === 'surgery' && (
            <div className={styles.scenarioCard}>
              <div>
                <h3 className={styles.scenarioTitle}>Surgical Operatory Anesthesia Logging</h3>
                <p className={styles.scenarioText}>
                  During critical surgical procedures, anesthesia logs must not pull the veterinary technician away from the patient. CuraVet connects directly to veterinary vitals monitors, updating the anesthesia flowsheet automatically every 5 minutes.
                </p>
                <div className={styles.scenarioPoints}>
                  <div><strong>Anesthesia Stream:</strong> Isoflurane 1.5% in 100% O2 via non-rebreathing circuit</div>
                  <div><strong>Analgesia:</strong> Hydromorphone 0.1 mg/kg premed + Ketamine CRI continuous</div>
                  <div><strong>Recovery:</strong> Extubated at 09:42 after active swallowing reflex verified</div>
                </div>
              </div>
              <div className={styles.scenarioTerminal}>
                <code>
                  {`[08:45:00] SURGERY: Patient prepped, sterile drape placed
[08:50:00] MONITOR: HR 135 | SpO2 99% | MAP 82 | Temp 37.9°C
[08:55:00] MONITOR: Isoflurane 1.5% • Sevoflurane 0.0%
[09:00:00] CRI: Ketamine 0.5 mg/kg/hr running
[09:35:00] PROCEDURE: Perineal urethrostomy completed
[09:42:00] EXTUBATION: Clean airway, recovery cage #02`}
                </code>
              </div>
            </div>
          )}

          {activeTourTab === 'pharmacy' && (
            <div className={styles.scenarioCard}>
              <div>
                <h3 className={styles.scenarioTitle}>DEA Schedule II Pharmacy & Waste Vault</h3>
                <p className={styles.scenarioText}>
                  Controlled substance reconciliation is one of the highest compliance burdens in veterinary medicine. CuraVet maintains an airtight, digital, dual-witness signed chain of custody for all opioid infusions and controlled injectables.
                </p>
                <div className={styles.scenarioPoints}>
                  <div><strong>Controlled Substances:</strong> Fentanyl, Hydromorphone, Midazolam, Butorphanol</div>
                  <div><strong>Dual Witness:</strong> Cryptographic PIN signature required for bottle drawdown and waste</div>
                  <div><strong>Reconciliation:</strong> Zero inventory discrepancy across 1,420 surgical cycles</div>
                </div>
              </div>
              <div className={styles.scenarioTerminal}>
                <code>
                  {`[VAULT_LOG] Fentanyl 50 mcg/mL (Vial #F-9941)
[DRAWDOWN] Draw 1.7 mL (85 mcg) for patient "Bella"
[WASTE] 0.3 mL residual volume witnessed & discarded
[PRIMARY_DVM] Dr. Elena Vance (PIN Verified)
[WITNESS_RVT] David Miller, RVT (PIN Verified)
[BALANCE] 18.0 mL remaining in Safe A-02`}
                </code>
              </div>
            </div>
          )}
        </section>

        {/* Accreditations & Hospital Network */}
        <section id="compliance" style={{ padding: '3rem 2rem', background: '#e8f1ec', borderTop: '1px solid #d2e0d8', borderBottom: '1px solid #d2e0d8' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h4 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '1.25rem', fontWeight: 600, color: '#142328' }}>
                Built for Accredited Veterinary Practice Standards
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#556c64', marginTop: '4px' }}>
                Full compliance with AAHA Guidelines, DEA Schedule II Pharmacy Auditing, and DICOM 3.0 Imaging.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', fontSize: '0.8rem', fontWeight: 700, color: '#2e5e4e' }}>
              <span>✓ AAHA Medical Record Standards</span>
              <span>✓ DEA Schedule II Digital Logbook</span>
              <span>✓ DICOM PACS 3.0 Certified</span>
              <span>✓ Microchip ISO 11784/11785 Sync</span>
            </div>
          </div>
        </section>

        {/* Shift Sign-In CTA Banner */}
        <section className={styles.shiftCtaSection}>
          <div className={styles.shiftCtaInner}>
            <h2 className={styles.shiftHeading}>
              Ready for your hospital shift?
            </h2>
            <p className={styles.shiftSubtext}>
              Authenticate your clinical credentials to access your assigned ward station, surgical flowsheets, and active inpatient telemetry.
            </p>

            <Link href="/login" className={styles.shiftLoginBtn}>
              <Lock size={18} />
              <span>Launch Clinical Station (Sign In)</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Hospital Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div style={{ maxWidth: '320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <div style={{ width: '28px', height: '28px', background: '#2e5e4e', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <HeartPulse size={16} />
                </div>
                <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '1.1rem', fontWeight: 600, color: '#142328' }}>
                  CuraVet Clinical OS
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#6c7f79', lineHeight: 1.5 }}>
                Comprehensive hospital information and clinical telemetry software engineered exclusively for veterinary specialty and emergency medicine.
              </p>
            </div>

            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>Clinical Modules</span>
              <a href="#clinical-chart" className={styles.footerLink}>Inpatient ICU & Wards</a>
              <a href="#pillars" className={styles.footerLink}>Surgical Anesthesia Sheets</a>
              <a href="#pillars" className={styles.footerLink}>Multi-Species Pharmacology</a>
              <a href="#pillars" className={styles.footerLink}>PACS & Digital Imaging</a>
            </div>

            <div className={styles.footerCol}>
              <span className={styles.footerColTitle}>Hospital Resources</span>
              <Link href="/login" className={styles.footerLink}>Staff Station Authentication</Link>
              <a href="#scenarios" className={styles.footerLink}>Emergency Protocols</a>
              <a href="#compliance" className={styles.footerLink}>AAHA & DEA Compliance</a>
              <span className={styles.footerLink}>Clinical Support Helpline (Ext 409)</span>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div>
              &copy; {new Date().getFullYear()} CuraVet Hospital Systems Inc. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Confidential Medical Records</span>
              <span>Encrypted Hospital Mesh</span>
              <span>Veterinary Medical Board Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
