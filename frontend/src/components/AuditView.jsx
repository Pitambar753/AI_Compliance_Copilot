import React, { useState } from 'react';
import { Download, Search, History } from 'lucide-react';

export default function AuditView({ auditLogs = [], loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [agentFilter, setAgentFilter] = useState('ALL');

  const agents = ['ALL', ...new Set(auditLogs.map(l => l.agent_name).filter(Boolean))];

  const filteredLogs = auditLogs.filter(log => {
    const term = searchTerm.toLowerCase();
    const matchesAgent = agentFilter === 'ALL' || log.agent_name === agentFilter;
    const matchesSearch = (
      log.agent_name?.toLowerCase().includes(term) ||
      log.step?.toLowerCase().includes(term) ||
      log.action?.toLowerCase().includes(term) ||
      log.details?.toLowerCase().includes(term) ||
      String(log.circular_id).includes(term)
    );
    return matchesAgent && matchesSearch;
  });

  const exportCSV = () => {
    if (!auditLogs.length) return;
    const headers = ['ID', 'Timestamp', 'Circular ID', 'Agent Name', 'Step', 'Action', 'Details'];
    const rows = auditLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.circular_id}"`,
      `"${l.agent_name}"`,
      `"${l.step}"`,
      `"${l.action}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bank_of_india_compliance_audit_log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* ── Control Header ── */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
              <History size={20} color="#FFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                RBI & SEBI Inspectable Audit Trail Log
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search Box */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                type="text"
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{ paddingLeft: '32px', width: '100%', background: 'rgba(255, 255, 255, 0.05)', color: '#F8FAFC', border: '1px solid rgba(255, 255, 255, 0.15)' }}
              />
            </div>

            {/* Export CSV */}
            <button className="action-btn-secondary" onClick={exportCSV}>
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* ── Audit Logs Table ── */}
      {loading ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>Loading audit trail...</div>
      ) : filteredLogs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px', color: '#94A3B8', fontSize: '14px' }}>
          No audit logs matching search query.
        </div>
      ) : (
        <div className="glass-card" style={{ overflowX: 'auto', padding: '0', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(15, 23, 42, 0.95)', color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '12px', textTransform: 'uppercase', tracking: '0.05em' }}>
                <th style={{ padding: '14px 16px' }}>Log ID</th>
                <th style={{ padding: '14px 16px' }}>Timestamp</th>
                <th style={{ padding: '14px 16px' }}>Circular ID</th>
                <th style={{ padding: '14px 16px' }}>Agent Node</th>
                <th style={{ padding: '14px 16px' }}>Action</th>
                <th style={{ padding: '14px 16px' }}>Regulatory Audit Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.slice(0, 100).map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '14px 16px', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>#{log.id}</td>
                  <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>{log.timestamp ? log.timestamp.split('T')[0] : ''}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: '#C084FC', fontWeight: 700 }}>#{log.circular_id}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      color: '#E9D5FF',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(168, 85, 247, 0.35)',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {log.agent_name}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: '#93C5FD',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(59, 130, 246, 0.35)',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#F8FAFC', maxWidth: '480px', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.5, fontSize: '13px' }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

