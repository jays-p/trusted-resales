import React from 'react';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export const FilterPill = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', color: 'var(--accent)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    {label}
    <ChevronDown className="w-3 h-3" />
  </div>
);

export const SearchBox = ({ value, onChange, placeholder, width = '220px' }) => (
  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 14px', gap: '8px', width, flexShrink: 0 }}>
    <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
    />
  </div>
);

export const PrimaryButton = ({ children, icon: Icon }) => (
  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', border: 'none', color: '#fff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.03em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </button>
);

export const GhostButton = ({ children, icon: Icon }) => (
  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </button>
);

export const GhostIconButton = ({ icon: Icon }) => (
  <button style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <Icon className="w-3.5 h-3.5" />
  </button>
);

export const SummaryCard = ({ label, value, icon: Icon, sub }) => (
  <div className="glass" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(124,58,237,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
      </div>
    </div>
    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>
      {value}{sub && <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}> / {sub}</span>}
    </div>
  </div>
);

const RichListPage = ({ title, filters = [], searchPlaceholder, actions, extraRow, columns, rows, totalEntries, entrySeparator = '–' }) => {
  const [search, setSearch] = React.useState('');
  const filteredRows = searchPlaceholder ? rows.filter(r => (r.searchText || '').toLowerCase().includes(search.toLowerCase())) : rows;
  const total = totalEntries ?? rows.length;
  const shown = filteredRows.length;
  const pageCount = Math.min(5, Math.max(1, Math.ceil(total / 10)));

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left"><h2>{title}</h2></div>
        <div className="topbar-right" style={{ flexWrap: 'wrap', rowGap: '10px' }}>
          {filters.map((f, i) => <FilterPill key={i} label={f} />)}
          {searchPlaceholder && <SearchBox value={search} onChange={setSearch} placeholder={searchPlaceholder} />}
          {actions}
        </div>
      </div>

      {extraRow && <div style={{ marginBottom: '20px' }}>{extraRow}</div>}

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {columns.map((col, i) => <th key={i} style={{ whiteSpace: 'nowrap' }}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr key={i}>
                  {row.cells.map((cell, j) => <td key={j} style={{ whiteSpace: 'nowrap' }}>{cell}</td>)}
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>No entries found</td></tr>
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
              Showing <strong style={{ color: 'var(--text)' }}>{shown ? 1 : 0}</strong>{entrySeparator}<strong style={{ color: 'var(--text)' }}>{shown}</strong> of <strong style={{ color: 'var(--text)' }}>{total}</strong> entries
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <div key={p} style={{ width: '26px', height: '26px', borderRadius: '7px', background: p === 1 ? 'var(--accent)' : 'var(--card-bg-alt)', border: p === 1 ? 'none' : '1px solid rgba(255,255,255,0.08)', color: p === 1 ? '#fff' : 'var(--muted)', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {p}
              </div>
            ))}
            <button style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichListPage;
