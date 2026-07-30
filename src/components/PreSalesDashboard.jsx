import React from 'react';
import { Settings2, ChevronDown, ArrowUp, ArrowDown, ArrowUpDown, LineChart, Table2 } from 'lucide-react';
import './PlatformDashboard.css';

const toggleSort = (setter, key) => setter(prev => ({ key, dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc' }));

const SortArrow = ({ active, dir }) => (
  <span
    style={{
      marginLeft: '6px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      borderRadius: '5px',
      background: active ? 'var(--accent)' : 'var(--glass-xs)',
      color: active ? '#fff' : 'var(--muted)',
    }}
  >
    {active ? (
      dir === 'asc' ? <ArrowUp size={10} strokeWidth={2.75} /> : <ArrowDown size={10} strokeWidth={2.75} />
    ) : (
      <ArrowUpDown size={10} strokeWidth={2.25} />
    )}
  </span>
);

const SortableTh = ({ label, sortKey, sort, onSort, style }) => (
  <th
    onClick={() => onSort(sortKey)}
    style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap', ...style }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {label}
      <SortArrow active={sort.key === sortKey} dir={sort.dir} />
    </span>
  </th>
);

const sortByKey = (rows, sort, getValue) => {
  if (!sort.key) return rows;
  const sorted = [...rows].sort((a, b) => {
    const va = getValue(a, sort.key);
    const vb = getValue(b, sort.key);
    if (typeof va === 'string') return va.localeCompare(vb);
    return va - vb;
  });
  return sort.dir === 'asc' ? sorted : sorted.reverse();
};

const DEVELOPERS = [
  'Smartworld', 'M3m Developer', 'DTC Group', 'BPTP Ltd', 'Godrej Properties', 'Raheja Developers', 'Emaar India',
];

const PROJECTS = [
  'Smartworld Sky Arc', 'Smartworld One Dxp', 'Smartworld The Edition', "Smartworld Nature's Court At Gic",
  'M3m Crown', 'M3m Antalya Hills', 'DTC Downtown', 'DTC Capital City', 'DTC Still Waters',
  'BPTP Smartworld Pride', 'World Home Purv', 'ABC Tower 1',
];

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

// AI quality parameters from call recordings
const QUALITY_PARAMS = [
  { key: 'call_objective', label: 'Call Objective', icon: '🎯' },
  { key: 'comprehension', label: 'Comprehension', icon: '🧠' },
  { key: 'convincing_abilities', label: 'Convincing Abilities', icon: '💡' },
  { key: 'introduction', label: 'Introduction', icon: '👋' },
  { key: 'politeness', label: 'Politeness', icon: '🤝' },
  { key: 'project_brief_with_location', label: 'Project Brief With Location', icon: '📍' },
  { key: 'probing', label: 'Probing', icon: '🔍' },
  { key: 'project_highlights', label: 'Project Highlights', icon: '⭐' },
  { key: 'investment_or_own_use_pitch', label: 'Investment Or Own Use Pitch', icon: '💰' },
  { key: 'location_advantage', label: 'Location Advantage', icon: '📌' },
  { key: 'site_visit_invite_and_urgency', label: 'Site Visit Invite And Urgency', icon: '🏠' },
];

// AI scores per agent
const AI_SCORES = {
  'Jayesh': { call_objective: 3.2, comprehension: 4.0, convincing_abilities: 3.5, introduction: 4.2, politeness: 4.8, project_brief_with_location: 3.9, probing: 3.6, project_highlights: 4.1, investment_or_own_use_pitch: 3.4, location_advantage: 4.0, site_visit_invite_and_urgency: 3.7 },
  'Prachi': { call_objective: 4.0, comprehension: 4.4, convincing_abilities: 4.2, introduction: 4.6, politeness: 4.9, project_brief_with_location: 4.3, probing: 4.1, project_highlights: 4.5, investment_or_own_use_pitch: 3.9, location_advantage: 4.4, site_visit_invite_and_urgency: 4.2 },
  'Rohit': { call_objective: 2.8, comprehension: 3.6, convincing_abilities: 3.0, introduction: 3.8, politeness: 4.1, project_brief_with_location: 3.3, probing: 3.0, project_highlights: 3.5, investment_or_own_use_pitch: 2.9, location_advantage: 3.4, site_visit_invite_and_urgency: 3.1 },
  'Neha': { call_objective: 3.8, comprehension: 4.3, convincing_abilities: 4.0, introduction: 4.4, politeness: 4.7, project_brief_with_location: 4.1, probing: 3.9, project_highlights: 4.3, investment_or_own_use_pitch: 3.7, location_advantage: 4.2, site_visit_invite_and_urgency: 4.0 },
  'Amit': { call_objective: 3.5, comprehension: 4.1, convincing_abilities: 3.8, introduction: 4.0, politeness: 4.5, project_brief_with_location: 3.7, probing: 3.5, project_highlights: 4.0, investment_or_own_use_pitch: 3.3, location_advantage: 3.8, site_visit_invite_and_urgency: 3.6 },
  'Sneha': { call_objective: 4.1, comprehension: 4.5, convincing_abilities: 4.3, introduction: 4.7, politeness: 5.0, project_brief_with_location: 4.4, probing: 4.2, project_highlights: 4.6, investment_or_own_use_pitch: 4.0, location_advantage: 4.5, site_visit_invite_and_urgency: 4.3 },
  'Vikram': { call_objective: 2.5, comprehension: 3.3, convincing_abilities: 2.8, introduction: 3.5, politeness: 3.9, project_brief_with_location: 3.0, probing: 2.7, project_highlights: 3.2, investment_or_own_use_pitch: 2.6, location_advantage: 3.1, site_visit_invite_and_urgency: 2.8 },
  'Pooja': { call_objective: 3.7, comprehension: 4.2, convincing_abilities: 3.9, introduction: 4.3, politeness: 4.6, project_brief_with_location: 4.0, probing: 3.8, project_highlights: 4.2, investment_or_own_use_pitch: 3.6, location_advantage: 4.1, site_visit_invite_and_urgency: 3.9 },
  'Rahul': { call_objective: 2.9, comprehension: 3.4, convincing_abilities: 3.1, introduction: 3.6, politeness: 4.0, project_brief_with_location: 3.2, probing: 2.9, project_highlights: 3.3, investment_or_own_use_pitch: 2.8, location_advantage: 3.3, site_visit_invite_and_urgency: 3.0 },
  'Divya': { call_objective: 3.9, comprehension: 4.3, convincing_abilities: 4.1, introduction: 4.5, politeness: 4.8, project_brief_with_location: 4.2, probing: 4.0, project_highlights: 4.4, investment_or_own_use_pitch: 3.8, location_advantage: 4.3, site_visit_invite_and_urgency: 4.1 },
  'Suresh': { call_objective: 2.6, comprehension: 3.2, convincing_abilities: 2.9, introduction: 3.4, politeness: 3.8, project_brief_with_location: 2.9, probing: 2.6, project_highlights: 3.1, investment_or_own_use_pitch: 2.5, location_advantage: 3.0, site_visit_invite_and_urgency: 2.7 },
  'Kavita': { call_objective: 3.4, comprehension: 3.9, convincing_abilities: 3.7, introduction: 4.1, politeness: 4.4, project_brief_with_location: 3.6, probing: 3.4, project_highlights: 3.9, investment_or_own_use_pitch: 3.2, location_advantage: 3.7, site_visit_invite_and_urgency: 3.5 },
  'Deepak': { call_objective: 3.8, comprehension: 4.2, convincing_abilities: 4.0, introduction: 4.4, politeness: 4.7, project_brief_with_location: 4.1, probing: 3.9, project_highlights: 4.3, investment_or_own_use_pitch: 3.7, location_advantage: 4.2, site_visit_invite_and_urgency: 4.0 },
  'Anjali': { call_objective: 3.3, comprehension: 3.8, convincing_abilities: 3.6, introduction: 4.0, politeness: 4.3, project_brief_with_location: 3.5, probing: 3.3, project_highlights: 3.8, investment_or_own_use_pitch: 3.1, location_advantage: 3.6, site_visit_invite_and_urgency: 3.4 },
  'Manish': { call_objective: 2.9, comprehension: 3.5, convincing_abilities: 3.2, introduction: 3.7, politeness: 4.0, project_brief_with_location: 3.2, probing: 3.0, project_highlights: 3.4, investment_or_own_use_pitch: 2.8, location_advantage: 3.3, site_visit_invite_and_urgency: 3.1 },
  'Ritu': { call_objective: 3.5, comprehension: 4.0, convincing_abilities: 3.8, introduction: 4.2, politeness: 4.5, project_brief_with_location: 3.7, probing: 3.5, project_highlights: 4.0, investment_or_own_use_pitch: 3.3, location_advantage: 3.8, site_visit_invite_and_urgency: 3.6 },
  'Sanjay': { call_objective: 3.6, comprehension: 4.1, convincing_abilities: 3.9, introduction: 4.3, politeness: 4.6, project_brief_with_location: 3.8, probing: 3.6, project_highlights: 4.1, investment_or_own_use_pitch: 3.4, location_advantage: 3.9, site_visit_invite_and_urgency: 3.7 },
  'Megha': { call_objective: 2.7, comprehension: 3.3, convincing_abilities: 2.9, introduction: 3.5, politeness: 3.9, project_brief_with_location: 3.0, probing: 2.8, project_highlights: 3.2, investment_or_own_use_pitch: 2.6, location_advantage: 3.1, site_visit_invite_and_urgency: 2.9 },
  'Arjun': { call_objective: 3.4, comprehension: 4.0, convincing_abilities: 3.7, introduction: 4.1, politeness: 4.4, project_brief_with_location: 3.6, probing: 3.4, project_highlights: 3.9, investment_or_own_use_pitch: 3.2, location_advantage: 3.7, site_visit_invite_and_urgency: 3.5 },
  'Nisha': { call_objective: 2.8, comprehension: 3.4, convincing_abilities: 3.1, introduction: 3.6, politeness: 4.0, project_brief_with_location: 3.1, probing: 2.9, project_highlights: 3.3, investment_or_own_use_pitch: 2.7, location_advantage: 3.2, site_visit_invite_and_urgency: 3.0 },
  'Kunal': { call_objective: 3.7, comprehension: 4.2, convincing_abilities: 3.9, introduction: 4.3, politeness: 4.6, project_brief_with_location: 3.9, probing: 3.7, project_highlights: 4.2, investment_or_own_use_pitch: 3.5, location_advantage: 4.0, site_visit_invite_and_urgency: 3.8 },
  'Swati': { call_objective: 2.4, comprehension: 3.1, convincing_abilities: 2.7, introduction: 3.3, politeness: 3.7, project_brief_with_location: 2.8, probing: 2.5, project_highlights: 3.0, investment_or_own_use_pitch: 2.4, location_advantage: 2.9, site_visit_invite_and_urgency: 2.6 },
  'Vishal': { call_objective: 3.8, comprehension: 4.3, convincing_abilities: 4.0, introduction: 4.4, politeness: 4.7, project_brief_with_location: 4.1, probing: 3.9, project_highlights: 4.3, investment_or_own_use_pitch: 3.7, location_advantage: 4.2, site_visit_invite_and_urgency: 4.0 },
  'Tanvi': { call_objective: 3.0, comprehension: 3.5, convincing_abilities: 3.2, introduction: 3.7, politeness: 4.1, project_brief_with_location: 3.3, probing: 3.0, project_highlights: 3.4, investment_or_own_use_pitch: 2.9, location_advantage: 3.4, site_visit_invite_and_urgency: 3.1 },
  'Harsh': { call_objective: 3.6, comprehension: 4.1, convincing_abilities: 3.8, introduction: 4.2, politeness: 4.5, project_brief_with_location: 3.8, probing: 3.6, project_highlights: 4.0, investment_or_own_use_pitch: 3.4, location_advantage: 3.9, site_visit_invite_and_urgency: 3.7 },
};

const getAgentAvgAI = (name) => {
  const scores = AI_SCORES[name];
  if (!scores) return 0;
  return Object.values(scores).reduce((a, b) => a + b, 0) / QUALITY_PARAMS.length;
};

// Deterministic pseudo-random monthly trend per executive (stable across re-renders)
const TREND_MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const seededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const getMonthlyTrend = (person) => {
  let seed = 0;
  for (let i = 0; i < person.name.length; i++) seed = (seed * 31 + person.name.charCodeAt(i)) >>> 0;
  const rand = seededRandom(seed);
  const baseCalls = person.leads / TREND_MONTHS.length;
  const baseScore = Math.max(1.5, Math.min(4.5, (person.deals / person.leads) * 10));
  return TREND_MONTHS.map((month, i) => {
    const progress = i / (TREND_MONTHS.length - 1);
    const calls = Math.max(3, Math.round(baseCalls * (0.75 + 0.3 * progress) * (0.85 + rand() * 0.3)));
    const avgScore = Math.max(0.5, Math.min(5, parseFloat((baseScore * (0.82 + 0.22 * progress) + (rand() - 0.5) * 0.5).toFixed(1))));
    return { month, calls, avgScore };
  });
};

const getAggregateMonthlyTrend = (people) => {
  const perPerson = people.map(getMonthlyTrend);
  return TREND_MONTHS.map((month, i) => {
    const calls = perPerson.reduce((sum, trend) => sum + trend[i].calls, 0);
    const avgScore = parseFloat((perPerson.reduce((sum, trend) => sum + trend[i].avgScore, 0) / perPerson.length).toFixed(1));
    return { month, calls, avgScore };
  });
};

// Deterministic pseudo-random monthly Hot/Warm/Cold lead trend per executive
const getMonthlyLeadTrend = (person) => {
  let seed = 0;
  for (let i = 0; i < person.name.length; i++) seed = (seed * 37 + person.name.charCodeAt(i)) >>> 0;
  const rand = seededRandom(seed + 777);
  const baseWarm = Math.round(person.leads * 0.19);
  const baseCold = Math.floor(person.leads * 0.4);
  return TREND_MONTHS.map((month, i) => {
    const progress = i / (TREND_MONTHS.length - 1);
    // Hot leads are rare events, not a fraction of monthly volume — keep a small but visible range
    const hot = Math.max(1, Math.round(1 + rand() * 2.4 * (0.6 + 0.7 * progress)));
    const warm = Math.max(1, Math.round((baseWarm / TREND_MONTHS.length) * (0.75 + 0.3 * progress) * (0.85 + rand() * 0.3)));
    const cold = Math.max(1, Math.round((baseCold / TREND_MONTHS.length) * (0.75 + 0.3 * progress) * (0.85 + rand() * 0.3)));
    return { month, hot, warm, cold };
  });
};

const getAggregateMonthlyLeadTrend = (people) => {
  const perPerson = people.map(getMonthlyLeadTrend);
  return TREND_MONTHS.map((month, i) => ({
    month,
    hot: perPerson.reduce((sum, trend) => sum + trend[i].hot, 0),
    warm: perPerson.reduce((sum, trend) => sum + trend[i].warm, 0),
    cold: perPerson.reduce((sum, trend) => sum + trend[i].cold, 0),
  }));
};

const roundedTopBarPath = (x, y, w, h, r) => {
  const rr = Math.min(r, h);
  return `M ${x} ${y + h} L ${x} ${y + rr} Q ${x} ${y} ${x + rr} ${y} L ${x + w - rr} ${y} Q ${x + w} ${y} ${x + w} ${y + rr} L ${x + w} ${y + h} Z`;
};

const LEAD_TYPES = [
  { key: 'hot', label: 'Hot', color: '#34d399' },
  { key: 'warm', label: 'Warm', color: '#fbbf24' },
  { key: 'cold', label: 'Cold', color: '#60a5fa' },
];

const LEADER_FILTERS = [
  { key: 'all', label: 'All', color: 'var(--accent)' },
  { key: 'hot', label: 'Hot', color: '#f87171' },
  { key: 'warm', label: 'Warm', color: '#fbbf24' },
  { key: 'cold', label: 'Cold', color: '#60a5fa' },
];

const LeadTrendChart = ({ data }) => {
  const [showTable, setShowTable] = React.useState(false);
  const n = data.length;

  const W = 900, H = 150;
  const padL = 36, padR = 16, padT = 14, padB = 22;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const xAt = (i) => padL + (n === 1 ? 0 : (i / (n - 1)) * plotW);

  const maxVal = Math.max(...data.map(d => Math.max(d.hot, d.warm, d.cold))) * 1.2;
  const yAt = (v) => padT + plotH - (v / maxVal) * plotH;

  const linePath = (key) => data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(d[key])}`).join(' ');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '14px' }}>
        {LEAD_TYPES.map(s => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color, display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          {[0, 0.25, 0.5, 0.75, 1].map(t => (
            <line key={t} x1={padL} x2={W - padR} y1={padT + plotH * (1 - t)} y2={padT + plotH * (1 - t)} stroke="var(--gb)" strokeWidth="1" />
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map(t => (
            <text key={t} x={padL - 8} y={padT + plotH * (1 - t) + 3} fontSize="9" fill="var(--muted)" textAnchor="end">{Math.round(maxVal * t)}</text>
          ))}
          {LEAD_TYPES.map(s => (
            <path key={s.key} d={linePath(s.key)} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {LEAD_TYPES.map(s => (
            data.map((d, i) => (
              <circle key={`${s.key}-${i}`} cx={xAt(i)} cy={yAt(d[s.key])} r="3.5" fill={s.color} stroke="var(--card-bg)" strokeWidth="1.5" />
            ))
          ))}
          {LEAD_TYPES.map(s => (
            <text key={`${s.key}-label`} x={xAt(n - 1) + 8} y={yAt(data[n - 1][s.key]) + 3} fontSize="10" fontWeight="800" fill={s.color} textAnchor="start">{data[n - 1][s.key]}</text>
          ))}
          {data.map((d, i) => (
            <text key={i} x={xAt(i)} y={H - 6} fontSize="10" fill="var(--muted)" textAnchor="middle">{d.month}</text>
          ))}
        </svg>
      </div>

      <div
        onClick={() => setShowTable(!showTable)}
        style={{ marginTop: '18px', fontSize: '12px', fontWeight: 700, color: 'var(--accent)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
      >
        {showTable ? 'Hide' : 'View'} as table
        <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: showTable ? 'rotate(180deg)' : 'none' }} />
      </div>
      {showTable && (
        <table className="lb-table" style={{ marginTop: '10px', width: '100%' }}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Hot</th>
              <th>Warm</th>
              <th>Cold</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--text)', fontWeight: 700 }}>{d.month}</td>
                <td>{d.hot}</td>
                <td>{d.warm}</td>
                <td>{d.cold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const MonthlyTrendCharts = ({ data }) => {
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const [hoverBar, setHoverBar] = React.useState(null);
  const [showTable, setShowTable] = React.useState(false);
  const n = data.length;

  // Line chart (avg quality score) — sized for a side-by-side half-width column
  const lineColor = '#f472b6';
  const barColor = '#38bdf8';
  const W = 280, H = 110;
  const padL = 24, padR = 10, padT = 10, padB = 18;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const xAt = (i) => padL + (n === 1 ? 0 : (i / (n - 1)) * plotW);
  const yScore = (v) => padT + plotH - (v / 5) * plotH;
  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yScore(d.avgScore)}`).join(' ');
  const areaPath = `${linePath} L ${xAt(n - 1)} ${padT + plotH} L ${xAt(0)} ${padT + plotH} Z`;

  // Bar chart (calls)
  const H2 = 110;
  const padT2 = 10, padB2 = 18;
  const plotH2 = H2 - padT2 - padB2;
  const callsMax = Math.max(...data.map(d => d.calls)) * 1.2;
  const yCalls = (v) => padT2 + plotH2 - (v / callsMax) * plotH2;
  const barW = 11;

  const handleLineMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const ratio = Math.min(1, Math.max(0, (x - padL) / plotW));
    setHoverIdx(Math.round(ratio * (n - 1)));
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        {/* Avg Quality Score trend (line) */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Avg Quality Score</div>
          <div style={{ position: 'relative' }}>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} onMouseMove={handleLineMove} onMouseLeave={() => setHoverIdx(null)} style={{ display: 'block', cursor: 'crosshair' }}>
              {[0, 1, 2, 3, 4, 5].map(t => (
                <line key={t} x1={padL} x2={W - padR} y1={yScore(t)} y2={yScore(t)} stroke="var(--gb)" strokeWidth="1" />
              ))}
              {[0, 1, 2, 3, 4, 5].map(t => (
                <text key={t} x={padL - 7} y={yScore(t) + 3} fontSize="9" fill="var(--muted)" textAnchor="end">{t}</text>
              ))}
              <path d={areaPath} fill={lineColor} opacity="0.12" stroke="none" />
              <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {hoverIdx !== null && (
                <line x1={xAt(hoverIdx)} x2={xAt(hoverIdx)} y1={padT} y2={padT + plotH} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" />
              )}
              {data.map((d, i) => (
                <circle key={i} cx={xAt(i)} cy={yScore(d.avgScore)} r={i === hoverIdx ? 5.5 : 4} fill={lineColor} stroke="var(--card-bg)" strokeWidth="2" />
              ))}
              {data.map((d, i) => (
                <text key={i} x={xAt(i)} y={H - 5} fontSize="9" fill="var(--muted)" textAnchor="middle">{d.month}</text>
              ))}
              <text x={xAt(n - 1)} y={yScore(data[n - 1].avgScore) - 11} fontSize="11" fontWeight="800" fill="var(--text)" textAnchor="middle">{data[n - 1].avgScore.toFixed(1)}</text>
            </svg>
            {hoverIdx !== null && (
              <div style={{ position: 'absolute', left: `${(xAt(hoverIdx) / W) * 100}%`, top: 0, transform: 'translate(-50%, -100%)', background: 'var(--card-bg)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: '0 6px 20px rgba(0,0,0,0.35)' }}>
                <div style={{ color: 'var(--muted)', fontWeight: 700, marginBottom: '3px' }}>{data[hoverIdx].month}</div>
                <div style={{ color: 'var(--text)', fontWeight: 800 }}>{data[hoverIdx].avgScore.toFixed(1)} avg score</div>
              </div>
            )}
          </div>
        </div>

        {/* Calls volume (bar) */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Calls Volume</div>
          <div style={{ position: 'relative' }}>
            <svg width="100%" viewBox={`0 0 ${W} ${H2}`} style={{ display: 'block' }}>
              {[0, 0.5, 1].map(t => (
                <line key={t} x1={padL} x2={W - padR} y1={padT2 + plotH2 * (1 - t)} y2={padT2 + plotH2 * (1 - t)} stroke="var(--gb)" strokeWidth="1" />
              ))}
              {data.map((d, i) => {
                const x = xAt(i) - barW / 2;
                const y = yCalls(d.calls);
                const h = padT2 + plotH2 - y;
                return (
                  <path
                    key={i}
                    d={roundedTopBarPath(x, y, barW, h, 4)}
                    fill={barColor}
                    opacity={hoverBar === null || hoverBar === i ? 1 : 0.55}
                    onMouseEnter={() => setHoverBar(i)}
                    onMouseLeave={() => setHoverBar(null)}
                    style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                  />
                );
              })}
              {data.map((d, i) => (
                <text key={i} x={xAt(i)} y={H2 - 5} fontSize="9" fill="var(--muted)" textAnchor="middle">{d.month}</text>
              ))}
              <text x={xAt(n - 1)} y={yCalls(data[n - 1].calls) - 7} fontSize="11" fontWeight="800" fill="var(--text)" textAnchor="middle">{data[n - 1].calls}</text>
            </svg>
            {hoverBar !== null && (
              <div style={{ position: 'absolute', left: `${(xAt(hoverBar) / W) * 100}%`, top: `${(yCalls(data[hoverBar].calls) / H2) * 100}%`, transform: 'translate(-50%, -130%)', background: 'var(--card-bg)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: '0 6px 20px rgba(0,0,0,0.35)' }}>
                <div style={{ color: 'var(--muted)', fontWeight: 700, marginBottom: '3px' }}>{data[hoverBar].month}</div>
                <div style={{ color: 'var(--text)', fontWeight: 800 }}>{data[hoverBar].calls} calls</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={() => setShowTable(!showTable)}
        style={{ marginTop: '22px', fontSize: '12px', fontWeight: 700, color: 'var(--accent)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
      >
        {showTable ? 'Hide' : 'View'} as table
        <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: showTable ? 'rotate(180deg)' : 'none' }} />
      </div>
      {showTable && (
        <table className="lb-table" style={{ marginTop: '10px', width: '100%' }}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Calls</th>
              <th>Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--text)', fontWeight: 700 }}>{d.month}</td>
                <td>{d.calls}</td>
                <td>{d.avgScore.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const PersonKpiCards = ({ person }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
    {[
      { label: 'Calls', value: person.leads },
      { label: 'Deals', value: person.deals },
      { label: 'Target', value: person.target },
      { label: 'Conversion', value: `${Math.round((person.deals / person.leads) * 100)}%` },
    ].map((s, i) => (
      <div key={i} style={{ background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '12px', padding: '14px 16px' }}>
        <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
        <div style={{ fontSize: '20px', color: 'var(--text)', fontWeight: 800, marginTop: '4px' }}>{s.value}</div>
      </div>
    ))}
  </div>
);

// Top AI scores
const ALL_AI = [...SALES_DATA]
  .filter(a => AI_SCORES[a.name])
  .map(a => ({
    ...a,
    hot: Math.max(1, Math.round(a.leads * 0.02)),
    warm: Math.round(a.leads * 0.19),
    cold: Math.floor(a.leads * 0.4),
  }))
  .sort((a, b) => getAgentAvgAI(b.name) - getAgentAvgAI(a.name));

const TOP3_AI = ALL_AI.slice(0, 3);

const TOTAL = {
  leads: SALES_DATA.reduce((a, b) => a + b.leads, 0),
  interested: SALES_DATA.reduce((a, b) => a + b.interested, 0),
  deals: SALES_DATA.reduce((a, b) => a + b.deals, 0),
  target: SALES_DATA.reduce((a, b) => a + b.target, 0),
};

const TOP5 = [...SALES_DATA].sort((a, b) => b.deals - a.deals).slice(0, 5);

const PreSalesDashboard = ({ onBack, onNavigateToCallRecords = () => {} }) => {
  const [hoveredBar, setHoveredBar] = React.useState(null);
  const [hoveredFunnel, setHoveredFunnel] = React.useState(null);
  const [hoveredTop, setHoveredTop] = React.useState(null);
  const [hoveredSlice, setHoveredSlice] = React.useState(null);
  const [execSearch, setExecSearch] = React.useState('');
  const [aiSearch, setAiSearch] = React.useState('');
  const [coldTooltip, setColdTooltip] = React.useState(null);
  const [expandedRows, setExpandedRows] = React.useState({});
  const [showAllLeaderboard, setShowAllLeaderboard] = React.useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);
  const [execPerfOpen, setExecPerfOpen] = React.useState(false);
  const [execGraphOpen, setExecGraphOpen] = React.useState(false);
  const [execGraphSelected, setExecGraphSelected] = React.useState('all');
  const [execGraphDropdown, setExecGraphDropdown] = React.useState(false);
  const [execGraphSearch, setExecGraphSearch] = React.useState('');
  const execGraphDropdownRef = React.useRef(null);

  React.useEffect(() => {
    if (!execGraphDropdown) return;
    const handleClickOutside = (e) => {
      if (execGraphDropdownRef.current && !execGraphDropdownRef.current.contains(e.target)) {
        setExecGraphDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [execGraphDropdown]);
  const [execSort, setExecSort] = React.useState({ key: null, dir: 'desc' });
  const [leaderSort, setLeaderSort] = React.useState({ key: null, dir: 'desc' });
  const [leaderFilter, setLeaderFilter] = React.useState('all');
  const [leaderFilterDropdown, setLeaderFilterDropdown] = React.useState(false);
  const leaderFilterDropdownRef = React.useRef(null);

  React.useEffect(() => {
    if (!leaderFilterDropdown) return;
    const handleClickOutside = (e) => {
      if (leaderFilterDropdownRef.current && !leaderFilterDropdownRef.current.contains(e.target)) {
        setLeaderFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [leaderFilterDropdown]);
  const [leaderGraphOpen, setLeaderGraphOpen] = React.useState(false);
  const [leaderGraphSelected, setLeaderGraphSelected] = React.useState('all');
  const [leaderGraphDropdown, setLeaderGraphDropdown] = React.useState(false);
  const [leaderGraphSearch, setLeaderGraphSearch] = React.useState('');
  const leaderGraphDropdownRef = React.useRef(null);

  React.useEffect(() => {
    if (!leaderGraphDropdown) return;
    const handleClickOutside = (e) => {
      if (leaderGraphDropdownRef.current && !leaderGraphDropdownRef.current.contains(e.target)) {
        setLeaderGraphDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [leaderGraphDropdown]);
  const [devDropdown, setDevDropdown] = React.useState(false);
  const [projDropdown, setProjDropdown] = React.useState(false);
  const [devSearch, setDevSearch] = React.useState('');
  const [projSearch, setProjSearch] = React.useState('');
  const [selectedDev, setSelectedDev] = React.useState('Enterprise View (All Developers)');
  const [selectedProj, setSelectedProj] = React.useState('All Projects');

  const toggleRow = (idx) => {
    setExpandedRows(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleExport = (headers, rows, filename) => {
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const execRows = SALES_DATA
    .map((p) => ({
      ...p,
      avgScore: parseFloat((p.deals / p.leads * 10).toFixed(1)),
      perfPct: Math.min((p.deals / p.target) * 100, 100),
      hot: Math.max(1, Math.round(p.leads * 0.02)),
      warm: Math.round(p.leads * 0.19),
      answered: Math.floor(p.leads * 0.75),
      unanswered: p.leads - Math.floor(p.leads * 0.75),
      coldTotal: Math.floor(p.leads * 0.4),
    }))
    .filter(p => p.name.toLowerCase().includes(execSearch.toLowerCase()));
  const sortedExecRows = sortByKey(execRows, execSort, (row, key) => (key === 'name' ? row.name : key === 'calls' ? row.leads : key === 'cold' ? row.coldTotal : row[key]));

  const leaderRows = ALL_AI
    .map((a) => ({ ...a, avgScore: getAgentAvgAI(a.name), scores: AI_SCORES[a.name] }))
    .filter(a => a.name.toLowerCase().includes(aiSearch.toLowerCase()));
  const sortedLeaderRows = leaderFilter === 'all'
    ? sortByKey(leaderRows, leaderSort, (row, key) => (key === 'name' ? row.name : key === 'avgScore' ? row.avgScore : row.scores[key]))
    : [...leaderRows].sort((a, b) => b[leaderFilter] - a[leaderFilter]);

  const leaderTop3 = leaderFilter === 'all' ? TOP3_AI : [...ALL_AI].sort((a, b) => b[leaderFilter] - a[leaderFilter]).slice(0, 3);

  const leaderGraphPerson = leaderGraphSelected === 'all' ? null : ALL_AI.find(p => p.name === leaderGraphSelected);
  const leaderGraphData = React.useMemo(() => {
    if (leaderGraphSelected === 'all') return getAggregateMonthlyLeadTrend(ALL_AI);
    return getMonthlyLeadTrend(leaderGraphPerson);
  }, [leaderGraphSelected]);

  const execGraphPerson = execGraphSelected === 'all' ? null : SALES_DATA.find(p => p.name === execGraphSelected);
  const execGraphData = React.useMemo(() => {
    if (execGraphSelected === 'all') return getAggregateMonthlyTrend(SALES_DATA);
    return getMonthlyTrend(execGraphPerson);
  }, [execGraphSelected]);

  return (
    <>
    <div className="main-content no-scrollbar">
      {/* Header */}
      <div className="topbar" style={{ marginBottom: '24px', borderBottom: 'none', padding: 0 }}>
        <div className="topbar-left">
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>Pre Sales Analytics</h2>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '2px' }}>Sales Team Performance Overview — {SALES_DATA.length} Members</p>
          </div>
        </div>
        <div className="topbar-right">
          {/* Developer Dropdown */}
          <div className={`admin-dropdown ${devDropdown ? 'open' : ''}`} onClick={() => { setDevDropdown(!devDropdown); setProjDropdown(false); }}>
            <Settings2 className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
            <span>{selectedDev}</span>
            <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)', transition: 'transform 0.2s', transform: devDropdown ? 'rotate(180deg)' : '' }} />
            {devDropdown && (
              <div className="dropdown-popup" onClick={(e) => e.stopPropagation()}>
                <input
                  className="dropdown-search"
                  type="text"
                  placeholder="Search..."
                  value={devSearch}
                  onChange={(e) => setDevSearch(e.target.value)}
                  autoFocus
                />
                <div className="dropdown-list">
                  <div className={`dropdown-item ${selectedDev === 'Enterprise View (All Developers)' ? 'active' : ''}`} onClick={() => { setSelectedDev('Enterprise View (All Developers)'); setDevDropdown(false); setDevSearch(''); }}>
                    Enterprise View (All Developers)
                  </div>
                  {DEVELOPERS.filter(d => d.toLowerCase().includes(devSearch.toLowerCase())).map((dev, i) => (
                    <div key={i} className={`dropdown-item ${selectedDev === dev ? 'active' : ''}`} onClick={() => { setSelectedDev(dev); setDevDropdown(false); setDevSearch(''); }}>
                      {dev}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Dropdown */}
          <div className={`admin-dropdown ${projDropdown ? 'open' : ''}`} onClick={() => { setProjDropdown(!projDropdown); setDevDropdown(false); }}>
            <Settings2 className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
            <span>{selectedProj}</span>
            <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)', transition: 'transform 0.2s', transform: projDropdown ? 'rotate(180deg)' : '' }} />
            {projDropdown && (
              <div className="dropdown-popup" onClick={(e) => e.stopPropagation()}>
                <input
                  className="dropdown-search"
                  type="text"
                  placeholder="Search..."
                  value={projSearch}
                  onChange={(e) => setProjSearch(e.target.value)}
                  autoFocus
                />
                <div className="dropdown-list">
                  <div className={`dropdown-item ${selectedProj === 'All Projects' ? 'active' : ''}`} onClick={() => { setSelectedProj('All Projects'); setProjDropdown(false); setProjSearch(''); }}>
                    All Projects
                  </div>
                  {PROJECTS.filter(p => p.toLowerCase().includes(projSearch.toLowerCase())).map((proj, i) => (
                    <div key={i} className={`dropdown-item ${selectedProj === proj ? 'active' : ''}`} onClick={() => { setSelectedProj(proj); setProjDropdown(false); setProjSearch(''); }}>
                      {proj}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={onBack} style={{ padding: '8px 18px', borderRadius: '8px', background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)', color: '#818cf8', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginLeft: '12px' }}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Time Filter */}
      <MainTimeFilter />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <KpiCard label="Calls" value="2,189" color="var(--text)" />
        <KpiCard label="Goals Met" value={455} color="#34d399" />
        <KpiCard label="Hot" value={44} color="#f87171" />
        <KpiCard label="Warm" value={411} color="#fbbf24" />
        <KpiCard label="Cold" value={889} color="#60a5fa" />
      </div>

      {/* 🏆 Top Performers & Lead Distribution - Grid Layout */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header" style={{ padding: '24px', borderBottom: 'none', cursor: 'pointer' }} onClick={() => setLeaderboardOpen(!leaderboardOpen)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', letterSpacing: 'normal', textTransform: 'none' }}>Leaderboard</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLeaderGraphOpen(!leaderGraphOpen)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '8px', background: leaderGraphOpen ? 'var(--accent)' : 'var(--glass-xs)', border: `1px solid ${leaderGraphOpen ? 'var(--accent)' : 'var(--gb)'}`, color: leaderGraphOpen ? '#fff' : 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              title={leaderGraphOpen ? 'Switch to table view' : 'Switch to graph view'}
            >
              {leaderGraphOpen ? <Table2 size={14} /> : <LineChart size={14} />}
            </button>
            <div className={`admin-dropdown ${leaderFilterDropdown ? 'open' : ''}`} onClick={() => setLeaderFilterDropdown(!leaderFilterDropdown)} ref={leaderFilterDropdownRef}>
              {(() => {
                const active = LEADER_FILTERS.find(f => f.key === leaderFilter);
                return (
                  <>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: active.color, display: 'inline-block', flexShrink: 0 }} />
                    <span>{active.label}</span>
                  </>
                );
              })()}
              <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)', transition: 'transform 0.2s', transform: leaderFilterDropdown ? 'rotate(180deg)' : '' }} />
              {leaderFilterDropdown && (
                <div className="dropdown-popup" style={{ minWidth: '160px' }} onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-list">
                    {LEADER_FILTERS.map(f => (
                      <div
                        key={f.key}
                        className={`dropdown-item ${leaderFilter === f.key ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        onClick={() => { setLeaderFilter(f.key); setLeaderFilterDropdown(false); }}
                        title={f.key === 'all' ? 'Rank by call quality score' : `Rank by ${f.label} lead count`}
                      >
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: f.color, display: 'inline-block', flexShrink: 0 }} />
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <SectionTimeFilter active="ALL" />
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '6px 12px', gap: '8px', width: '160px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." value={aiSearch} onChange={(e) => setAiSearch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '11px', fontWeight: 600, width: '100%' }} />
            </div>
            <button onClick={() => handleExport(
              ['#', 'Agent', 'Calls', 'Hot', 'Warm', 'Cold', ...QUALITY_PARAMS.map(p => p.label), 'Avg'],
              ALL_AI.map((a, i) => [i + 1, a.name, a.leads, a.hot, a.warm, a.cold, ...QUALITY_PARAMS.map(p => AI_SCORES[a.name][p.key].toFixed(1)), getAgentAvgAI(a.name).toFixed(1)]),
              'leaderboard'
            )} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '8px', background: 'var(--glass-xs)', border: '1px solid var(--gb)', color: 'var(--accent)', cursor: 'pointer', transition: 'all 0.2s' }} title="Export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </button>
            <button onClick={() => setLeaderboardOpen(!leaderboardOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '8px', background: 'var(--glass-xs)', border: '1px solid var(--gb)', color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }} title={leaderboardOpen ? 'Collapse' : 'Expand'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', transform: leaderboardOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {leaderboardOpen && leaderGraphOpen && (
          <div style={{ padding: '20px 24px', borderBottom: 'none' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>Monthly Hot / Warm / Cold Trend</div>
              <div className={`admin-dropdown ${leaderGraphDropdown ? 'open' : ''}`} onClick={() => setLeaderGraphDropdown(!leaderGraphDropdown)} ref={leaderGraphDropdownRef}>
                <span>{leaderGraphSelected === 'all' ? 'All Executives' : leaderGraphSelected}</span>
                <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)', transition: 'transform 0.2s', transform: leaderGraphDropdown ? 'rotate(180deg)' : '' }} />
                {leaderGraphDropdown && (
                  <div className="dropdown-popup" onClick={(e) => e.stopPropagation()}>
                    <input
                      className="dropdown-search"
                      type="text"
                      placeholder="Search..."
                      value={leaderGraphSearch}
                      onChange={(e) => setLeaderGraphSearch(e.target.value)}
                      autoFocus
                    />
                    <div className="dropdown-list">
                      <div className={`dropdown-item ${leaderGraphSelected === 'all' ? 'active' : ''}`} onClick={() => { setLeaderGraphSelected('all'); setLeaderGraphDropdown(false); setLeaderGraphSearch(''); }}>
                        All Executives
                      </div>
                      {ALL_AI.filter(p => p.name.toLowerCase().includes(leaderGraphSearch.toLowerCase())).map(p => (
                        <div key={p.name} className={`dropdown-item ${leaderGraphSelected === p.name ? 'active' : ''}`} onClick={() => { setLeaderGraphSelected(p.name); setLeaderGraphDropdown(false); setLeaderGraphSearch(''); }}>
                          {p.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {leaderGraphPerson && <PersonKpiCards person={leaderGraphPerson} />}
            <LeadTrendChart data={leaderGraphData} />
          </div>
        )}
        {leaderboardOpen && !leaderGraphOpen && (
        <>
        {showAllLeaderboard ? (
          <div style={{ padding: '0 24px 24px', overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }} className="no-scrollbar">
            <table className="lb-table" style={{ minWidth: '1200px' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 5 }}>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <SortableTh label="Executive" sortKey="name" sort={leaderSort} onSort={(k) => toggleSort(setLeaderSort, k)} />
                  <SortableTh label="Score" sortKey="avgScore" sort={leaderSort} onSort={(k) => toggleSort(setLeaderSort, k)} />
                  <th style={{ color: leaderFilter === 'hot' ? '#f87171' : undefined }}>Hot</th>
                  <th style={{ color: leaderFilter === 'warm' ? '#fbbf24' : undefined }}>Warm</th>
                  <th style={{ color: leaderFilter === 'cold' ? '#60a5fa' : undefined }}>Cold</th>
                  {QUALITY_PARAMS.map(p => <SortableTh key={p.key} label={p.label} sortKey={p.key} sort={leaderSort} onSort={(k) => toggleSort(setLeaderSort, k)} />)}
                </tr>
              </thead>
              <tbody>
                {sortedLeaderRows.map((agent, i) => {
                  const avgScore = agent.avgScore;
                  const scores = agent.scores;
                  return (
                    <tr key={agent.name} style={{ transition: 'background 0.15s' }}>
                      <td style={{ color: 'var(--muted)', fontWeight: 700 }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: 'var(--bg)', flexShrink: 0 }}>{agent.name[0]}</div>
                          <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '12px' }}>{agent.name}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, background: avgScore >= 3.5 ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: avgScore >= 3.5 ? '#34d399' : '#f87171' }}>
                            {avgScore.toFixed(1)}
                          </span>
                          <StarRating score={avgScore} size={12} color={avgScore >= 3.5 ? '#34d399' : '#f87171'} />
                        </div>
                      </td>
                      <td style={{ fontSize: '11px', fontWeight: 700, color: '#f87171' }}>{agent.hot}</td>
                      <td style={{ fontSize: '11px', fontWeight: 700, color: '#fbbf24' }}>{agent.warm}</td>
                      <td style={{ fontSize: '11px', fontWeight: 700, color: '#60a5fa' }}>{agent.cold}</td>
                      {QUALITY_PARAMS.map(p => (
                        <td key={p.key} style={{ fontSize: '11px', color: 'var(--text)', fontWeight: 600 }}>{scores[p.key].toFixed(1)}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
        <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {leaderTop3.filter(a => a.name.toLowerCase().includes(aiSearch.toLowerCase())).slice(0, 3).map((agent, i) => {
            const scores = AI_SCORES[agent.name];
            const avgScore = getAgentAvgAI(agent.name);
            const ringColor = i === 0 ? '#fbbf24' : i === 1 ? '#8b5cf6' : '#fb923c'; // Gold, Purple, Peach/Orange

            // Circular progress calculations
            const size = 120;
            const stroke = 10;
            const cx = size / 2;
            const cy = size / 2;
            const r = cx - stroke;
            const circumference = r * 2 * Math.PI;
            const strokeDashoffset = circumference - (avgScore / 5) * circumference;

            return (
              <div key={i} style={{ background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {/* Rank Badge */}
                <div style={{ position: 'absolute', top: '24px', left: '24px', width: '26px', height: '26px', background: ringColor, borderRadius: '0 12px 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', fontWeight: 800, fontSize: '14px' }}>
                  {i + 1}
                </div>

                {/* Circular Score */}
                <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <svg height={size} width={size} style={{ transform: 'rotate(-90deg)' }}>
                    <circle stroke={`${ringColor}20`} fill="transparent" strokeWidth={stroke} r={r} cx={cx} cy={cy} />
                    <circle stroke={ringColor} fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }} strokeLinecap="round" r={r} cx={cx} cy={cy} />
                  </svg>
                  <div style={{ position: 'absolute', fontSize: '32px', fontWeight: 900, color: 'var(--text)', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                    {avgScore.toFixed(1)}
                  </div>
                </div>

                {/* Agent Name & Calls */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>{agent.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{agent.leads} calls</div>
                  {leaderFilter !== 'all' && (
                    <div style={{ fontSize: '10px', fontWeight: 700, color: ringColor, marginTop: '4px' }}>
                      {leaderFilter === 'hot' ? '🔥' : leaderFilter === 'warm' ? '🌤️' : '❄️'} {agent[leaderFilter]} {leaderFilter} leads
                    </div>
                  )}
                </div>

                {/* Star Rating */}
                <div style={{ marginTop: '12px', display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= Math.round(avgScore) ? ringColor : 'none'} stroke={star <= Math.round(avgScore) ? ringColor : 'var(--muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>

                {/* Quality Metrics */}
                <div style={{ width: '100%', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(expandedRows[i] ? QUALITY_PARAMS : QUALITY_PARAMS.slice(0, 5)).map((param, index) => {
                    // Replace generic emoji with colored icons based on design
                    const icons = [
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    ];
                    return (
                      <div key={param.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {icons[index % icons.length]}
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)' }}>{param.label}</span>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text)' }}>{scores[param.key].toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Button */}
                <div style={{ width: '100%', marginTop: '24px' }}>
                  <div onClick={() => toggleRow(i)} style={{ background: 'var(--glass-s)', color: 'var(--text)', fontSize: '11px', fontWeight: 700, padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--glass)'} onMouseOut={e => e.currentTarget.style.background = 'var(--glass-s)'}>
                    {expandedRows[i] ? 'Hide Metrics' : `+${QUALITY_PARAMS.length - 5} More Metrics`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
        <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => setShowAllLeaderboard(!showAllLeaderboard)} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '12px 32px', 
              borderRadius: '100px', 
              background: 'rgba(129,140,248,0.1)', 
              border: '1px solid rgba(129,140,248,0.25)', 
              color: '#818cf8', 
              fontSize: '12px', 
              fontWeight: 800, 
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              cursor: 'pointer', 
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }} 
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(129,140,248,0.2)';
              e.currentTarget.style.borderColor = 'rgba(129,140,248,0.4)';
              e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px -6px rgba(129,140,248,0.4)';
            }} 
            onMouseOut={e => {
              e.currentTarget.style.background = 'rgba(129,140,248,0.1)';
              e.currentTarget.style.borderColor = 'rgba(129,140,248,0.25)';
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>{showAllLeaderboard ? 'Collapse to Top 3' : 'View Full Leaderboard'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', transform: showAllLeaderboard ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
        </>
        )}
      </div>

      {/* Executive Performance Table - Above */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header" style={{ cursor: 'pointer' }} onClick={() => setExecPerfOpen(!execPerfOpen)}>
          <div className="glass-title">Executive Performance</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setExecGraphOpen(!execGraphOpen)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: execGraphOpen ? 'var(--accent)' : 'var(--glass-xs)', border: `1px solid ${execGraphOpen ? 'var(--accent)' : 'var(--gb)'}`, color: execGraphOpen ? '#fff' : 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              title={execGraphOpen ? 'Switch to table view' : 'Switch to graph view'}
            >
              {execGraphOpen ? <Table2 size={13} /> : <LineChart size={13} />}
            </button>
            <SectionTimeFilter />
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '5px 10px', gap: '6px', width: '140px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." value={execSearch} onChange={(e) => setExecSearch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '10px', fontWeight: 600, width: '100%' }} />
            </div>
            <button onClick={() => handleExport(
              ['#', 'Executive', 'Calls', 'Avg Score', 'Hot', 'Warm', 'Cold', 'Answered', 'Unanswered', 'Performance'],
              SALES_DATA.map((p, i) => [i + 1, p.name, p.leads, (p.deals / p.leads * 10).toFixed(1), Math.max(1, Math.round(p.leads * 0.02)), Math.round(p.leads * 0.19), Math.floor(p.leads * 0.4), Math.floor(p.leads * 0.75), p.leads - Math.floor(p.leads * 0.75), Math.min((p.deals / p.target) * 100, 100).toFixed(0) + '%']),
              'executive-performance'
            )} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)', color: '#818cf8', cursor: 'pointer' }} title="Export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </button>
            <button onClick={() => setExecPerfOpen(!execPerfOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: 'var(--glass-xs)', border: '1px solid var(--gb)', color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }} title={execPerfOpen ? 'Collapse' : 'Expand'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', transform: execPerfOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
        {execPerfOpen && execGraphOpen && (
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gb)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>Monthly Performance</div>
              <div className={`admin-dropdown ${execGraphDropdown ? 'open' : ''}`} onClick={() => setExecGraphDropdown(!execGraphDropdown)} ref={execGraphDropdownRef}>
                <span>{execGraphSelected === 'all' ? 'All Executives' : execGraphSelected}</span>
                <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)', transition: 'transform 0.2s', transform: execGraphDropdown ? 'rotate(180deg)' : '' }} />
                {execGraphDropdown && (
                  <div className="dropdown-popup" onClick={(e) => e.stopPropagation()}>
                    <input
                      className="dropdown-search"
                      type="text"
                      placeholder="Search..."
                      value={execGraphSearch}
                      onChange={(e) => setExecGraphSearch(e.target.value)}
                      autoFocus
                    />
                    <div className="dropdown-list">
                      <div className={`dropdown-item ${execGraphSelected === 'all' ? 'active' : ''}`} onClick={() => { setExecGraphSelected('all'); setExecGraphDropdown(false); setExecGraphSearch(''); }}>
                        All Executives
                      </div>
                      {SALES_DATA.filter(p => p.name.toLowerCase().includes(execGraphSearch.toLowerCase())).map(p => (
                        <div key={p.name} className={`dropdown-item ${execGraphSelected === p.name ? 'active' : ''}`} onClick={() => { setExecGraphSelected(p.name); setExecGraphDropdown(false); setExecGraphSearch(''); }}>
                          {p.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {execGraphPerson && <PersonKpiCards person={execGraphPerson} />}
            <MonthlyTrendCharts data={execGraphData} />
          </div>
        )}
        {execPerfOpen && !execGraphOpen && (
        <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto', position: 'relative' }} className="no-scrollbar">
          <table className="lb-table" style={{ minWidth: '700px' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 5 }}>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <SortableTh label="Executive" sortKey="name" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Calls" sortKey="calls" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Avg Score" sortKey="avgScore" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Hot" sortKey="hot" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Warm" sortKey="warm" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Cold" sortKey="cold" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Answered" sortKey="answered" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Unanswered" sortKey="unanswered" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
                <SortableTh label="Performance" sortKey="perfPct" sort={execSort} onSort={(k) => toggleSort(setExecSort, k)} />
              </tr>
            </thead>
            <tbody>
              {sortedExecRows.map((person, i) => {
                const avgScore = person.avgScore.toFixed(1);
                const perfPct = person.perfPct;
                const hot = person.hot;
                const warm = person.warm;
                const answered = person.answered;
                const unanswered = person.unanswered;
                const coldTotal = person.coldTotal;
                return (
                  <tr key={i} style={{ transition: 'background 0.15s' }}>
                    <td style={{ color: 'var(--muted)', fontWeight: 700 }}>{i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--bg)', flexShrink: 0 }}>{person.name[0]}</div>
                        <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '13px' }}>{person.name}</span>
                      </div>
                    </td>
                    <td
                      style={{ fontWeight: 700, color: 'var(--text)', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
                      title="View all call records"
                      onClick={() => onNavigateToCallRecords(null)}
                    >
                      {person.leads}
                    </td>
                    <td>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, background: parseFloat(avgScore) >= 1.2 ? 'rgba(52,211,153,0.12)' : parseFloat(avgScore) >= 0.8 ? 'rgba(251,191,36,0.12)' : 'rgba(248,113,113,0.12)', color: parseFloat(avgScore) >= 1.2 ? '#34d399' : parseFloat(avgScore) >= 0.8 ? '#fbbf24' : '#f87171' }}>{avgScore}</span>
                    </td>
                    <td
                      style={{ color: '#f87171', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
                      title="View Hot call records"
                      onClick={() => onNavigateToCallRecords({ type: 'lead', value: 'Hot' })}
                    >
                      {hot}
                    </td>
                    <td
                      style={{ color: '#fbbf24', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
                      title="View Warm call records"
                      onClick={() => onNavigateToCallRecords({ type: 'lead', value: 'Warm' })}
                    >
                      {warm}
                    </td>
                    <td>
                      <span
                        style={{ padding: '2px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, background: 'rgba(96,165,250,0.12)', color: '#60a5fa', cursor: 'pointer' }}
                        title="View Cold call records"
                        onMouseEnter={(e) => {
                          const rect = e.target.getBoundingClientRect();
                          const budget = Math.floor(coldTotal * 0.15);
                          const location = Math.floor(coldTotal * 0.1);
                          const config = Math.floor(coldTotal * 0.5);
                          const received = Math.floor(coldTotal * 0.1);
                          const hangup = Math.floor(coldTotal * 0.05);
                          const notInterested = coldTotal - (budget + location + config + received + hangup);
                          setColdTooltip({
                            x: rect.left,
                            y: rect.top - 10,
                            breakdown: { budget, location, config, received, hangup, notInterested, total: coldTotal }
                          });
                        }}
                        onMouseLeave={() => setColdTooltip(null)}
                        onClick={() => onNavigateToCallRecords({ type: 'lead', value: 'Cold' })}
                      >
                        {coldTotal}
                      </span>
                    </td>
                    <td
                      style={{ color: '#34d399', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
                      title="View Answered call records"
                      onClick={() => onNavigateToCallRecords({ type: 'outcome', value: 'Answered' })}
                    >
                      {answered}
                    </td>
                    <td
                      style={{ color: '#f87171', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
                      title="View Unanswered call records"
                      onClick={() => onNavigateToCallRecords({ type: 'outcome', value: 'Unanswered' })}
                    >
                      {unanswered}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'var(--gb)', overflow: 'hidden' }}>
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
        )}
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'stretch' }}>
        {/* Target vs Achievement */}
        <div className="glass" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="glass-header">
            <div className="glass-title" style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Target vs Achievement</div>
            <SectionTimeFilter />
          </div>
          <div style={{ padding: '16px 20px', maxHeight: '260px', overflowY: 'auto' }} className="thin-scrollbar">
            {SALES_DATA.map((person, i) => {
              const pct = Math.min((person.deals / person.target) * 100, 100);
              const achieved = person.deals >= person.target;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: i < SALES_DATA.length - 1 ? '1px solid var(--gb)' : 'none', position: 'relative', cursor: 'pointer' }} onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: 'var(--bg)', flexShrink: 0 }}>{person.name[0]}</div>
                  <div style={{ width: '70px', fontSize: '12px', fontWeight: 700, color: 'var(--text)', flexShrink: 0 }}>{person.name}</div>
                  <div style={{ flex: 1, position: 'relative', height: '18px', borderRadius: '9px', background: 'var(--glass)', border: '1px solid var(--gb)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: '9px', background: 'linear-gradient(90deg, #06b6d4, #34d399)', transition: 'width 0.8s ease', boxShadow: hoveredBar === i ? '0 0 16px rgba(52,211,153,0.5)' : '0 0 12px rgba(52,211,153,0.3)' }} />
                  </div>
                  <div style={{ width: '90px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: person.color }}>{person.deals}</span>
                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>/</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>{person.target}</span>
                  </div>
                  <div style={{ width: '50px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: person.color }}>
                    {pct.toFixed(0)}%
                  </div>
                  {achieved && <span style={{ fontSize: '12px' }}>✓</span>}
                  {hoveredBar === i && (
                    <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', background: 'var(--glass-xs)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', padding: '8px 14px', whiteSpace: 'nowrap', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text)' }}>{person.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}> — Target: </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>{person.target}</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}> | Achieved: </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399' }}>{person.deals}</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}> | </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: achieved ? '#34d399' : '#fbbf24' }}>{pct.toFixed(0)}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Summary */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--gb)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Total Target: <span style={{ fontWeight: 800, color: 'var(--text)' }}>{TOTAL.target}</span></div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Total Achieved: <span style={{ fontWeight: 800, color: '#34d399' }}>{TOTAL.deals}</span></div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Achievement: <span style={{ fontWeight: 800, color: ((TOTAL.deals / TOTAL.target) * 100) >= 70 ? '#34d399' : '#fbbf24' }}>{((TOTAL.deals / TOTAL.target) * 100).toFixed(1)}%</span></div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(52,211,153,0.1)', color: '#34d399', fontWeight: 700 }}>✓ {SALES_DATA.filter(p => p.deals >= p.target).length} achieved</span>
              <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontWeight: 700 }}>{SALES_DATA.filter(p => p.deals < p.target && (p.deals / p.target) > 0.6).length} near target</span>
              <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(248,113,113,0.1)', color: '#f87171', fontWeight: 700 }}>{SALES_DATA.filter(p => (p.deals / p.target) <= 0.6).length} below target</span>
            </div>
          </div>
        </div>

        {/* Lead Distribution by Person */}
        <div className="glass" style={{ width: '480px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="glass-header">
            <div className="glass-title" style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lead Distribution</div>
            <SectionTimeFilter />
          </div>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '14px' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r="62" fill="transparent" stroke="var(--gb)" strokeWidth="24" />
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
                    <div style={{ fontSize: '8px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>{SALES_DATA[hoveredSlice].name}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text)' }}>{TOTAL.leads}</div>
                    <div style={{ fontSize: '8px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Total</div>
                  </>
                )}
              </div>
              {hoveredSlice !== null && (
                <div style={{ position: 'absolute', top: '-44px', left: '50%', transform: 'translateX(-50%)', background: 'var(--glass-xs)', border: `1px solid ${SALES_DATA[hoveredSlice].color}40`, borderRadius: '8px', padding: '6px 12px', whiteSpace: 'nowrap', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.5)', pointerEvents: 'none' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: SALES_DATA[hoveredSlice].color }}>{SALES_DATA[hoveredSlice].name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}> — </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{SALES_DATA[hoveredSlice].leads} leads</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}> ({((SALES_DATA[hoveredSlice].leads / TOTAL.leads) * 100).toFixed(1)}%)</span>
                </div>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
              {SALES_DATA.slice(0, 8).map((person, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '2px 4px', borderRadius: '4px', transition: 'background 0.15s', background: hoveredSlice === i ? 'rgba(129,140,248,0.08)' : 'transparent' }} onMouseEnter={() => setHoveredSlice(i)} onMouseLeave={() => setHoveredSlice(null)}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '2px', background: person.color }} />
                  <span style={{ fontSize: '9px', color: hoveredSlice === i ? 'var(--text)' : 'var(--muted)', fontWeight: 600, transition: 'color 0.15s' }}>{person.name} ({person.leads})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cold Tooltip - Fixed position */}
      {coldTooltip && (
        <div style={{ position: 'fixed', left: coldTooltip.x, top: coldTooltip.y, transform: 'translate(-30%, -100%)', zIndex: 9999, background: 'var(--glass-xs)', border: '1px solid rgba(96,165,250,0.3)', borderRadius: '10px', padding: '12px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', textAlign: 'left', lineHeight: '2', pointerEvents: 'none', minWidth: '200px' }}>
          <div style={{ fontSize: '10px', color: '#f87171', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Budget Issue</span> <span style={{ color: 'var(--muted)' }}>{coldTooltip.breakdown.budget}</span></div>
          <div style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Location Issue</span> <span style={{ color: 'var(--muted)' }}>{coldTooltip.breakdown.location}</span></div>
          <div style={{ fontSize: '10px', color: '#fb923c', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Configuration Issue</span> <span style={{ color: 'var(--muted)' }}>{coldTooltip.breakdown.config}</span></div>
          <div style={{ fontSize: '10px', color: '#a78bfa', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Received but not responded</span> <span style={{ color: 'var(--muted)' }}>{coldTooltip.breakdown.received}</span></div>
          <div style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Call Hangup</span> <span style={{ color: 'var(--muted)' }}>{coldTooltip.breakdown.hangup}</span></div>
          <div style={{ fontSize: '10px', color: '#e879f9', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Not Interested</span> <span style={{ color: 'var(--muted)' }}>{coldTooltip.breakdown.notInterested}</span></div>
          <div style={{ fontSize: '11px', color: 'var(--text)', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--glass-s)' }}><span>Total</span> <span style={{ color: '#60a5fa' }}>{coldTooltip.breakdown.total}</span></div>
        </div>
      )}
    </div>
    </>
  );
};


// Section Time Filter with Custom popup
const SECTION_TIME_PRESETS = [
  { key: '7D', label: '7 Days' },
  { key: '30D', label: '30 Days' },
  { key: '90D', label: '90 Days' },
  { key: 'YTD', label: 'FY' },
  { key: 'ALL', label: 'All Time' },
];

const DateFieldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);

const SectionTimeFilter = () => {
  const [active, setActive] = React.useState('ALL');
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const activeLabel = active === 'CUSTOM'
    ? (startDate && endDate ? `${startDate} - ${endDate}` : 'Custom Range')
    : (SECTION_TIME_PRESETS.find(p => p.key === active)?.label || 'Select Time Range');

  return (
    <div className={`admin-dropdown ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} ref={ref} style={{ minWidth: '140px', justifyContent: 'space-between' }}>
      <span>{activeLabel}</span>
      <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : '' }} />
      {open && (
        <div className="dropdown-popup" style={{ minWidth: '300px' }} onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-list" style={{ maxHeight: 'none' }}>
            {SECTION_TIME_PRESETS.map(p => (
              <div key={p.key} className={`dropdown-item ${active === p.key ? 'active' : ''}`} onClick={() => { setActive(p.key); setOpen(false); }}>
                {p.label}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--gb)', marginTop: '6px', paddingTop: '10px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Custom Range</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '7px', padding: '7px 10px', gap: '6px' }}>
                <input type="text" placeholder="Dd-mm-yyyy" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '11px', fontWeight: 600, width: '100%' }} />
                <DateFieldIcon />
              </div>
              <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700 }}>TO</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '7px', padding: '7px 10px', gap: '6px' }}>
                <input type="text" placeholder="Dd-mm-yyyy" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '11px', fontWeight: 600, width: '100%' }} />
                <DateFieldIcon />
              </div>
            </div>
            <button onClick={() => { setActive('CUSTOM'); setOpen(false); }} style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '7px', background: 'linear-gradient(135deg, #818cf8, #6366f1)', border: 'none', color: '#fff', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Star Rating component
const StarRating = ({ score, maxStars = 5, size = 14, color = '#fbbf24' }) => {
  const fullStars = Math.floor(score);
  const partial = score - fullStars;
  const emptyStars = maxStars - fullStars - (partial > 0 ? 1 : 0);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg key={`full-${i}`} width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="0.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      {partial > 0 && (
        <svg key="partial" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="0.5">
          <defs>
            <clipPath id={`clip-${score}-${size}`}>
              <rect x="0" y="0" width={partial * 24} height="24" />
            </clipPath>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color} clipPath={`url(#clip-${score}-${size})`} />
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke={color} strokeWidth="0.5" />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--glass)" strokeWidth="1">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
};

// Sub components
const KpiCard = ({ label, value, color }) => (
  <div style={{ background: '#1a2030', border: '1px solid var(--gb)', borderRadius: '14px', padding: '20px 16px', textAlign: 'center' }}>
    <div style={{ fontSize: '26px', fontWeight: 800, fontStyle: 'italic', color, letterSpacing: '-0.5px' }}>{value}</div>
    <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>{label}</div>
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
          <circle cx="45" cy="45" r={r} fill="transparent" stroke="var(--gb)" strokeWidth="8" />
          <circle cx="45" cy="45" r={r} fill="transparent" stroke={color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '16px', fontWeight: 800, color }}>{value}%</span>
        </div>
      </div>
      <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--muted)', textAlign: 'center' }}>{label}</div>
    </div>
  );
};

// Main Time Filter
const MainTimeFilter = () => {
  const [active, setActive] = React.useState('fy');
  const [showCustom, setShowCustom] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!showCustom) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCustom(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCustom]);

  const options = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: 'fy', label: 'FY', badge: '4520' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a2030', border: '1px solid var(--gb)', borderRadius: '14px', padding: '12px 20px', marginBottom: '24px' }}>
      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TIME RANGE</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} ref={ref}>
        {options.map(opt => (
          <div
            key={opt.id}
            onClick={() => { setActive(opt.id); setShowCustom(false); }}
            style={{
              position: 'relative',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: active === opt.id ? 'var(--text)' : 'var(--muted)',
              background: active === opt.id ? 'rgba(129,140,248,0.15)' : 'transparent',
              border: active === opt.id ? '1px solid rgba(129,140,248,0.3)' : '1px solid transparent',
            }}
          >
            {opt.label}
            {opt.badge && (
              <div style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#6366f1', color: 'var(--text)', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '10px', border: '2px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {opt.badge}
              </div>
            )}
          </div>
        ))}
        <div style={{ position: 'relative' }}>
          <div
            onClick={(e) => { e.stopPropagation(); setShowCustom(!showCustom); setActive('custom'); }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: (active === 'custom' || showCustom) ? 'var(--text)' : 'var(--muted)',
              background: (active === 'custom' || showCustom) ? 'rgba(129,140,248,0.15)' : 'transparent',
              border: (active === 'custom' || showCustom) ? '1px solid rgba(129,140,248,0.3)' : '1px solid transparent',
            }}
          >
            Custom
          </div>
          {showCustom && (
            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: 'var(--popup-bg)', border: '1px solid var(--glass-s)', borderRadius: '12px', padding: '16px 20px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', minWidth: '340px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>Start Date</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '8px 12px', gap: '8px' }}>
                    <input type="text" placeholder="DD/MM/YYYY" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>End Date</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '8px 12px', gap: '8px' }}>
                    <input type="text" placeholder="DD/MM/YYYY" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                </div>
                <button onClick={() => setShowCustom(false)} style={{ padding: '9px 18px', borderRadius: '8px', background: 'linear-gradient(135deg, #818cf8, #6366f1)', border: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Apply</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreSalesDashboard;
