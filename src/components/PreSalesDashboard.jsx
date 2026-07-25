import React from 'react';
import './PlatformDashboard.css';

const SALES_DATA = [
  { name: 'Jayesh', leads: 50, interested: 25, deals: 6, target: 10, color: '#818cf8' },
  { name: 'Prachi', leads: 40, interested: 18, deals: 4, target: 8, color: '#34d399' },
  { name: 'Rohit', leads: 45, interested: 22, deals: 5, target: 9, color: '#fbbf24' },
  { name: 'Neha', leads: 38, interested: 16, deals: 3, target: 7, color: '#f87171' },
  { name: 'Amit', leads: 55, interested: 30, deals: 8, target: 10, color: '#60a5fa' },
  { name: 'Sneha', leads: 42, interested: 20, deals: 5, target: 8, color: '#a78bfa' },
  { name: 'Vikram', leads: 35, interested: 14, deals: 3, target: 7, color: '#fb923c' },
  { name: 'Pooja', leads: 48, interested: 24, deals: 7, target: 9, color: '#2dd4bf' },
  { name: 'Rahul', leads: 33, interested: 12, deals: 2, target: 6, color: '#e879f9' },
  { name: 'Divya', leads: 44, interested: 21, deals: 6, target: 8, color: '#4ade80' },
  { name: 'Suresh', leads: 30, interested: 10, deals: 2, target: 6, color: '#f472b6' },
  { name: 'Kavita', leads: 37, interested: 15, deals: 4, target: 7, color: '#38bdf8' },
  { name: 'Deepak', leads: 52, interested: 28, deals: 7, target: 10, color: '#facc15' },
  { name: 'Anjali', leads: 41, interested: 19, deals: 4, target: 8, color: '#c084fc' },
  { name: 'Manish', leads: 36, interested: 13, deals: 3, target: 7, color: '#fb7185' },
  { name: 'Ritu', leads: 39, interested: 17, deals: 4, target: 7, color: '#22d3ee' },
  { name: 'Sanjay', leads: 46, interested: 23, deals: 6, target: 9, color: '#a3e635' },
  { name: 'Megha', leads: 34, interested: 11, deals: 2, target: 6, color: '#f97316' },
  { name: 'Arjun', leads: 43, interested: 20, deals: 5, target: 8, color: '#6366f1' },
  { name: 'Nisha', leads: 31, interested: 10, deals: 2, target: 6, color: '#14b8a6' },
  { name: 'Kunal', leads: 47, interested: 25, deals: 6, target: 9, color: '#eab308' },
  { name: 'Swati', leads: 29, interested: 9, deals: 1, target: 5, color: '#ec4899' },
  { name: 'Vishal', leads: 53, interested: 27, deals: 7, target: 10, color: '#8b5cf6' },
  { name: 'Tanvi', leads: 32, interested: 11, deals: 2, target: 6, color: '#10b981' },
  { name: 'Harsh', leads: 49, interested: 26, deals: 6, target: 9, color: '#06b6d4' },
];

// AI Quality parameters
const QUALITY_PARAMS = [
  { key: 'salesperson_introduction', label: 'Sales Intro', icon: '👋' },
  { key: 'salesperson_politeness', label: 'Politeness', icon: '🤝' },
  { key: 'salesperson_convincing_abilities', label: 'Convincing', icon: '💡' },
  { key: 'salesperson_comprehension', label: 'Need Analysis', icon: '🎯' },
  { key: 'call_objective', label: 'Obj. Handling', icon: '🛡️' },
  { key: 'customer_sentiment', label: 'Sentiment', icon: '😊' },
  { key: 'customer_eagerness', label: 'Eagerness', icon: '🔥' },
];

