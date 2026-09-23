import React from 'react';
import { 
  Shield, ArrowRight, CheckCircle2, Lock, Cpu, Database, 
  BarChart3, FileSearch, Scale, Building2, Zap, Award, UserCheck, ChevronRight, TrendingUp, ShieldCheck
} from 'lucide-react';

export default function LandingView({ onEnterPortal }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ── CSS Micro-Animations ── */}
      <style>{`
        @keyframes floatCard1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatCard2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatCard3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.08); }
        }
        .hero-float-1 { animation: floatCard1 6s ease-in-out infinite; }
        .hero-float-2 { animation: floatCard2 8s ease-in-out infinite; }
        .hero-float-3 { animation: floatCard3 7s ease-in-out infinite; }
        .ambient-glow-orb { animation: pulseOrb 10s ease-in-out infinite; }
      `}</style>
      
      {/* ── Top Navigation Bar ────────────────────────────────────────────── */}
      <header className="app-header">
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
            }}>
              <Zap size={20} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', tracking: '-0.03em' }}>
              AI Compliance <span style={{ color: '#A855F7' }}>Copilot</span>
            </span>
          </div>

          {/* Header Action Pill Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onEnterPortal} className="pill-btn-glass">
              Login
            </button>
            <button onClick={onEnterPortal} className="pill-btn-purple">
              Enter Platform <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section (Mixed Typography + Floating Translucent Cards) ──── */}
      <section style={{
        padding: '60px 24px 80px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Hero Title & Get Started Pill Button */}
          <div>
            <h1 style={{
              fontSize: '4.2rem',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 24px 0'
            }}>
              <span className="font-serif-italic" style={{ fontWeight: 400, color: '#E2E8F0' }}>Making</span> Compliance <br />
              <span style={{ fontWeight: 800 }}>Accessible</span> <span className="font-serif-italic" style={{ fontWeight: 400, color: '#A855F7' }}>for</span> <br />
              Everyone
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              maxWidth: '460px',
              margin: '0 0 36px 0'
            }}>
              Secure Autonomous SEBI & RBI Regulatory Audit for Financial Institutions. Automated Policy Drift Analysis & Compliance Remediation Engine.
            </p>

            <button onClick={onEnterPortal} className="pill-btn-white">
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Floating Dark Glass Translucent Dashboard Cards */}
          <div style={{ position: 'relative', minHeight: '480px' }}>
            
            {/* Ambient Background Glow Orb */}
            <div className="ambient-glow-orb" style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 80%)',
              filter: 'blur(50px)',
              borderRadius: '50%',
              zIndex: 0
            }} />

            {/* Card 1: SEBI Governance Score Card */}
            <div className="glass-card hero-float-1" style={{
              position: 'absolute',
              top: '0px',
              right: '20px',
              width: '240px',
              zIndex: 3,
              padding: '18px',
              background: 'rgba(22, 25, 38, 0.85)',
              borderColor: 'rgba(255, 255, 255, 0.12)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>SEBI & RBI</span>
                <span style={{ fontSize: '12px', background: 'rgba(168,85,247,0.2)', color: '#C084FC', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>Live Ingest</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Ingested Directives</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#FFFFFF', marginTop: '4px' }}>
                40 Circulars
              </div>
            </div>

            {/* Card 2: Compliance Health Card */}
            <div className="glass-card hero-float-2" style={{
              position: 'absolute',
              top: '70px',
              left: '0px',
              width: '310px',
              zIndex: 2,
              padding: '22px',
              background: 'rgba(18, 20, 30, 0.9)',
              borderColor: 'rgba(168, 85, 247, 0.3)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(168,85,247,0.2)'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Compliance Health Index</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 14px 0' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>97.4%</span>
                <span style={{ fontSize: '12px', color: '#34D399', fontWeight: 700, background: 'rgba(52,211,153,0.15)', padding: '2px 6px', borderRadius: '4px' }}>Optimal</span>
              </div>
              
              {/* Neon Purple Sparkline SVG */}
              <div style={{ height: '60px', width: '100%', marginTop: '10px' }}>
                <svg width="100%" height="100%" viewBox="0 0 260 60" fill="none">
                  <path d="M0 45 Q 40 10, 80 35 T 160 20 T 260 5" stroke="#A855F7" strokeWidth="3" fill="none" />
                  <path d="M0 45 Q 40 10, 80 35 T 160 20 T 260 5 L 260 60 L 0 60 Z" fill="url(#purpleGlow)" opacity="0.3" />
                  <defs>
                    <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>Real-Time Policy Drift Audit</div>
            </div>

            {/* Card 3: Bank Policies Card */}
            <div className="glass-card hero-float-3" style={{
              position: 'absolute',
              top: '160px',
              right: '0px',
              width: '230px',
              zIndex: 4,
              padding: '18px',
              background: 'rgba(15, 17, 26, 0.88)'
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>Master SOP</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Internal Policy Standards</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#38BDF8', marginTop: '2px' }}>
                5 Master SOPs
              </div>
            </div>

            {/* Card 4: RAGAS Accuracy Score Card */}
            <div className="glass-card hero-float-1" style={{
              position: 'absolute',
              bottom: '0px',
              right: '40px',
              width: '270px',
              zIndex: 5,
              padding: '20px',
              background: 'rgba(12, 14, 22, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.12)'
            }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>RAGAS RETRIEVAL ACCURACY</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 12px 0', fontFamily: 'var(--font-mono)' }}>
                0.97 / 1.00
              </div>

              {/* Bar Chart with Active Glowing Bar */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '50px' }}>
                {[70, 85, 90, 88, 95, 97, 98].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                      width: '100%',
                      height: `${h}%`,
                      background: i === 5 ? '#34D399' : 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      boxShadow: i === 5 ? '0 0 12px #34D399' : 'none'
                    }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span style={{ color: '#34D399', fontWeight: 700 }}>Sat</span><span>Sun</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Bottom Proof Banner (Sleek High-Contrast White Cutout Banner) ─ */}
      <section style={{ padding: '0 24px 60px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px 24px 24px 24px',
          padding: '32px 40px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '32px',
          alignItems: 'center',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
        }}>
          
          {/* Architecture Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.12)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
              <ShieldCheck size={32} color="#6366F1" />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                ARCHITECTURE
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', tracking: '-0.02em' }}>
                Multi-Agent AI
              </div>
            </div>
          </div>

          {/* Banner Text Statement */}
          <p style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#1E293B',
            lineHeight: 1.4,
            margin: 0
          }}>
            Enterprise compliance automation powered by autonomous multi-agent AI workflows. Audit internal SOP policies against live SEBI & RBI circulars in real time. <span style={{ color: '#6366F1' }}>Ready to inspect?</span>
          </p>

          {/* User Badge & CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, fontSize: '13px' }}>
                AI
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', maxWidth: '180px', textAlign: 'right' }}>
                Enterprise AI Compliance Platform
              </span>
            </div>
            <button onClick={onEnterPortal} style={{
              background: 'transparent',
              border: 'none',
              color: '#6366F1',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Enter Portal →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
