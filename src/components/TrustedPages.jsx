import React from 'react';
import { Clock, Search, ChevronDown, RefreshCw, FileText, Calendar, Eye } from 'lucide-react';
import { PrimaryButton, GhostButton } from './RichListPage';

const IdBadge = ({ id }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--muted)', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '4px 8px' }}>{id}</span>
);

const DateCell = ({ date, time }) => (
  <div>
    <div style={{ fontSize: '11px', color: 'var(--dim)' }}>{date}</div>
    {time && <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{time}</div>}
  </div>
);

const StatusBadge = ({ label, color }) => (
  <span className="lb-badge" style={{ background: `${color}20`, color, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }} />
    {label}
  </span>
);

const TopBorderCard = ({ label, value, color, valueColor }) => (
  <div className="glass" style={{ padding: '16px 18px', borderTop: `2px solid ${color}` }}>
    <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{label}</div>
    <div style={{ fontSize: '22px', fontWeight: 800, color: valueColor || 'var(--text)' }}>{value}</div>
  </div>
);

const FilterDot = ({ label, color = '#818cf8', active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px',
      background: active ? `${color}20` : 'var(--card-bg-alt)',
      border: active ? `1px solid ${color}80` : '1px solid rgba(255,255,255,0.08)',
      color: active ? color : 'var(--dim)',
      fontSize: '11px', fontWeight: active ? 700 : 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
    }}
  >
    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
    {label}
  </div>
);

const toggleInArray = (setter, value) => setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

const LEAD_STATUS_COLORS = { Hot: '#f87171', Warm: '#fbbf24', Cold: '#60a5fa', Skipped: '#94a3b8' };
const CALL_STATUS_COLORS = { Completed: '#34d399', Processing: '#60a5fa', Failed: '#f87171' };
const OUTCOME_COLORS = { Answered: '#34d399', Unanswered: '#f87171' };

/* ---------- ALL CALL RECORDS ---------- */

const CALL_RECORDS_STATS = [
  { label: 'Total Calls', value: '1,563', color: '#818cf8' },
  { label: 'Hot', value: '18', color: '#f87171' },
  { label: 'Warm', value: '300', color: '#fbbf24' },
  { label: 'Cold', value: '785', color: '#60a5fa' },
  { label: 'Failed', value: '26', color: '#f43f5e' },
  { label: 'Skipped', value: '195', color: '#94a3b8' },
  { label: 'On Hold', value: '0', color: '#fb923c' },
];

const LEAD_STATUS_CYCLE = ['Hot', 'Warm', 'Cold', 'Skipped'];
const CALL_STATUS_CYCLE = ['Completed', 'Processing', 'Failed'];

const CALL_RECORDS_DATA = Array.from({ length: 8 }, (_, i) => ({
  id: `6a630${i}56997bf2e4e89${(641 - i * 4).toString().padStart(3, '0')}d`,
  leadId: `6a4603ca3a93681cadae2${(500 + i * 7).toString().padStart(3, '0')}`,
  project: 'M3m',
  leadStatus: LEAD_STATUS_CYCLE[i % LEAD_STATUS_CYCLE.length],
  callStatus: CALL_STATUS_CYCLE[i % CALL_STATUS_CYCLE.length],
  answered: i % 3 !== 0,
  date: '24 Jul 2026',
  time: `${12 - Math.floor(i / 4)}:${(30 - i * 3).toString().padStart(2, '0')} PM`,
}));

