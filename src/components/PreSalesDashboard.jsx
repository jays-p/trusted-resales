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

// Top AI scores
const ALL_AI = [...SALES_DATA]
  .filter(a => AI_SCORES[a.name])
  .sort((a, b) => getAgentAvgAI(b.name) - getAgentAvgAI(a.name));

const TOP3_AI = ALL_AI.slice(0, 3);

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
  const [execSearch, setExecSearch] = React.useState('');
  const [aiSearch, setAiSearch] = React.useState('');
  const [coldTooltip, setColdTooltip] = React.useState(null);
  const [expandedRows, setExpandedRows] = React.useState({});
  const [showAllLeaderboard, setShowAllLeaderboard] = React.useState(false);

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

      {/* Main Time Filter */}
      <MainTimeFilter />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <KpiCard label="Calls" value="2,189" color="#ffffff" />
        <KpiCard label="Goals Met" value={455} color="#34d399" />
        <KpiCard label="Hot" value={44} color="#f87171" />
        <KpiCard label="Warm" value={411} color="#fbbf24" />
        <KpiCard label="Cold" value={889} color="#60a5fa" />
      </div>

      {/* 🏆 Top Performers & Lead Distribution - Grid Layout */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header" style={{ padding: '24px', borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🏆</span>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', letterSpacing: 'normal', textTransform: 'none' }}>Leaderboard</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, marginTop: '4px' }}>Overall call quality score</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setShowAllLeaderboard(!showAllLeaderboard)} style={{ padding: '6px 12px', borderRadius: '8px', background: showAllLeaderboard ? 'rgba(129,140,248,0.1)' : 'var(--glass-xs)', border: '1px solid var(--gb)', color: showAllLeaderboard ? '#818cf8' : 'var(--text)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
              {showAllLeaderboard ? 'Show Top 3' : 'View All'}
            </button>
            <SectionTimeFilter active="ALL" />
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass-xs)', border: '1px solid var(--gb)', borderRadius: '8px', padding: '6px 12px', gap: '8px', width: '160px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search agent..." value={aiSearch} onChange={(e) => setAiSearch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '11px', fontWeight: 600, width: '100%' }} />
            </div>
            <button onClick={() => handleExport(
              ['#', 'Agent', 'Calls', ...QUALITY_PARAMS.map(p => p.label), 'Avg'],
              ALL_AI.map((a, i) => [i + 1, a.name, a.leads, ...QUALITY_PARAMS.map(p => AI_SCORES[a.name][p.key].toFixed(1)), getAgentAvgAI(a.name).toFixed(1)]),
              'leaderboard'
            )} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '8px', background: 'var(--glass-xs)', border: '1px solid var(--gb)', color: 'var(--accent)', cursor: 'pointer', transition: 'all 0.2s' }} title="Export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </button>
          </div>
        </div>

        {showAllLeaderboard ? (
          <div style={{ padding: '0 24px 24px', overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }} className="no-scrollbar">
            <table className="lb-table" style={{ minWidth: '1200px' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#1a2030', zIndex: 5 }}>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Executive</th>
                  <th>Score</th>
                  {QUALITY_PARAMS.map(p => <th key={p.key}>{p.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {ALL_AI.filter(a => a.name.toLowerCase().includes(aiSearch.toLowerCase())).map((agent, i) => {
                  const avgScore = getAgentAvgAI(agent.name);
                  const scores = AI_SCORES[agent.name];
                  return (
                    <tr key={agent.name} style={{ transition: 'background 0.15s' }}>
                      <td style={{ color: '#64748b', fontWeight: 700 }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#0d1117', flexShrink: 0 }}>{agent.name[0]}</div>
                          <span style={{ fontWeight: 700, color: '#fff', fontSize: '12px' }}>{agent.name}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>
                          {avgScore.toFixed(1)}
                        </span>
                      </td>
                      {QUALITY_PARAMS.map(p => (
                        <td key={p.key} style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: 600 }}>{scores[p.key].toFixed(1)}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
        <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {TOP3_AI.filter(a => a.name.toLowerCase().includes(aiSearch.toLowerCase())).slice(0, 3).map((agent, i) => {
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
                <div style={{ position: 'absolute', top: '24px', left: '24px', width: '26px', height: '26px', background: ringColor, borderRadius: '0 12px 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
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
      </div>

      {/* Executive Performance Table - Above */}
      <div className="glass" style={{ marginBottom: '20px' }}>
        <div className="glass-header">
          <div className="glass-title">Executive Performance</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SectionTimeFilter />
            <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '5px 10px', gap: '6px', width: '140px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." value={execSearch} onChange={(e) => setExecSearch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '10px', fontWeight: 600, width: '100%' }} />
            </div>
            <button onClick={() => handleExport(
              ['#', 'Executive', 'Calls', 'Avg Score', 'Site Visit', 'EOI', 'Follow-up', 'Cold', 'Answered', 'Unanswered', 'Performance'],
              SALES_DATA.map((p, i) => [i + 1, p.name, p.leads, (p.deals / p.leads * 10).toFixed(1), p.deals, Math.floor(p.interested * 0.6), Math.floor(p.leads * 0.2), Math.floor(p.leads * 0.4), Math.floor(p.leads * 0.75), p.leads - Math.floor(p.leads * 0.75), Math.min((p.deals / p.target) * 100, 100).toFixed(0) + '%']),
              'executive-performance'
            )} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)', color: '#818cf8', cursor: 'pointer' }} title="Export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </button>
          </div>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto', position: 'relative' }} className="no-scrollbar">
          <table className="lb-table" style={{ minWidth: '700px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#1a2030', zIndex: 5 }}>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Executive</th>
                <th>Calls</th>
                <th>Avg Score</th>
                <th>Site Visit</th>
                <th>EOI</th>
                <th>Follow-up</th>
                <th>Cold</th>
                <th>Answered</th>
                <th>Unanswered</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {SALES_DATA.filter(p => p.name.toLowerCase().includes(execSearch.toLowerCase())).map((person, i) => {
                const avgScore = (person.deals / person.leads * 10).toFixed(1);
                const followUp = Math.floor(person.leads * 0.2);
                const flagged = Math.max(0, Math.floor(person.leads * 0.05));
                const perfPct = Math.min((person.deals / person.target) * 100, 100);
                const eoi = Math.floor(person.interested * 0.6);
                const answered = Math.floor(person.leads * 0.75);
                const unanswered = person.leads - answered;
                const coldTotal = Math.floor(person.leads * 0.4);
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
                    <td style={{ color: '#34d399', fontWeight: 700 }}>{person.deals}</td>
                    <td style={{ color: '#06b6d4', fontWeight: 700 }}>{eoi}</td>
                    <td style={{ color: '#94a3b8' }}>{followUp}</td>
                    <td>
                      <span
                        style={{ padding: '2px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, background: 'rgba(96,165,250,0.12)', color: '#60a5fa', cursor: 'pointer' }}
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
                      >
                        {coldTotal}
                      </span>
                    </td>
                    <td style={{ color: '#34d399', fontWeight: 700 }}>{answered}</td>
                    <td style={{ color: '#f87171', fontWeight: 700 }}>{unanswered}</td>
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

      {/* Bottom Row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'stretch' }}>
        {/* Target vs Achievement */}
        <div className="glass" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="glass-header">
            <div className="glass-title" style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Target vs Achievement</div>
            <SectionTimeFilter />
          </div>
          <div style={{ padding: '16px 20px', maxHeight: '260px', overflowY: 'auto' }} className="no-scrollbar">
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

      {/* Cold Tooltip - Fixed position */}
      {coldTooltip && (
        <div style={{ position: 'fixed', left: coldTooltip.x, top: coldTooltip.y, transform: 'translate(-30%, -100%)', zIndex: 9999, background: '#0f172a', border: '1px solid rgba(96,165,250,0.3)', borderRadius: '10px', padding: '12px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', textAlign: 'left', lineHeight: '2', pointerEvents: 'none', minWidth: '200px' }}>
          <div style={{ fontSize: '10px', color: '#f87171', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Budget Issue</span> <span style={{ color: '#94a3b8' }}>{coldTooltip.breakdown.budget}</span></div>
          <div style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Location Issue</span> <span style={{ color: '#94a3b8' }}>{coldTooltip.breakdown.location}</span></div>
          <div style={{ fontSize: '10px', color: '#fb923c', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Configuration Issue</span> <span style={{ color: '#94a3b8' }}>{coldTooltip.breakdown.config}</span></div>
          <div style={{ fontSize: '10px', color: '#a78bfa', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Received but not responded</span> <span style={{ color: '#94a3b8' }}>{coldTooltip.breakdown.received}</span></div>
          <div style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Call Hangup</span> <span style={{ color: '#94a3b8' }}>{coldTooltip.breakdown.hangup}</span></div>
          <div style={{ fontSize: '10px', color: '#e879f9', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}><span>Not Interested</span> <span style={{ color: '#94a3b8' }}>{coldTooltip.breakdown.notInterested}</span></div>
          <div style={{ fontSize: '11px', color: '#fff', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)' }}><span>Total</span> <span style={{ color: '#60a5fa' }}>{coldTooltip.breakdown.total}</span></div>
        </div>
      )}
    </div>
  );
};


// Section Time Filter with Custom popup
const SectionTimeFilter = () => {
  const [active, setActive] = React.useState('ALL');
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

  const labels = { '7D': '7D', '30D': '30D', '90D': '90D', 'YTD': 'FY', 'ALL': 'ALL' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }} ref={ref}>
      {Object.entries(labels).map(([key, label]) => (
        <div key={key} onClick={() => { setActive(key); setShowCustom(false); }} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: active === key ? '#fff' : '#64748b', background: active === key ? '#3b82f6' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>{label}</div>
      ))}
      <div onClick={(e) => { e.stopPropagation(); setShowCustom(!showCustom); setActive(''); }} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: showCustom ? '#fff' : '#64748b', background: showCustom ? '#3b82f6' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>Custom</div>
      {showCustom && (
        <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: '#151c2c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 18px', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', minWidth: '340px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px', display: 'block' }}>Start Date</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '7px', padding: '7px 10px', gap: '6px' }}>
                <input type="text" placeholder="DD/MM/YYYY" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '11px', fontWeight: 600, width: '100%' }} />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px', display: 'block' }}>End Date</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '7px', padding: '7px 10px', gap: '6px' }}>
                <input type="text" placeholder="DD/MM/YYYY" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '11px', fontWeight: 600, width: '100%' }} />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
            </div>
            <button onClick={() => setShowCustom(false)} style={{ padding: '8px 16px', borderRadius: '7px', background: 'linear-gradient(135deg, #818cf8, #6366f1)', border: 'none', color: '#fff', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Apply</button>
          </div>
        </div>
      )}
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a2030', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px 20px', marginBottom: '24px' }}>
      <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TIME RANGE</div>
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
              color: active === opt.id ? '#fff' : '#94a3b8',
              background: active === opt.id ? 'rgba(129,140,248,0.15)' : 'transparent',
              border: active === opt.id ? '1px solid rgba(129,140,248,0.3)' : '1px solid transparent',
            }}
          >
            {opt.label}
            {opt.badge && (
              <div style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#6366f1', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '10px', border: '2px solid #1a2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              color: (active === 'custom' || showCustom) ? '#fff' : '#94a3b8',
              background: (active === 'custom' || showCustom) ? 'rgba(129,140,248,0.15)' : 'transparent',
              border: (active === 'custom' || showCustom) ? '1px solid rgba(129,140,248,0.3)' : '1px solid transparent',
            }}
          >
            Custom
          </div>
          {showCustom && (
            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: '#151c2c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 20px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', minWidth: '340px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>Start Date</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 12px', gap: '8px' }}>
                    <input type="text" placeholder="DD/MM/YYYY" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '12px', fontWeight: 600, width: '100%' }} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>End Date</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 12px', gap: '8px' }}>
                    <input type="text" placeholder="DD/MM/YYYY" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '12px', fontWeight: 600, width: '100%' }} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                </div>
                <button onClick={() => setShowCustom(false)} style={{ padding: '9px 18px', borderRadius: '8px', background: 'linear-gradient(135deg, #818cf8, #6366f1)', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Apply</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreSalesDashboard;
