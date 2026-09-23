import React, { useState } from 'react';
import { BarChart3, PieChart, Info, Activity } from 'lucide-react';

function SegmentedDriftGauge({ score, showLabels = true }) {
  const percentage = Math.max(0, Math.min(100, (score || 0) * 100));

  return (
    <div style={{ margin: '8px 0' }}>
      {/* Horizontal Segmented Gauge */}
      <div style={{
        position: 'relative',
        height: '14px',
        borderRadius: '3px',
        overflow: 'hidden',
        display: 'flex',
        border: '1px solid #E2DFD6',
        background: '#FFFFFF'
      }}>
        {/* Zone 1: Archive (<0.40) */}
        <div style={{ width: '40%', background: '#EBE8DF', height: '100%', borderRight: '1px solid #E2DFD6' }} title="Archive Zone (<0.40)" />
        {/* Zone 2: Low P3 (0.40 - 0.59) */}
        <div style={{ width: '20%', background: '#D2E6DC', height: '100%', borderRight: '1px solid #E2DFD6' }} title="P3 Low Risk (0.40 - 0.59)" />
        {/* Zone 3: Medium P2 (0.60 - 0.79) */}
        <div style={{ width: '20%', background: '#F7E5CD', height: '100%', borderRight: '1px solid #E2DFD6' }} title="P2 Medium Risk (0.60 - 0.79)" />
        {/* Zone 4: High P1 (>=0.80) */}
        <div style={{ width: '20%', background: '#F7D6D3', height: '100%' }} title="P1 High Risk (>=0.80)" />

        {/* Pointer Pin Marker */}
        <div style={{
          position: 'absolute',
          left: `calc(${percentage}% - 2px)`,
          top: 0,
          bottom: 0,
          width: '4px',
          background: '#0B3D66',
          boxShadow: '0 0 2px rgba(0,0,0,0.4)',
          zIndex: 5
        }} />
      </div>

      {showLabels && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#5B6470', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
          <span>0.00 (Archive)</span>
          <span>0.40 (P3)</span>
          <span>0.60 (P2)</span>
          <span>0.80 (P1)</span>
          <span>1.00</span>
        </div>
      )}
    </div>
  );
}

