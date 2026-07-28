import React from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const StaticListPage = ({ title, subtitle, searchPlaceholder, columns, rows }) => {
  const [search, setSearch] = React.useState('');
  const filtered = rows.filter(r => r.searchText.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="topbar-right">
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 14px', gap: '8px', width: '260px' }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {columns.map((col, i) => <th key={i}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i}>
                  {row.cells.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>No entries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>
              Show 10 <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)' }} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
              Showing <strong style={{ color: 'var(--text)' }}>{filtered.length ? 1 : 0}–{filtered.length}</strong> of <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> entries
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--accent)', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
            <button style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticListPage;
