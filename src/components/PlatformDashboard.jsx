import React, { useState } from 'react';
import { Settings2, ChevronDown, Calendar } from 'lucide-react';
import Sidebar from './Sidebar';
import CallsChart from './CallsChart';
import PreSalesDashboard from './PreSalesDashboard';
import { DevelopersPage, ChannelPartnersPage, ProjectsPage, SegmentsPage, CampaignsPage, CallLogsPage, TransactionsPage } from './StaticPages';
import { AllCallRecordsPage, StrategicMatrixPage, FlaggedReportsPage, TrustedTransactionsPage } from './TrustedPages';
import './PlatformDashboard.css';

// Static data matching screenshots
const STATIC_DATA = {
  overview: {
    totalCalls: 2189,
    avgDur: '2m 10s',
    totalTalkTime: '850 min',
    siteVisitSuccess: '2.8%',
    avgConfidence: '84.5%',
    prevDelta: '-34.3% vs prev'
  },
  counts: { '1D': 28, 'YESTERDAY': 31, '7D': 198, '30D': 859, '90D': 2410, 'YTD': 4520, 'ALL': 2185 },
  ticker: {
    calls: 2189,
    goalsMet: 455,
    hot: 44,
    warm: 411,
    cold: 889
  },
  lineChart: [
    { label: 'Jun 11', value: 9 },
    { label: 'Jun 14', value: 30 },
    { label: 'Jun 17', value: 179 },
    { label: 'Jun 20', value: 152 },
    { label: 'Jun 25', value: 141 },
    { label: 'Jun 30', value: 135 },
    { label: 'Jul 5', value: 90 },
    { label: 'Jul 10', value: 50 },
    { label: 'Jul 14', value: 325 },
    { label: 'Jul 16', value: 177 },
    { label: 'Jul 18', value: 130 },
    { label: 'Jul 21', value: 177 },
    { label: 'Jul 24', value: 155 },
  ],
  funnel: [
    { label: 'Total Calls', value: 2189, pct: 100, color: '#34d399' },
    { label: 'Interested', value: 455, pct: 20.8, color: '#818cf8' },
    { label: 'Site Visit Booked', value: 26, pct: 1.2, color: '#34d399' },
  ],
  comparison: {
    dateRange: '31 Mar 2026 - 25 Jul 2026',
    prevRange: '',
    calls: { val: '2,189', last: 'Vs 0', delta: '↑ 100%', positive: true },
    goals: { val: 282, last: 'Vs 0', delta: '↑ 100%', positive: true },
    hot: { val: 44, last: 'Vs 0', delta: '↑ 100%', positive: true },
    confidence: { val: '89.9%', last: 'Vs 0%', delta: '↑ 100%', positive: true },
  },
  leadTemperature: [
    { label: 'Hot', sub: 'Highly interested leads', value: 44, pct: 2.0, color: '#f87171' },
    { label: 'Warm', sub: 'Moderately interested', value: 411, pct: 18.8, color: '#fbbf24' },
    { label: 'Cold', sub: 'Low interest / not engaged', value: 889, pct: 40.6, color: '#60a5fa' },
  ],
  durationByTemperature: {
    Hot: [
      { label: 'Very Short', sub: '0 - 15 sec', value: 17, pct: 39, color: '#f87171' },
      { label: 'Short', sub: '16 - 30 sec', value: 9, pct: 20, color: '#fbbf24' },
      { label: 'Medium', sub: '30 sec - 1 min', value: 9, pct: 20, color: '#818cf8' },
      { label: 'Long', sub: '> 1 minute', value: 9, pct: 21, color: '#34d399' },
    ],
    Warm: [
      { label: 'Very Short', sub: '0 - 15 sec', value: 160, pct: 39, color: '#f87171' },
      { label: 'Short', sub: '16 - 30 sec', value: 82, pct: 20, color: '#fbbf24' },
      { label: 'Medium', sub: '30 sec - 1 min', value: 82, pct: 20, color: '#818cf8' },
      { label: 'Long', sub: '> 1 minute', value: 87, pct: 21, color: '#34d399' },
    ],
    Cold: [
      { label: 'Very Short', sub: '0 - 15 sec', value: 347, pct: 39, color: '#f87171' },
      { label: 'Short', sub: '16 - 30 sec', value: 178, pct: 20, color: '#fbbf24' },
      { label: 'Medium', sub: '30 sec - 1 min', value: 178, pct: 20, color: '#818cf8' },
      { label: 'Long', sub: '> 1 minute', value: 186, pct: 21, color: '#34d399' },
    ],
  },
  projectPerformance: [
    { rank: 1, project: 'M3m', calls: 561, hot: 7, warm: 78, cold: 144, svSchedule: 0, svConverted: '0 (0.00)' },
    { rank: 2, project: 'Smartworld Sky Arc', calls: 96, hot: 0, warm: 9, cold: 9, svSchedule: 0, svConverted: '0 (0.00)' },
    { rank: 3, project: 'Smartworld One Dxp', calls: 41, hot: 0, warm: 3, cold: 6, svSchedule: 0, svConverted: '0 (0.00)' },
    { rank: 4, project: 'Smartworld The Edition', calls: 28, hot: 0, warm: 1, cold: 3, svSchedule: 0, svConverted: '0 (0.00)' },
    { rank: 5, project: 'Smartworld Nature\'s Court At Gic', calls: 22, hot: 0, warm: 0, cold: 0, svSchedule: 0, svConverted: '0 (0.00)' },
  ],
  creditConsumption: [
    { rank: 1, project: 'ABC Tower 1', totalTopup: '₹25,000', available: '₹20,588', totalUsed: '₹4,412' },
    { rank: 2, project: 'M3m', totalTopup: '₹41,421', available: '₹39,849', totalUsed: '₹1,572' },
    { rank: 3, project: 'DTC Downtown', totalTopup: '₹3,000', available: '₹2,871', totalUsed: '₹129' },
    { rank: 4, project: 'Smartworld Sky Arc', totalTopup: '₹9,99,631', available: '₹9,99,571', totalUsed: '₹60' },
    { rank: 5, project: 'Smartworld One Dxp', totalTopup: '₹9,98,419', available: '₹9,98,380', totalUsed: '₹39' },
  ],
  heatmap: {
    projects: ['DTC Downtown, DTC Still Waters, And DTC Capital City', 'BPTP Smartworld Pride', 'Smartworld Orchard', 'DTC Downtown & Capital City', 'World Home Purv'],
    goals: ['Present Pricing', 'Qualify Interest', 'Schedule Visit'],
    data: [
      [0, 0, 0, 0, 0],
      ['100%', '100%', '100%', '100%', '100%'],
      ['100%', '100%', '100%', '100%', '100%'],
    ]
  },
  recentCalls: [
    { project: 'SFDC_00Tfw0000ecqAZEAY', status: 'QUEUED', rating: '—', duration: '—', totalUsed: '—', date: '24 Jul 26 03:52 PM' },
    { project: 'SFDC_00Tfw0000ed3alEAA', status: 'QUEUED', rating: '—', duration: '—', totalUsed: '—', date: '24 Jul 26 03:52 PM' },
    { project: 'SFDC_00TOX00000x8wfV2A0', status: 'QUEUED', rating: '—', duration: '—', totalUsed: '—', date: '24 Jul 26 03:52 PM' },
  ],
  developers: [
    'Smartworld',
    'M3m Developer',
    'DTC Group',
    'BPTP Ltd',
    'Godrej Properties',
    'Raheja Developers',
    'Emaar India',
  ],
  projects: [
    'Smartworld Sky Arc',
    'Smartworld One Dxp',
    'Smartworld The Edition',
    'Smartworld Nature\'s Court At Gic',
    'M3m Crown',
    'M3m Antalya Hills',
    'DTC Downtown',
    'DTC Capital City',
    'DTC Still Waters',
    'BPTP Smartworld Pride',
    'World Home Purv',
    'ABC Tower 1',
  ]
};

