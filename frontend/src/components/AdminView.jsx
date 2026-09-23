import React, { useState, useEffect } from 'react';
import { Users, Database, Shield, Settings, Activity, Lock, CheckCircle, RefreshCw, Key, Server, Cpu } from 'lucide-react';
import axios from 'axios';

export default function AdminView() {
  const [patches, setPatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersList = [
    {
      id: 'USER-001',
      name: 'Senior Compliance Officer',
      email: 'officer@bankofindia.co.in',
      role: 'compliance_officer',
      department: 'Regulatory Risk & Governance',
      status: 'ACTIVE',
      lastLogin: '2026-07-27 14:15 IST'
    },
    {
      id: 'USER-002',
      name: 'RBI/SEBI External Auditor',
      email: 'auditor@bankofindia.co.in',
      role: 'auditor',
      department: 'Internal & External Audit',
      status: 'ACTIVE',
      lastLogin: '2026-07-27 13:50 IST'
    },
    {
      id: 'USER-003',
      name: 'System Administrator',
      email: 'admin@bankofindia.co.in',
      role: 'admin',
      department: 'IT Compliance Infrastructure',
      status: 'ACTIVE',
      lastLogin: '2026-07-27 14:35 IST'
    }
  ];

  return (
    <div>
      {/* Admin Header */}
      <div className="glass-card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ background: '#0B3D66', padding: '12px', borderRadius: '8px', color: '#FFFFFF', display: 'flex' }}>
            <Settings size={26} color="#C88A2E" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', margin: 0 }}>
              System Administration & User Management Dashboard
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              Bank of India Infrastructure & Role-Based Access Control (RBAC) Settings
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Active System Users</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {usersList.length}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>RBAC Enforced Access</div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Vector DB Collection</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            boi_circulars
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Milvus / Chroma Index</div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Metadata Engine</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C084FC', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            AWS RDS
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>PostgreSQL Relational DB</div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Pipeline Scheduler</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            Airflow
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-risk-low)', fontWeight: 600 }}>✓ Daily SEBI/RBI Cron Job</div>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', margin: '0 0 16px 0' }}>
          👥 Bank of India Enterprise Users Directory
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table className="audit-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Access</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{user.id}</td>
                  <td style={{ fontWeight: 600 }}>{user.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{user.email}</td>
                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      background: user.role === 'compliance_officer' ? 'rgba(11,61,102,0.1)' : user.role === 'auditor' ? 'rgba(58,122,93,0.1)' : 'rgba(200,138,46,0.1)',
                      color: user.role === 'compliance_officer' ? '#0B3D66' : user.role === 'auditor' ? '#3A7A5D' : '#C88A2E',
                      border: `1px solid ${user.role === 'compliance_officer' ? '#0B3D66' : user.role === 'auditor' ? '#3A7A5D' : '#C88A2E'}`
                    }}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px' }}>{user.department}</td>
                  <td>
                    <span style={{ color: 'var(--color-risk-low)', fontWeight: 600, fontSize: '12px' }}>
                      ✓ {user.status}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {user.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