// AI scores per agent
const AI_SCORES = {
  'Jayesh': { salesperson_introduction: 4.2, salesperson_politeness: 4.8, salesperson_convincing_abilities: 3.5, salesperson_comprehension: 4.0, call_objective: 3.2, customer_sentiment: 4.5, customer_eagerness: 3.8 },
  'Prachi': { salesperson_introduction: 4.6, salesperson_politeness: 4.9, salesperson_convincing_abilities: 4.2, salesperson_comprehension: 4.4, call_objective: 4.0, customer_sentiment: 4.7, customer_eagerness: 4.1 },
  'Rohit': { salesperson_introduction: 3.8, salesperson_politeness: 4.1, salesperson_convincing_abilities: 3.0, salesperson_comprehension: 3.6, call_objective: 2.8, customer_sentiment: 3.9, customer_eagerness: 3.2 },
  'Neha': { salesperson_introduction: 4.4, salesperson_politeness: 4.7, salesperson_convincing_abilities: 4.0, salesperson_comprehension: 4.3, call_objective: 3.8, customer_sentiment: 4.6, customer_eagerness: 4.0 },
  'Amit': { salesperson_introduction: 4.0, salesperson_politeness: 4.5, salesperson_convincing_abilities: 3.8, salesperson_comprehension: 4.1, call_objective: 3.5, customer_sentiment: 4.3, customer_eagerness: 3.6 },
  'Sneha': { salesperson_introduction: 4.7, salesperson_politeness: 5.0, salesperson_convincing_abilities: 4.3, salesperson_comprehension: 4.5, call_objective: 4.1, customer_sentiment: 4.8, customer_eagerness: 4.4 },
  'Vikram': { salesperson_introduction: 3.5, salesperson_politeness: 3.9, salesperson_convincing_abilities: 2.8, salesperson_comprehension: 3.3, call_objective: 2.5, customer_sentiment: 3.6, customer_eagerness: 2.9 },
  'Pooja': { salesperson_introduction: 4.3, salesperson_politeness: 4.6, salesperson_convincing_abilities: 3.9, salesperson_comprehension: 4.2, call_objective: 3.7, customer_sentiment: 4.4, customer_eagerness: 3.9 },
  'Rahul': { salesperson_introduction: 3.6, salesperson_politeness: 4.0, salesperson_convincing_abilities: 3.1, salesperson_comprehension: 3.4, call_objective: 2.9, customer_sentiment: 3.7, customer_eagerness: 3.0 },
  'Divya': { salesperson_introduction: 4.5, salesperson_politeness: 4.8, salesperson_convincing_abilities: 4.1, salesperson_comprehension: 4.3, call_objective: 3.9, customer_sentiment: 4.6, customer_eagerness: 4.2 },
  'Suresh': { salesperson_introduction: 3.4, salesperson_politeness: 3.8, salesperson_convincing_abilities: 2.9, salesperson_comprehension: 3.2, call_objective: 2.6, customer_sentiment: 3.5, customer_eagerness: 2.8 },
  'Kavita': { salesperson_introduction: 4.1, salesperson_politeness: 4.4, salesperson_convincing_abilities: 3.7, salesperson_comprehension: 3.9, call_objective: 3.4, customer_sentiment: 4.2, customer_eagerness: 3.5 },
  'Deepak': { salesperson_introduction: 4.4, salesperson_politeness: 4.7, salesperson_convincing_abilities: 4.0, salesperson_comprehension: 4.2, call_objective: 3.8, customer_sentiment: 4.5, customer_eagerness: 4.0 },
  'Anjali': { salesperson_introduction: 4.0, salesperson_politeness: 4.3, salesperson_convincing_abilities: 3.6, salesperson_comprehension: 3.8, call_objective: 3.3, customer_sentiment: 4.1, customer_eagerness: 3.4 },
  'Manish': { salesperson_introduction: 3.7, salesperson_politeness: 4.0, salesperson_convincing_abilities: 3.2, salesperson_comprehension: 3.5, call_objective: 2.9, customer_sentiment: 3.8, customer_eagerness: 3.1 },
  'Ritu': { salesperson_introduction: 4.2, salesperson_politeness: 4.5, salesperson_convincing_abilities: 3.8, salesperson_comprehension: 4.0, call_objective: 3.5, customer_sentiment: 4.3, customer_eagerness: 3.7 },
  'Sanjay': { salesperson_introduction: 4.3, salesperson_politeness: 4.6, salesperson_convincing_abilities: 3.9, salesperson_comprehension: 4.1, call_objective: 3.6, customer_sentiment: 4.4, customer_eagerness: 3.8 },
  'Megha': { salesperson_introduction: 3.5, salesperson_politeness: 3.9, salesperson_convincing_abilities: 2.9, salesperson_comprehension: 3.3, call_objective: 2.7, customer_sentiment: 3.6, customer_eagerness: 2.9 },
  'Arjun': { salesperson_introduction: 4.1, salesperson_politeness: 4.4, salesperson_convincing_abilities: 3.7, salesperson_comprehension: 4.0, call_objective: 3.4, customer_sentiment: 4.2, customer_eagerness: 3.6 },
  'Nisha': { salesperson_introduction: 3.6, salesperson_politeness: 4.0, salesperson_convincing_abilities: 3.1, salesperson_comprehension: 3.4, call_objective: 2.8, customer_sentiment: 3.7, customer_eagerness: 3.0 },
  'Kunal': { salesperson_introduction: 4.3, salesperson_politeness: 4.6, salesperson_convincing_abilities: 3.9, salesperson_comprehension: 4.2, call_objective: 3.7, customer_sentiment: 4.4, customer_eagerness: 3.9 },
  'Swati': { salesperson_introduction: 3.3, salesperson_politeness: 3.7, salesperson_convincing_abilities: 2.7, salesperson_comprehension: 3.1, call_objective: 2.4, customer_sentiment: 3.4, customer_eagerness: 2.7 },
  'Vishal': { salesperson_introduction: 4.4, salesperson_politeness: 4.7, salesperson_convincing_abilities: 4.0, salesperson_comprehension: 4.3, call_objective: 3.8, customer_sentiment: 4.5, customer_eagerness: 4.0 },
  'Tanvi': { salesperson_introduction: 3.7, salesperson_politeness: 4.1, salesperson_convincing_abilities: 3.2, salesperson_comprehension: 3.5, call_objective: 3.0, customer_sentiment: 3.8, customer_eagerness: 3.1 },
  'Harsh': { salesperson_introduction: 4.2, salesperson_politeness: 4.5, salesperson_convincing_abilities: 3.8, salesperson_comprehension: 4.1, call_objective: 3.6, customer_sentiment: 4.3, customer_eagerness: 3.7 },
};