export const AllCallRecordsPage = ({ initialFilter }) => {
  const [search, setSearch] = React.useState('');
  const [leadStatusFilter, setLeadStatusFilter] = React.useState(initialFilter?.type === 'lead' ? [initialFilter.value] : []);
  const [callStatusFilter, setCallStatusFilter] = React.useState(initialFilter?.type === 'call' ? [initialFilter.value] : []);
  const [outcomeFilter, setOutcomeFilter] = React.useState(initialFilter?.type === 'outcome' ? [initialFilter.value] : []);

  const rows = CALL_RECORDS_DATA.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(search.toLowerCase()) || r.project.toLowerCase().includes(search.toLowerCase());
    const matchesLead = leadStatusFilter.length === 0 || leadStatusFilter.includes(r.leadStatus);
    const matchesCall = callStatusFilter.length === 0 || callStatusFilter.includes(r.callStatus);
    const matchesOutcome = outcomeFilter.length === 0 || outcomeFilter.includes(r.answered ? 'Answered' : 'Unanswered');
    return matchesSearch && matchesLead && matchesCall && matchesOutcome;
  });

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left"><h2>All Call Records</h2></div>
        <div className="topbar-right">
          <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px' }}>
            <Clock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>Analyzing 25 recordings...</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Results will appear automatically when ready</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '12px', marginLeft: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>In Queue</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent)' }}>25</div>
            </div>
          </div>
        </div>
      </div>

      <div className="g2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '16px' }}>
        {CALL_RECORDS_STATS.map((s, i) => <TopBorderCard key={i} {...s} />)}
      </div>

      <div className="glass" style={{ padding: '14px 16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', gap: '8px', marginBottom: '14px' }}>
          <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search by project or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Lead Status</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {LEAD_STATUS_CYCLE.map((l) => (
                <FilterDot key={l} label={l} color={LEAD_STATUS_COLORS[l]} active={leadStatusFilter.includes(l)} onClick={() => toggleInArray(setLeadStatusFilter, l)} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Call Status</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {CALL_STATUS_CYCLE.map((l) => (
                <FilterDot key={l} label={l} color={CALL_STATUS_COLORS[l]} active={callStatusFilter.includes(l)} onClick={() => toggleInArray(setCallStatusFilter, l)} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Call Outcome</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Answered', 'Unanswered'].map((l) => (
                <FilterDot key={l} label={l} color={OUTCOME_COLORS[l]} active={outcomeFilter.includes(l)} onClick={() => toggleInArray(setOutcomeFilter, l)} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Site Visit</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <GhostButton>Booked</GhostButton>
              <GhostButton>Not Booked</GhostButton>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Project</div>
            <GhostButton icon={ChevronDown}>All Projects</GhostButton>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Date Range</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GhostButton icon={Calendar}>mm/dd/yyyy</GhostButton>
              <span style={{ color: 'var(--muted)', fontSize: '11px' }}>To</span>
              <GhostButton icon={Calendar}>mm/dd/yyyy</GhostButton>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
            <GhostButton icon={ChevronDown}>More</GhostButton>
          </div>
        </div>
      </div>

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {['#', 'PROJECT', 'CALL ID', 'LEAD ID', 'STATUS', 'RATING', 'DURATION', 'TOTAL USED', 'DATE ANALYZED', 'ACTION'].map((c, i) => (
                  <th key={i} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text)' }}>{r.project}</td>
                  <td><IdBadge id={r.id} /></td>
                  <td><IdBadge id={r.leadId} /></td>
                  <td>
                    <StatusBadge label={r.callStatus} color={CALL_STATUS_COLORS[r.callStatus]} />
                    <div style={{ fontSize: '9px', color: r.answered ? '#34d399' : '#f87171', marginTop: '4px', fontWeight: 700 }}>{r.answered ? 'Answered' : 'Unanswered'}</div>
                  </td>
                  <td><StatusBadge label={r.leadStatus} color={LEAD_STATUS_COLORS[r.leadStatus]} /></td>
                  <td style={{ color: 'var(--muted)' }}>—</td>
                  <td style={{ color: 'var(--muted)' }}>—</td>
                  <td><DateCell date={r.date} time={r.time} /></td>
                  <td>
                    <button style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', cursor: 'pointer' }}>
                      <ChevronDown className="w-3.5 h-3.5" style={{ margin: '0 auto' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ---------- STRATEGIC PERFORMANCE MATRIX ---------- */

const MATRIX_LEGEND = [
  { label: 'Pricing Presented', color: '#818cf8' },
  { label: 'Qualify Interest', color: '#34d399' },
  { label: 'Schedule Visit', color: '#fbbf24' },
];

const MATRIX_DATA = [
  { project: 'M3m', dev: 'M3M', totalCalls: 514, pricing: 24, pricingPct: 5, qualify: 50, qualifyPct: 10, schedule: 1, schedulePct: 0 },
];

const matrixColor = (pct) => (pct >= 70 ? '#34d399' : pct >= 40 ? '#fbbf24' : pct > 0 ? '#f87171' : '#94a3b8');

export const StrategicMatrixPage = () => (
  <div className="main-content no-scrollbar">
    <div className="topbar">
      <div className="topbar-left">
        <h2>Strategic Performance Matrix</h2>
        <p>Goal achievement rates across all projects — chart and table tell the same story</p>
      </div>
    </div>

    <div className="glass" style={{ padding: '14px 20px', marginBottom: '16px', display: 'flex', gap: '20px' }}>
      {MATRIX_LEGEND.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
          {l.label}
        </div>
      ))}
    </div>

    <div className="glass" style={{ marginBottom: '16px' }}>
      <div className="glass-header"><div className="glass-title">Goal Achievement Per Project</div></div>
      <div style={{ padding: '24px 24px 16px', position: 'relative' }}>
        {(() => {
          const PLOT_H = 220;
          const gridLines = [100, 75, 50, 25, 0];
          const barVal = (pct) => Math.max((pct / 100) * PLOT_H, pct > 0 ? 3 : 0);
          return (
            <div style={{ display: 'flex' }}>
              <div style={{ width: '40px', flexShrink: 0, position: 'relative', height: `${PLOT_H}px` }}>
                {gridLines.map((g) => (
                  <span key={g} style={{ position: 'absolute', top: `${PLOT_H - (g / 100) * PLOT_H - 6}px`, right: '10px', fontSize: '10px', color: 'var(--muted)' }}>{g}%</span>
                ))}
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'relative', height: `${PLOT_H}px` }}>
                  {gridLines.map((g) => (
                    <div key={g} style={{ position: 'absolute', left: 0, right: 0, top: `${PLOT_H - (g / 100) * PLOT_H}px`, borderTop: g === 0 ? '1px solid rgba(255,255,255,0.12)' : '1px dashed rgba(255,255,255,0.05)' }} />
                  ))}
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '48px' }}>
                    {MATRIX_DATA.map((m, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                        {[
                          { pct: m.pricingPct, color: MATRIX_LEGEND[0].color },
                          { pct: m.qualifyPct, color: MATRIX_LEGEND[1].color },
                          { pct: m.schedulePct, color: MATRIX_LEGEND[2].color },
                        ].map((bar, bi) => (
                          <div key={bi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: bar.color, marginBottom: '4px' }}>{bar.pct}%</span>
                            <div style={{ width: '32px', height: `${barVal(bar.pct)}px`, background: bar.color, borderRadius: '4px 4px 0 0', transition: 'height 0.6s ease' }} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '10px' }}>
                  {MATRIX_DATA.map((m, i) => (
                    <span key={i} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', width: '106px', textAlign: 'center' }}>{m.project}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>

    <div className="glass">
      <div className="glass-header">
        <div>
          <div className="glass-title">Detailed Breakdown</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Same values as the chart above — green ≥70%, yellow ≥40%, red below</div>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="lb-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Developer</th>
              <th>Total Calls</th>
              <th>Pricing Presented</th>
              <th>Qualify Interest</th>
              <th>Schedule Visit</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX_DATA.map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700, color: 'var(--text)' }}>{m.project}</td>
                <td style={{ color: 'var(--dim)' }}>{m.dev}</td>
                <td style={{ color: 'var(--dim)' }}>{m.totalCalls}</td>
                <td><span className="lb-badge" style={{ background: `${matrixColor(m.pricingPct)}20`, color: matrixColor(m.pricingPct) }}>{m.pricing} ({m.pricingPct}%)</span></td>
                <td><span className="lb-badge" style={{ background: `${matrixColor(m.qualifyPct)}20`, color: matrixColor(m.qualifyPct) }}>{m.qualify} ({m.qualifyPct}%)</span></td>
                <td><span className="lb-badge" style={{ background: `${matrixColor(m.schedulePct)}20`, color: matrixColor(m.schedulePct) }}>{m.schedule} ({m.schedulePct}%)</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ---------- FLAGGED REPORTS ---------- */

const FLAGGED_DATA = [
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '03:14 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '1 section', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '03:08 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:56 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:53 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:50 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:37 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '11:57 am', color: '#94a3b8' },
  { id: '6a4267e3c2a8bfdd64591169', sections: '1 section', submitter: 'Dtcgrouptrusted@gmail.com', date: '01 Jul 2026', time: '04:17 pm', color: '#94a3b8' },
  { id: '6a433d38d22a2ddb2c93926a', sections: '3 sections', submitter: 'Demo@gmail.com', date: '30 Jun 2026', time: '09:24 am', color: '#fbbf24' },
];

export const FlaggedReportsPage = () => {
  const [search, setSearch] = React.useState('');
  const rows = FLAGGED_DATA.filter(r => r.id.toLowerCase().includes(search.toLowerCase()) || r.submitter.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left">
          <h2>Flagged Reports</h2>
          <p>Issues flagged by agents during call analysis — review and action required</p>
        </div>
        <div className="topbar-right">
          <GhostButton icon={RefreshCw}>Refresh</GhostButton>
        </div>
      </div>

      <div className="g2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '480px', marginBottom: '16px' }}>
        <div className="glass" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText className="w-4 h-4" style={{ color: '#818cf8' }} />
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Total Reported</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{FLAGGED_DATA.length}</div>
          </div>
        </div>
        <div className="glass" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar className="w-4 h-4" style={{ color: '#60a5fa' }} />
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Reported This Week</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>0</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '9px 14px', gap: '8px' }}>
          <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search by Call ID or agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
          />
        </div>
        <GhostButton icon={ChevronDown}>All Statuses</GhostButton>
      </div>

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {['#', 'CALL ID', 'STATUS', 'FLAGGED SECTIONS', 'SUBMITTED BY', 'DATE & TIME', 'ANALYSIS', 'ACTIONS'].map((c, i) => (
                  <th key={i} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                  <td><IdBadge id={r.id} /></td>
                  <td><GhostButton icon={ChevronDown}>Pending</GhostButton></td>
                  <td><span className="lb-badge" style={{ background: `${r.color}20`, color: r.color }}>{r.sections}</span></td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#7c3aed', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {r.submitter[0].toUpperCase()}
                    </div>
                    <span style={{ color: 'var(--dim)', fontSize: '11px' }}>{r.submitter}</span>
                  </td>
                  <td><DateCell date={r.date} time={r.time} /></td>
                  <td><PrimaryButton icon={Search}>Analysis</PrimaryButton></td>
                  <td><GhostButton icon={Eye}>View</GhostButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ---------- TRUSTED TRANSACTIONS (project-wise auto billing) ---------- */

const TRUSTED_TX_STATS = [
  { label: 'Total Credits', value: '₹1,16,947', color: '#818cf8' },
  { label: 'Setup Amount', value: '₹70,000', color: '#a78bfa' },
  { label: 'Available Credits', value: '₹39,849', color: '#34d399', valueColor: '#34d399' },
  { label: 'Used Credits', value: '₹77,098', color: '#f87171', valueColor: '#f87171' },
  { label: 'Total Transactions', value: '1600', color: '#22d3ee' },
];

const PROJECT_CREDIT_SUMMARY = [
  { project: 'M3m', rate: '₹3/min', loaded: '₹1,16,947', topup: '+ ₹1,17,031', adhoc: '− ₹70,000', deducted: '₹77,098', available: '₹39,849', txns: 1600, onHold: '—', particular: 'Analysis', type: 'Debit', date: '09 Jun 2026' },
];

export const TrustedTransactionsPage = () => {
  const [tab, setTab] = React.useState('ledger');

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left">
          <h2>Transactions</h2>
          <p>Project-wise auto billing</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '4px', width: 'fit-content', marginBottom: '20px' }}>
        <button
          onClick={() => setTab('ledger')}
          style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, background: tab === 'ledger' ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'transparent', color: tab === 'ledger' ? '#fff' : 'var(--muted)' }}
        >
          Transaction Ledger
        </button>
        <button
          onClick={() => setTab('history')}
          style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, background: tab === 'history' ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'transparent', color: tab === 'history' ? '#fff' : 'var(--muted)' }}
        >
          Transaction History
        </button>
      </div>

      {tab === 'ledger' ? (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <GhostButton icon={ChevronDown}>All Developers</GhostButton>
            <GhostButton icon={ChevronDown}>All Projects</GhostButton>
          </div>

          <div className="g2" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
            {TRUSTED_TX_STATS.map((s, i) => <TopBorderCard key={i} {...s} />)}
          </div>

          <div className="glass">
            <div className="glass-header">
              <div>
                <div className="glass-title">Project Credit Summary</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Live balance status across all projects — red indicates deficit</div>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="lb-table">
                <thead>
                  <tr>
                    {['PROJECT', 'RATE/MIN', 'TOTAL LOADED', '+ TOP-UP', 'AD-HOC', 'TOTAL DEDUCTED', 'AVAILABLE BALANCE', 'TRANSACTIONS', 'ON HOLD', 'LAST PARTICULAR', 'TYPE', 'DATE'].map((c, i) => (
                      <th key={i} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROJECT_CREDIT_SUMMARY.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: 'var(--text)' }}>{p.project}</td>
                      <td style={{ color: 'var(--accent)', fontWeight: 700 }}>{p.rate}</td>
                      <td style={{ color: 'var(--dim)' }}>{p.loaded}</td>
                      <td><span className="lb-badge" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{p.topup}</span></td>
                      <td><span className="lb-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{p.adhoc}</span></td>
                      <td style={{ color: '#f87171', fontWeight: 700 }}>{p.deducted}</td>
                      <td><span className="lb-badge" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>{p.available}</span></td>
                      <td><span className="lb-badge" style={{ background: 'rgba(129,140,248,0.1)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.3)' }}>{p.txns}</span></td>
                      <td style={{ color: 'var(--muted)' }}>{p.onHold}</td>
                      <td style={{ color: 'var(--muted)', fontStyle: 'italic' }}>{p.particular}</td>
                      <td><span className="lb-badge" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171' }}>{p.type}</span></td>
                      <td style={{ color: 'var(--dim)', whiteSpace: 'nowrap' }}>{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="glass" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
          No transaction history entries yet.
        </div>
      )}
    </div>
  );
};