const PlatformDashboard = () => {
  const [timeRange, setTimeRange] = useState('YTD');
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [devDropdown, setDevDropdown] = useState(false);
  const [projDropdown, setProjDropdown] = useState(false);
  const [devSearch, setDevSearch] = useState('');
  const [projSearch, setProjSearch] = useState('');
  const [selectedDev, setSelectedDev] = useState('Enterprise View (All Developers)');
  const [selectedProj, setSelectedProj] = useState('All Projects');
  const [activePage, setActivePage] = useState('dashboard');
  const [projPerfSearch, setProjPerfSearch] = useState('');
  const [creditSearch, setCreditSearch] = useState('');
  const [recentCallsSearch, setRecentCallsSearch] = useState('');
  const [expandedTemp, setExpandedTemp] = useState(null);
  const [callRecordsFilter, setCallRecordsFilter] = useState(null);
  const data = STATIC_DATA;

  const goToCallRecords = (filter) => {
    setCallRecordsFilter(filter);
    setActivePage('all-call-records');
  };

  const timeLabels = {
    '1D': 'Today',
    'YESTERDAY': 'Yesterday',
    '7D': '7 Days',
    '30D': '30 Days',
    '90D': '90 Days',
    'YTD': 'FY',
    'ALL': 'All Time',
  };

  const handleTimeChange = (range) => {
    setTimeRange(range);
    setShowCustomPopup(false);
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

  const staticPages = {
    developers: DevelopersPage,
    'channel-partners': ChannelPartnersPage,
    projects: ProjectsPage,
    segments: SegmentsPage,
    campaigns: CampaignsPage,
    'call-logs': CallLogsPage,
    transactions: TransactionsPage,
    'all-call-records': AllCallRecordsPage,
    'strategic-matrix': StrategicMatrixPage,
    'flagged-reports': FlaggedReportsPage,
    'trusted-transactions': TrustedTransactionsPage,
  };
  const StaticPage = staticPages[activePage];

  return (
    <div className="platform-dashboard-container">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'presales' ? (
        <PreSalesDashboard onBack={() => setActivePage('dashboard')} onNavigateToCallRecords={goToCallRecords} />
      ) : StaticPage ? (
        <StaticPage initialFilter={activePage === 'all-call-records' ? callRecordsFilter : undefined} />
      ) : (
      <div className="main-content no-scrollbar">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <div>
              <h2>Dashboard</h2>
              <p>Enterprise-Wide Platform Analytics</p>
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
                    {data.developers.filter(d => d.toLowerCase().includes(devSearch.toLowerCase())).map((dev, i) => (
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
                    {data.projects.filter(p => p.toLowerCase().includes(projSearch.toLowerCase())).map((proj, i) => (
                      <div key={i} className={`dropdown-item ${selectedProj === proj ? 'active' : ''}`} onClick={() => { setSelectedProj(proj); setProjDropdown(false); setProjSearch(''); }}>
                        {proj}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time Range Bar */}
        <div className="global-time-bar">
          <span className="global-time-label">Time Range</span>
          <div className="time-presets" style={{ marginLeft: 'auto' }}>
            {Object.entries(timeLabels).map(([key, label]) => (
              <div
                key={key}
                className={`time-preset ${timeRange === key ? 'active' : ''}`}
                onClick={() => handleTimeChange(key)}
              >
                {label}
                {data.counts[key] && timeRange === key && (
                  <span className="preset-badge">{data.counts[key]}</span>
                )}
              </div>
            ))}
            <div
              className={`time-preset ${showCustomPopup ? 'active' : ''}`}
              onClick={() => setShowCustomPopup(!showCustomPopup)}
              style={{ position: 'relative' }}
            >
              Custom
            </div>
          </div>
          {/* Custom Date Popup */}
          {showCustomPopup && (
            <div className="custom-date-popup">
              <div className="custom-date-row">
                <div className="custom-date-field">
                  <label>Start Date</label>
                  <div className="custom-date-input">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
                  </div>
                </div>
                <div className="custom-date-field">
                  <label>End Date</label>
                  <div className="custom-date-input">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
                  </div>
                </div>
                <button className="custom-date-apply" onClick={() => setShowCustomPopup(false)}>Apply</button>
              </div>
            </div>
          )}
        </div>

        {/* Ticker Summary */}
        <div className="ticker">
          <span className="ticker-label">● FY</span>
          <div className="tick-item">
            <span className="tick-val" style={{ color: '#ffffff', fontWeight: 900 }}>{data.ticker.calls.toLocaleString()}</span>
            <span className="tick-name">Calls</span>
          </div>
          <div className="tick-item">
            <span className="tick-val" style={{ color: '#34d399', fontWeight: 900 }}>{data.ticker.goalsMet}</span>
            <span className="tick-name">Goals Met</span>
          </div>
          <div className="tick-item">
            <span className="tick-val" style={{ color: '#f87171', fontWeight: 900 }}>{data.ticker.hot}</span>
            <span className="tick-name">Hot</span>
          </div>
          <div className="tick-item">
            <span className="tick-val" style={{ color: '#fbbf24', fontWeight: 900 }}>{data.ticker.warm}</span>
            <span className="tick-name">Warm</span>
          </div>
          <div className="tick-item">
            <span className="tick-val" style={{ color: '#60a5fa', fontWeight: 900 }}>{data.ticker.cold}</span>
            <span className="tick-name">Cold</span>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="overview">
          <div className="ov-card">
            <div className="ov-val" style={{ color: '#818cf8' }}>{data.overview.totalCalls.toLocaleString()}</div>
            <div className="ov-label">Total Calls</div>
            <div className="ov-sub" style={{ color: data.overview.prevDelta.startsWith('+') ? '#34d399' : '#f87171' }}>{data.overview.prevDelta}</div>
          </div>
          <div className="ov-card">
            <div className="ov-val" style={{ color: '#34d399' }}>{data.overview.avgDur}</div>
            <div className="ov-label">Avg Duration</div>
          </div>
          <div className="ov-card">
            <div className="ov-val" style={{ color: '#06b6d4' }}>{data.overview.totalTalkTime}</div>
            <div className="ov-label">Total Talk Time</div>
          </div>
          <div className="ov-card">
            <div className="ov-val" style={{ color: '#34d399' }}>{data.overview.siteVisitSuccess}</div>
            <div className="ov-label">Site Visit Success</div>
            <div className="ov-sub" style={{ color: 'var(--muted)' }}>Conversion Rate</div>
          </div>
          <div className="ov-card">
            <div className="ov-val" style={{ color: '#a78bfa' }}>{data.overview.avgConfidence}</div>
            <div className="ov-label">Avg Confidence</div>
            <div className="ov-sub" style={{ color: 'var(--muted)' }}>Word-level ASR</div>
          </div>
        </div>

        {/* Charts Row - Calls Over Time + Lead Conversion */}
        <div className="g2" style={{ marginBottom: '20px' }}>
          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Calls Over Time</div>
              <SectionFilter active="ALL" />
            </div>
            <div className="chart-area">
              <CallsChart data={data.lineChart} />
            </div>
          </div>

          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Lead Conversion Rate</div>
              <SectionFilter active="ALL" />
            </div>
            <div className="glass-body">
              {data.funnel.map((step, i) => (
                <div key={i} className="funnel-step">
                  <div className="funnel-num">{step.value.toLocaleString()}</div>
                  <div className="funnel-label">{step.label}</div>
                  <div className="funnel-bar-wrap">
                    <div className="funnel-bar" style={{ width: `${step.pct}%`, background: step.color }} />
                  </div>
                  <div className="funnel-pct">{step.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison + Call Duration Distribution */}
        <div className="g2" style={{ marginBottom: '20px' }}>
          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Comparison</div>
              <SectionFilter active="30D" excludeAll={true} />
            </div>
            <div style={{ padding: '12px 18px' }}>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '12px', fontWeight: 600 }}>
                {data.comparison.dateRange}
              </div>
              <div className="wk-grid">
                <WkCard label="Calls" val={data.comparison.calls.val} last={data.comparison.calls.last} delta={data.comparison.calls.delta} positive={data.comparison.calls.positive} />
                <WkCard label="Goals" val={data.comparison.goals.val} last={data.comparison.goals.last} delta={data.comparison.goals.delta} positive={data.comparison.goals.positive} />
                <WkCard label="Hot Leads" val={data.comparison.hot.val} last={data.comparison.hot.last} delta={data.comparison.hot.delta} positive={data.comparison.hot.positive} />
                <WkCard label="Confidence" val={data.comparison.confidence.val} last={data.comparison.confidence.last} delta={data.comparison.confidence.delta} positive={data.comparison.confidence.positive} />
              </div>
            </div>
          </div>

          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Lead Temperature Distribution</div>
            </div>
            <div className="glass-body">
              {(() => {
                const items = data.leadTemperature;
                return items.map((item, i) => {
                  const isExpanded = expandedTemp === item.label;
                  return (
                    <React.Fragment key={i}>
                      <div
                        onClick={() => setExpandedTemp(isExpanded ? null : item.label)}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: (!isExpanded && i < items.length - 1) ? '1px solid rgba(255,255,255,0.03)' : 'none', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '170px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>{item.label}</div>
                            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{item.sub}</div>
                          </div>
                        </div>
                        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                          <div style={{ width: `${item.pct}%`, height: '100%', borderRadius: '4px', background: item.color, transition: 'width 0.8s ease' }} />
                        </div>
                        <div style={{ width: '70px', textAlign: 'right' }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 800, color: 'var(--text)' }}>{item.value}</span>
                          <span style={{ fontSize: '10px', color: 'var(--muted)', marginLeft: '4px' }}>{item.pct}%</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', cursor: 'pointer', display: 'inline-block', transition: 'transform 0.15s ease', transform: isExpanded ? 'rotate(90deg)' : 'none' }}>→</span>
                      </div>
                      {isExpanded && (
                        <div style={{ padding: '2px 0 14px 24px', borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                          {data.durationByTemperature[item.label].map((sub, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '150px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: sub.color }} />
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--dim)' }}>{sub.label}</span>
                              </div>
                              <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                                <div style={{ width: `${sub.pct}%`, height: '100%', borderRadius: '3px', background: sub.color }} />
                              </div>
                              <div style={{ width: '60px', textAlign: 'right' }}>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{sub.value}</span>
                                <span style={{ fontSize: '9px', color: 'var(--muted)', marginLeft: '3px' }}>{sub.pct}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {/* Project Performance + Credit Consumption */}
        <div className="g2" style={{ marginBottom: '20px' }}>
          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Project Performance</div>
              <SectionFilter active="ALL" />
            </div>
            <TableToolbar
              searchValue={projPerfSearch}
              onSearch={setProjPerfSearch}
              placeholder="Search projects..."
              onExport={() => handleExport(
                ['#', 'Project', 'Calls', 'Hot', 'Warm', 'Cold', 'SV Schedule', 'SV Converted'],
                data.projectPerformance.map(r => [r.rank, r.project, r.calls, r.hot, r.warm, r.cold, r.svSchedule, r.svConverted]),
                'project-performance'
              )}
            />
            <div style={{ overflowX: 'auto' }}>
              <table className="lb-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Calls</th>
                    <th style={{ color: 'var(--hot)' }}>Hot</th>
                    <th style={{ color: 'var(--warm)' }}>Warm</th>
                    <th style={{ color: 'var(--cold)' }}>Cold</th>
                    <th>SV Schedule</th>
                    <th>SV Converted</th>
                  </tr>
                </thead>
                <tbody>
                  {data.projectPerformance.filter(row => row.project.toLowerCase().includes(projPerfSearch.toLowerCase())).map((row) => (
                    <tr key={row.rank}>
                      <td>{row.rank}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text)' }}>{row.project}</td>
                      <td>{row.calls}</td>
                      <td style={{ color: 'var(--hot)', fontWeight: 700 }}>{row.hot}</td>
                      <td style={{ color: 'var(--warn)', fontWeight: 700 }}>{row.warm}</td>
                      <td>{row.cold}</td>
                      <td>{row.svSchedule}</td>
                      <td>{row.svConverted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}>View All 37 Projects →</span>
              </div>
            </div>
          </div>

          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Project Credit Consumption</div>
              <SectionFilter active="ALL" />
            </div>
            <TableToolbar
              searchValue={creditSearch}
              onSearch={setCreditSearch}
              placeholder="Search projects..."
              onExport={() => handleExport(
                ['#', 'Project', 'Total Topup', 'Available', 'Total Used'],
                data.creditConsumption.map(r => [r.rank, r.project, r.totalTopup, r.available, r.totalUsed]),
                'credit-consumption'
              )}
            />
            <div style={{ overflowX: 'auto' }}>
              <table className="lb-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Total Topup</th>
                    <th>Available</th>
                    <th>Total Used</th>
                  </tr>
                </thead>
                <tbody>
                  {data.creditConsumption.filter(row => row.project.toLowerCase().includes(creditSearch.toLowerCase())).map((row) => (
                    <tr key={row.rank}>
                      <td>{row.rank}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text)' }}>{row.project}</td>
                      <td style={{ color: 'var(--success)', fontWeight: 700 }}>{row.totalTopup}</td>
                      <td style={{ color: 'var(--success)', fontWeight: 700 }}>{row.available}</td>
                      <td>
                        <span className="lb-badge" style={{ background: 'rgba(129,140,248,0.12)', color: 'var(--accent)' }}>{row.totalUsed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}>View All 18 Projects Consumption Details →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goal x Project Heatmap + Recent Calls */}
        <div className="g2" style={{ marginBottom: '20px' }}>
          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Goal × Project Heatmap</div>
              <SectionFilter active="ALL" />
            </div>
            <div className="heatmap" style={{ gridTemplateColumns: `130px repeat(${data.heatmap.projects.length}, minmax(80px, 1fr))` }}>
              <div />
              {data.heatmap.projects.map((p, i) => (
                <div key={i} className="hm-header" style={{ justifyContent: 'center', textAlign: 'center', fontSize: '8px', lineHeight: '1.3', whiteSpace: 'normal', wordBreak: 'break-word' }}>{p}</div>
              ))}
              {data.heatmap.goals.map((goal, gi) => (
                <React.Fragment key={gi}>
                  <div className="hm-header hm-row-label">{goal}</div>
                  {data.heatmap.data[gi].map((val, pi) => {
                    const v = typeof val === 'string' ? parseInt(val) : val;
                    const bg = v >= 70 ? `rgba(16,185,129,${0.15 + v / 150})` : v >= 40 ? `rgba(245,158,11,${0.15 + v / 150})` : v > 0 ? `rgba(239,68,68,${0.15 + v / 150})` : 'rgba(100,116,139,0.06)';
                    const textColor = v >= 70 ? '#34d399' : v >= 40 ? '#fbbf24' : v > 0 ? '#f87171' : '#64748b';
                    return (
                      <div key={pi} className="hm-cell" style={{ background: bg, color: textColor }}>
                        {val === 0 ? '—' : val}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="glass">
            <div className="glass-header">
              <div className="glass-title">Recent Calls</div>
              <SectionFilter active="ALL" />
            </div>
            <TableToolbar
              searchValue={recentCallsSearch}
              onSearch={setRecentCallsSearch}
              placeholder="Search calls..."
              onExport={() => handleExport(
                ['Project', 'Status', 'Rating', 'Duration', 'Total Used', 'Date & Time'],
                data.recentCalls.map(r => [r.project, r.status, r.rating, r.duration, r.totalUsed, r.date]),
                'recent-calls'
              )}
            />
            <div style={{ overflowX: 'auto' }}>
              <table className="lb-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Duration</th>
                    <th>Total Used</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentCalls.filter(call => call.project.toLowerCase().includes(recentCallsSearch.toLowerCase())).map((call, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: 'var(--text)', fontSize: '11px' }}>{call.project}</td>
                      <td>
                        <span className="lb-badge" style={{ background: 'rgba(251,191,36,0.12)', color: 'var(--warn)' }}>{call.status}</span>
                      </td>
                      <td style={{ color: 'var(--muted)' }}>{call.rating}</td>
                      <td style={{ color: 'var(--muted)' }}>{call.duration}</td>
                      <td style={{ color: 'var(--muted)' }}>{call.totalUsed}</td>
                      <td style={{ fontSize: '10px', color: 'var(--muted)' }}>{call.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
};

// Sub-components
const TableToolbar = ({ searchValue, onSearch, onExport, placeholder = 'Search...' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', justifyContent: 'flex-end' }}>
    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '5px 10px', gap: '6px', width: '160px' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '11px', fontWeight: 600, width: '100%' }}
      />
    </div>
    <button onClick={onExport} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)', color: '#818cf8', fontSize: '10px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Export
    </button>
  </div>
);

const SectionFilter = ({ active = '30D', excludeAll = false }) => {
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

  const labels = { '1D': 'Today', 'YESTERDAY': 'Yesterday', '7D': '7D', '30D': '30D', '90D': '90D', 'YTD': 'FY', 'ALL': 'ALL' };
  const filters = Object.entries(labels).filter(([key]) => !excludeAll || key !== 'ALL');
  return (
    <div className="chart-time" style={{ position: 'relative' }} ref={ref}>
      {filters.map(([key, label]) => (
        <div key={key} className={`ct-btn ${active === key ? 'active' : ''}`}>{label}</div>
      ))}
      <div className={`ct-btn ${showCustom ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setShowCustom(!showCustom); }} style={{ cursor: 'pointer' }}>Custom</div>
      {showCustom && (
        <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--popup-bg)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 20px', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', minWidth: '380px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>Start Date</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 12px', gap: '8px' }}>
                <input type="text" placeholder="DD/MM/YYYY" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '12px', fontWeight: 600, width: '100%' }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>End Date</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 12px', gap: '8px' }}>
                <input type="text" placeholder="DD/MM/YYYY" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '12px', fontWeight: 600, width: '100%' }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
            </div>
            <button onClick={() => setShowCustom(false)} style={{ padding: '9px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #818cf8, #6366f1)', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

const WkCard = ({ label, val, last, delta, positive }) => (
  <div className="wk-card">
    <div className="wk-label">{label}</div>
    <div className="wk-vals">
      <div className="wk-this" style={{ color: 'var(--accent)' }}>{val}</div>
      <div className="wk-last">{last}</div>
    </div>
    <div className="wk-delta" style={{ color: positive ? 'var(--success)' : 'var(--danger)' }}>{delta}</div>
  </div>
);

export default PlatformDashboard;