const getAgentAvgAI = (name) => {
  const scores = AI_SCORES[name];
  if (!scores) return 0;
  return Object.values(scores).reduce((a, b) => a + b, 0) / QUALITY_PARAMS.length;
};

// Top 5 by AI score
const TOP5_AI = [...SALES_DATA]
  .filter(a => AI_SCORES[a.name])
  .sort((a, b) => getAgentAvgAI(b.name) - getAgentAvgAI(a.name))
  .slice(0, 5);

const TOTAL = {
  leads: SALES_DATA.reduce((a, b) => a + b.leads, 0),
  interested: SALES_DATA.reduce((a, b) => a + b.interested, 0),
  deals: SALES_DATA.reduce((a, b) => a + b.deals, 0),
  target: SALES_DATA.reduce((a, b) => a + b.target, 0),
};

const TOP5 = [...SALES_DATA].sort((a, b) => b.deals - a.deals).slice(0, 5);

const PreSalesDashboard = ({ onBack }) => {
  const [hoveredBar, setHoveredBar] = React.useState(null);
  const [hoveredFunnel, setHoveredFunnel] = React.useState(null);
  const [hoveredTop, setHoveredTop] = React.useState(null);
  const [hoveredSlice, setHoveredSlice] = React.useState(null);

  return (
    <div className="main-content no-scrollbar">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.03em' }}>Pre Sales Analytics</h2>
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '2px' }}>Sales Team Performance Overview — {SALES_DATA.length} Members</p>
        </div>
        <button onClick={onBack} style={{ padding: '8px 18px', borderRadius: '8px', background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)', color: '#818cf8', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          ← Back to Dashboard
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <KpiCard label="Total Leads" value={TOTAL.leads} color="#818cf8" />
        <KpiCard label="Site Visit Interested" value={TOTAL.interested} color="#fbbf24" />
        <KpiCard label="Deals Closed" value={TOTAL.deals} color="#34d399" />
        <KpiCard label="Overall Conversion" value={`${((TOTAL.deals / TOTAL.leads) * 100).toFixed(1)}%`} color="#a78bfa" />
        <KpiCard label="Team Size" value={SALES_DATA.length} color="#06b6d4" />
      </div>

      {/* Row 1: Funnel + Top Performers + Lead Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div className="glass">
          <div className="glass-header">
            <div className="glass-title">Sales Funnel - Team Overview</div>
          </div>
          <div style={{ padding: '20px' }}>
            {[
              { label: 'Total Leads Generated', value: TOTAL.leads, pct: 100, color: '#818cf8' },
              { label: 'Site Visit Interested', value: TOTAL.interested, pct: (TOTAL.interested / TOTAL.leads * 100), color: '#fbbf24' },
              { label: 'Deals Closed', value: TOTAL.deals, pct: (TOTAL.deals / TOTAL.leads * 100), color: '#34d399' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none', position: 'relative', cursor: 'pointer' }} onMouseEnter={() => setHoveredFunnel(i)} onMouseLeave={() => setHoveredFunnel(null)}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 800, color: step.color, width: '50px' }}>{step.value}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', width: '160px' }}>{step.label}</div>
                <div style={{ flex: 1, height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  <div style={{ width: `${step.pct}%`, height: '100%', borderRadius: '5px', background: step.color }} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: step.color, width: '50px', textAlign: 'right' }}>{step.pct.toFixed(1)}%</div>
                {hoveredFunnel === i && (
                  <div style={{ position: 'absolute', top: '-36px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', border: '1px solid rgba(129,140,248,0.3)', borderRadius: '8px', padding: '6px 12px', whiteSpace: 'nowrap', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: step.color }}>{step.label}: {step.value} ({step.pct.toFixed(1)}%)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Performers */}
        <div className="glass">
          <div className="glass-header">
            <div className="glass-title">Top 5 Performers (By Deals)</div>
          </div>
          <div style={{ padding: '16px' }}>
            {TOP5.map((person, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', position: 'relative', cursor: 'pointer', background: hoveredTop === i ? 'rgba(129,140,248,0.05)' : 'transparent', borderRadius: '8px', transition: 'background 0.15s' }} onMouseEnter={() => setHoveredTop(i)} onMouseLeave={() => setHoveredTop(null)}>
                <div style={{ width: '24px', fontSize: '12px', fontWeight: 800, color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : '#64748b' }}>#{i + 1}</div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#0d1117' }}>{person.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{person.name}</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>{person.leads} leads → {person.interested} interested</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#34d399' }}>{person.deals}</div>
                <div style={{ fontSize: '9px', color: '#64748b', width: '30px' }}>deals</div>
                {hoveredTop === i && (
                  <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', border: '1px solid rgba(129,140,248,0.3)', borderRadius: '8px', padding: '8px 14px', whiteSpace: 'nowrap', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{person.name} — </span>
                    <span style={{ fontSize: '11px', color: '#818cf8' }}>{person.leads} leads</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}> → </span>
                    <span style={{ fontSize: '11px', color: '#fbbf24' }}>{person.interested} interested</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}> → </span>
                    <span style={{ fontSize: '11px', color: '#34d399' }}>{person.deals} deals ({((person.deals/person.leads)*100).toFixed(1)}%)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lead Distribution */}
        <div className="glass">
          <div className="glass-header">
            <div className="glass-title">Lead Distribution by Person</div>
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '14px' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r="62" fill="transparent" stroke="rgba(255,255,255,0.04)" strokeWidth="24" />
                {(() => {
                  const total = TOTAL.leads;
                  let offset = 0;
                  const circ = 2 * Math.PI * 62;
                  return SALES_DATA.slice(0, 8).map((person, i) => {
                    const pct = person.leads / total;
                    const dash = circ * pct;
                    const gap = circ - dash;
                    const isHovered = hoveredSlice === i;
                    const el = (
                      <circle
                        key={i}
                        cx="80"
                        cy="80"
                        r="62"
                        fill="transparent"
                        stroke={person.color}
                        strokeWidth={isHovered ? 30 : 24}
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset}
                        style={{
                          cursor: 'pointer',
                          transition: 'stroke-width 0.2s ease, opacity 0.2s ease, filter 0.2s ease',
                          opacity: hoveredSlice !== null && !isHovered ? 0.4 : 1,
                          filter: isHovered ? `drop-shadow(0 0 6px ${person.color})` : 'none',
                        }}
                        onMouseEnter={() => setHoveredSlice(i)}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                    );
                    offset += dash;
                    return el;
                  });
                })()}
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                {hoveredSlice !== null ? (
                  <>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: SALES_DATA[hoveredSlice].color }}>{SALES_DATA[hoveredSlice].leads}</div>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{SALES_DATA[hoveredSlice].name}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff' }}>{TOTAL.leads}</div>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total</div>
                  </>
                )}
              </div>
              {/* Tooltip */}
              {hoveredSlice !== null && (
                <div style={{ position: 'absolute', top: '-44px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', border: `1px solid ${SALES_DATA[hoveredSlice].color}40`, borderRadius: '8px', padding: '6px 12px', whiteSpace: 'nowrap', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.5)', pointerEvents: 'none' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: SALES_DATA[hoveredSlice].color }}>{SALES_DATA[hoveredSlice].name}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}> — </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{SALES_DATA[hoveredSlice].leads} leads</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}> ({((SALES_DATA[hoveredSlice].leads / TOTAL.leads) * 100).toFixed(1)}%)</span>
                </div>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
              {SALES_DATA.slice(0, 8).map((person, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '2px 4px', borderRadius: '4px', transition: 'background 0.15s', background: hoveredSlice === i ? 'rgba(129,140,248,0.08)' : 'transparent' }} onMouseEnter={() => setHoveredSlice(i)} onMouseLeave={() => setHoveredSlice(null)}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '2px', background: person.color }} />
                  <span style={{ fontSize: '9px', color: hoveredSlice === i ? '#fff' : '#94a3b8', fontWeight: 600, transition: 'color 0.15s' }}>{person.name} ({person.leads})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Executive Performance Table - Above */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header">
          <div className="glass-title">Executive Performance</div>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{SALES_DATA.length} Members</div>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }} className="no-scrollbar">
          <table className="lb-table" style={{ minWidth: '700px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#1a2030', zIndex: 5 }}>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Executive</th>
                <th>Calls</th>
                <th>Avg Score</th>
                <th>Interested</th>
                <th>Site Visit</th>
                <th>Follow-up</th>
                <th>Flagged</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {SALES_DATA.map((person, i) => {
                const avgScore = (person.deals / person.leads * 10).toFixed(1);
                const followUp = Math.floor(person.leads * 0.2);
                const flagged = Math.max(0, Math.floor(person.leads * 0.05));
                const perfPct = Math.min((person.deals / person.target) * 100, 100);
                return (
                  <tr key={i} style={{ transition: 'background 0.15s' }}>
                    <td style={{ color: '#64748b', fontWeight: 700 }}>{i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#0d1117', flexShrink: 0 }}>{person.name[0]}</div>
                        <span style={{ fontWeight: 700, color: '#fff', fontSize: '13px' }}>{person.name}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>{person.leads}</td>
                    <td>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, background: parseFloat(avgScore) >= 1.2 ? 'rgba(52,211,153,0.12)' : parseFloat(avgScore) >= 0.8 ? 'rgba(251,191,36,0.12)' : 'rgba(248,113,113,0.12)', color: parseFloat(avgScore) >= 1.2 ? '#34d399' : parseFloat(avgScore) >= 0.8 ? '#fbbf24' : '#f87171' }}>{avgScore}</span>
                    </td>
                    <td style={{ color: '#fbbf24', fontWeight: 700 }}>{person.interested}</td>
                    <td style={{ color: '#34d399', fontWeight: 700 }}>{person.deals}</td>
                    <td style={{ color: '#94a3b8' }}>{followUp}</td>
                    <td>
                      {flagged > 0 ? (
                        <span style={{ padding: '2px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, background: 'rgba(248,113,113,0.12)', color: '#f87171' }}>{flagged}</span>
                      ) : (
                        <span style={{ color: '#64748b' }}>0</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                          <div style={{ width: `${perfPct}%`, height: '100%', borderRadius: '3px', background: perfPct >= 80 ? '#34d399' : perfPct >= 50 ? '#fbbf24' : '#f87171' }} />
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: perfPct >= 80 ? '#34d399' : perfPct >= 50 ? '#fbbf24' : '#f87171' }}>{perfPct.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target vs Achievement - Below */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header">
          <div className="glass-title">Target vs Achievement</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '4px', borderRadius: '2px', background: '#34d399' }} /><span style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>Achieved</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)' }} /><span style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>Target</span></div>
          </div>
        </div>
        <div style={{ padding: '16px 20px', maxHeight: '400px', overflowY: 'auto' }} className="no-scrollbar">
          {SALES_DATA.map((person, i) => {
            const pct = Math.min((person.deals / person.target) * 100, 100);
            const achieved = person.deals >= person.target;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: i < SALES_DATA.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', position: 'relative', cursor: 'pointer' }} onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#0d1117', flexShrink: 0 }}>{person.name[0]}</div>
                <div style={{ width: '70px', fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{person.name}</div>
                <div style={{ flex: 1, position: 'relative', height: '18px', borderRadius: '9px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '9px', background: 'linear-gradient(90deg, #06b6d4, #34d399)', transition: 'width 0.8s ease', boxShadow: hoveredBar === i ? '0 0 16px rgba(52,211,153,0.5)' : '0 0 12px rgba(52,211,153,0.3)' }} />
                </div>
                <div style={{ width: '90px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: person.color }}>{person.deals}</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>/</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>{person.target}</span>
                </div>
                <div style={{ width: '50px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: person.color }}>
                  {pct.toFixed(0)}%
                </div>
                {achieved && <span style={{ fontSize: '12px' }}>✓</span>}
                {hoveredBar === i && (
                  <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', padding: '8px 14px', whiteSpace: 'nowrap', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff' }}>{person.name}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}> — Target: </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>{person.target}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}> | Achieved: </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399' }}>{person.deals}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}> | </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: achieved ? '#34d399' : '#fbbf24' }}>{pct.toFixed(0)}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Summary */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Total Target: <span style={{ fontWeight: 800, color: '#fff' }}>{TOTAL.target}</span></div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Total Achieved: <span style={{ fontWeight: 800, color: '#34d399' }}>{TOTAL.deals}</span></div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Achievement: <span style={{ fontWeight: 800, color: ((TOTAL.deals / TOTAL.target) * 100) >= 70 ? '#34d399' : '#fbbf24' }}>{((TOTAL.deals / TOTAL.target) * 100).toFixed(1)}%</span></div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(52,211,153,0.1)', color: '#34d399', fontWeight: 700 }}>✓ {SALES_DATA.filter(p => p.deals >= p.target).length} achieved</span>
            <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontWeight: 700 }}>{SALES_DATA.filter(p => p.deals < p.target && (p.deals/p.target) > 0.6).length} near target</span>
            <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(248,113,113,0.1)', color: '#f87171', fontWeight: 700 }}>{SALES_DATA.filter(p => (p.deals/p.target) <= 0.6).length} below target</span>
          </div>
        </div>
      </div>

      {/* Top 5 AI Call Quality Performers */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header">
          <div className="glass-title">🏆 Top 5 Performers (By Avg AI Score)</div>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>★ Score out of 5 (AI Evaluated)</div>
        </div>
        <div style={{ overflowX: 'auto' }} className="no-scrollbar">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>#</th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Agent</th>
                <th style={{ padding: '14px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Calls</th>
                {QUALITY_PARAMS.map(p => (
                  <th key={p.key} style={{ padding: '14px 6px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {p.icon} {p.label}
                  </th>
                ))}
                <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg</th>
              </tr>
            </thead>
            <tbody>
              {TOP5_AI.map((agent, i) => {
                const scores = AI_SCORES[agent.name];
                const avgScore = getAgentAvgAI(agent.name);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : '#64748b' }}>#{i + 1}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#0d1117' }}>{agent.name[0]}</div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{agent.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>{agent.leads}</td>
                    {QUALITY_PARAMS.map(param => {
                      const score = scores[param.key];
                      return (
                        <td key={param.key} style={{ padding: '14px 6px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                            <StarRating score={score} size={11} />
                            <span style={{ fontSize: '10px', fontWeight: 700, color: score >= 4.5 ? '#34d399' : score >= 3.5 ? '#e2e8f0' : '#f87171', fontFamily: "'JetBrains Mono', monospace" }}>{score.toFixed(1)}</span>
                          </div>
                        </td>
                      );
                    })}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 800,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: avgScore >= 4.0 ? 'rgba(52,211,153,0.12)' : avgScore >= 3.5 ? 'rgba(251,191,36,0.12)' : 'rgba(248,113,113,0.12)',
                        color: avgScore >= 4.0 ? '#34d399' : avgScore >= 3.5 ? '#fbbf24' : '#f87171',
                      }}>
                        {avgScore.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Star Rating component
const StarRating = ({ score, maxStars = 5, size = 14 }) => {
  const fullStars = Math.floor(score);
  const partial = score - fullStars;
  const emptyStars = maxStars - fullStars - (partial > 0 ? 1 : 0);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg key={`full-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="0.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      {partial > 0 && (
        <svg key="partial" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="0.5">
          <defs>
            <clipPath id={`clip-${score}-${size}`}>
              <rect x="0" y="0" width={partial * 24} height="24" />
            </clipPath>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#fbbf24" clipPath={`url(#clip-${score}-${size})`} />
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
};

// Sub components
const KpiCard = ({ label, value, color }) => (
  <div style={{ background: '#1a2030', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px 16px', textAlign: 'center' }}>
    <div style={{ fontSize: '26px', fontWeight: 800, fontStyle: 'italic', color, letterSpacing: '-0.5px' }}>{value}</div>
    <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>{label}</div>
  </div>
);

const MetricCircle = ({ label, value, color }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (parseFloat(value) / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: '90px', height: '90px' }}>
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="45" cy="45" r={r} fill="transparent" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
          <circle cx="45" cy="45" r={r} fill="transparent" stroke={color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '16px', fontWeight: 800, color }}>{value}%</span>
        </div>
      </div>
      <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textAlign: 'center' }}>{label}</div>
    </div>
  );
};

export default PreSalesDashboard;