export default function DriftView({ analytics }) {
  const [regulatorFilter, setRegulatorFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  if (!analytics) return (
    <div className="glass-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
      <Activity size={28} className="animate-spin" style={{ marginBottom: '12px', color: 'var(--color-primary)' }} />
      <div>Loading policy drift analytics...</div>
    </div>
  );

  const { total_evaluated, avg_drift, priority_counts = {}, domain_scores = [] } = analytics;

  const filteredScores = domain_scores.filter(item => {
    const matchesReg = regulatorFilter === 'ALL' || item.regulator === regulatorFilter;
    const matchesPrio = priorityFilter === 'ALL' || item.priority.includes(priorityFilter);
    return matchesReg && matchesPrio;
  });

  return (
    <div>
      {/* ── Key Metrics Cards ── */}
      <div className="metrics-grid">
        <div className="glass-card" style={{ borderLeft: '4px solid #A855F7', background: 'rgba(15, 23, 42, 0.75)' }}>
          <div style={{ color: '#94A3B8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Total Circulars Evaluated</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {total_evaluated || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>SEBI & RBI Regulatory Directives</div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #6366F1', background: 'rgba(15, 23, 42, 0.75)' }}>
          <div style={{ color: '#94A3B8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Average Policy Drift Score</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#C084FC', fontFamily: 'var(--font-mono)' }}>
            {avg_drift ? avg_drift.toFixed(4) : '0.0000'}
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Scale: 0.0 (Matched) to 1.0 (Critical Drift)</div>
        </div>

        <div className="glass-card card-p1" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <div style={{ color: '#FCA5A5', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>High Priority (P1) Drift</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
            {priority_counts['HIGH (P1)'] || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#FCA5A5', marginTop: '4px' }}>Immediate Remediation SLA</div>
        </div>

        <div className="glass-card card-p2" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
          <div style={{ color: '#FDE68A', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Medium Priority (P2) Drift</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
            {priority_counts['MEDIUM (P2)'] || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#FDE68A', marginTop: '4px' }}>45-Day Compliance Audit SLA</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* ── Drift Score Breakdown ── */}
        <div className="glass-card" style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <BarChart3 size={18} color="#C084FC" /> Policy Drift Segmented Evaluation ({filteredScores.length})
            </h3>

            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={regulatorFilter} 
                onChange={(e) => setRegulatorFilter(e.target.value)}
                style={{ background: '#0E1017', color: '#F8FAFC', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '6px 10px', fontSize: '12px' }}
              >
                <option value="ALL" style={{ background: '#0E1017', color: '#F8FAFC' }}>All Regulators</option>
                <option value="SEBI" style={{ background: '#0E1017', color: '#F8FAFC' }}>SEBI</option>
                <option value="RBI" style={{ background: '#0E1017', color: '#F8FAFC' }}>RBI</option>
              </select>

              <select 
                value={priorityFilter} 
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{ background: '#0E1017', color: '#F8FAFC', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '6px 10px', fontSize: '12px' }}
              >
                <option value="ALL" style={{ background: '#0E1017', color: '#F8FAFC' }}>All Priorities</option>
                <option value="HIGH" style={{ background: '#0E1017', color: '#F8FAFC' }}>HIGH (P1)</option>
                <option value="MEDIUM" style={{ background: '#0E1017', color: '#F8FAFC' }}>MEDIUM (P2)</option>
                <option value="LOW" style={{ background: '#0E1017', color: '#F8FAFC' }}>LOW (P3)</option>
              </select>
            </div>
          </div>
          
          {filteredScores.length === 0 ? (
            <div style={{ color: '#94A3B8', textAlign: 'center', padding: '30px', fontSize: '14px' }}>
              No drift scores match current filter criteria.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '460px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredScores.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '14px', marginBottom: '6px' }}>
                    <span>
                      <strong style={{ color: item.regulator === 'SEBI' ? '#38BDF8' : '#34D399', marginRight: '6px' }}>[{item.regulator}]</strong> 
                      <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{item.title}</span>
                    </span>
                    <span style={{ fontWeight: 800, color: '#C084FC', marginLeft: '10px', fontFamily: 'var(--font-mono)' }}>
                      {item.drift_score.toFixed(4)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px', color: '#94A3B8' }}>
                    <span>Domain: <strong style={{ color: '#F8FAFC' }}>{item.domain}</strong></span>
                    <span className={`badge ${item.priority.includes('HIGH') ? 'badge-p1' : item.priority.includes('MEDIUM') ? 'badge-p2' : item.priority.includes('LOW') ? 'badge-p3' : 'badge-archive'}`}>
                      {item.priority}
                    </span>
                  </div>

                  {/* Horizontal Segmented Drift Gauge */}
                  <SegmentedDriftGauge score={item.drift_score} showLabels={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Routing Distribution & Formula ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}>
              <PieChart size={18} color="#818CF8" /> Evaluation Routing Distribution
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-p1">HIGH (P1) — Drift &gt; 0.80</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#EF4444', fontFamily: 'var(--font-mono)' }}>{priority_counts['HIGH (P1)'] || 0}</span>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-p2">MEDIUM (P2) — Drift 0.60 - 0.79</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>{priority_counts['MEDIUM (P2)'] || 0}</span>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-p3">LOW (P3) — Drift 0.40 - 0.59</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#10B981', fontFamily: 'var(--font-mono)' }}>{priority_counts['LOW (P3)'] || 0}</span>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-archive">Archived — Drift &lt; 0.40</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>{priority_counts['Archive'] || 0}</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 12px 0' }}>
              <Info size={18} color="#C084FC" /> Regulatory Drift Score Mathematical Model
            </h3>
            <div style={{ fontSize: '13px', color: '#F8FAFC', lineHeight: 1.6, background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'var(--font-mono)' }}>
              <strong>Drift Score D</strong> = 1.0 - (0.40 × Cosine Similarity + 0.60 × BGE Cross-Encoder Score)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
