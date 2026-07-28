import React from 'react';
import { Phone, Mail, Settings2, MoreVertical, Users, Clock, PhoneOff, RefreshCw, Filter, ArrowUpRight, Wallet, IndianRupee, Download, Plus, Target, ChevronDown, Play, ArrowUpDown, Flame, Sun, Snowflake, PhoneCall, X, Search } from 'lucide-react';
import StaticListPage from './StaticListPage';
import RichListPage, { GhostIconButton, PrimaryButton, SummaryCard } from './RichListPage';

const Avatar = ({ label, color = '#7c3aed' }) => (
  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: color, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    {label}
  </div>
);

const NameCell = ({ avatar, name, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Avatar label={avatar} color={color} />
    <span style={{ fontWeight: 700, color: 'var(--text)' }}>{name}</span>
  </div>
);

const ContactCell = ({ phone, email }) => (
  <div>
    {phone && <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--dim)', marginBottom: email ? '4px' : 0 }}><Phone className="w-3 h-3" style={{ color: 'var(--muted)' }} />{phone}</div>}
    {email && <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--dim)' }}><Mail className="w-3 h-3" style={{ color: 'var(--muted)' }} />{email}</div>}
  </div>
);

const DateCell = ({ date, time }) => (
  <div>
    <div style={{ fontSize: '11px', color: 'var(--dim)' }}>{date}</div>
    {time && <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{time}</div>}
  </div>
);

const StatusBadge = ({ label, color }) => (
  <span className="lb-badge" style={{ background: `${color}20`, color }}>{label}</span>
);

const IdBadge = ({ id }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--muted)', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '4px 8px' }}>{id}</span>
);

const ActionDots = () => (
  <MoreVertical className="w-4 h-4" style={{ color: 'var(--muted)', cursor: 'pointer' }} />
);

const DevProjectCell = ({ dev, project, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Avatar label={dev[0]} color={color} />
    <div>
      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '12px' }}>{dev}</div>
      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{project}</div>
    </div>
  </div>
);

const CampaignSegmentCell = ({ campaign, segment }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Target className="w-3.5 h-3.5" style={{ color: '#f97316', flexShrink: 0 }} />
    <div>
      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '12px' }}>{campaign}</div>
      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{segment}</div>
    </div>
  </div>
);

const PriorityBadge = ({ label }) => {
  const colors = { HIGHEST: '#fb923c', HIGH: '#fbbf24', ULTRAHIGH: '#f43f5e', NORMAL: '#94a3b8' };
  const color = colors[label.toUpperCase()] || '#94a3b8';
  return <span className="lb-badge" style={{ background: `${color}20`, color }}>{label}</span>;
};

const CallStatCell = ({ icon: Icon, count, pct, color }) => {
  if (!count) return <span style={{ color: 'var(--muted)' }}>0</span>;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', background: `${color}18`, color, fontSize: '11px', fontWeight: 800 }}>
      <Icon className="w-3 h-3" /> {count.toLocaleString()}
      {pct !== undefined && <span style={{ opacity: 0.75, fontWeight: 700 }}>{pct}%</span>}
    </div>
  );
};

const LeadsBadge = ({ count }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', background: count ? 'rgba(52,211,153,0.15)' : 'transparent', color: count ? '#34d399' : 'var(--muted)', fontSize: '11px', fontWeight: 800 }}>
    <Users className="w-3 h-3" /> {count.toLocaleString()}
  </span>
);

const ParticularBadge = ({ label }) => {
  const colors = { ANALYSIS: '#818cf8', 'AI CALL': '#a78bfa', 'PROJECT-CP-TRANSFER-AMOUNT': '#f472b6' };
  const color = colors[label] || '#94a3b8';
  return <span className="lb-badge" style={{ background: `${color}20`, color, whiteSpace: 'nowrap' }}>{label}</span>;
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="glass" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
    </div>
    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)' }}>{value}</div>
  </div>
);

const PlainPill = ({ label, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', background: active ? 'rgba(124,58,237,0.12)' : 'var(--card-bg-alt)', border: active ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.08)', color: active ? 'var(--accent)' : 'var(--text)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    {label}
    <ChevronDown className="w-3 h-3" />
  </div>
);

const RecordingCell = ({ playing, duration }) => {
  if (!playing) return <span style={{ color: 'var(--muted)' }}>—</span>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', border: 'none', color: '#fff', fontSize: '10px', fontWeight: 800, cursor: 'pointer' }}>
        <Play className="w-3 h-3" fill="currentColor" /> PLAY <span style={{ opacity: 0.85 }}>{duration}</span>
      </button>
      <Download className="w-3.5 h-3.5" style={{ color: 'var(--muted)', cursor: 'pointer' }} />
    </div>
  );
};

const CallEndBadge = ({ label }) => {
  if (!label || label === '-') return <span style={{ color: 'var(--muted)' }}>-</span>;
  const colors = { Unanswered: '#94a3b8', 'Client Hangup': '#f87171' };
  const color = colors[label] || '#94a3b8';
  return <span className="lb-badge" style={{ background: `${color}20`, color }}>{label}</span>;
};

export const DevelopersPage = () => (
  <StaticListPage
    title="DEVELOPERS"
    searchPlaceholder="Search Developers"
    columns={['ID', 'NAME', 'CONTACT INFORMATION', 'BD / CS', 'COMMUNICATION ENGINE', 'CITY', 'CREATED DATE']}
    rows={[
      {
        searchText: 'Urban Axis',
        cells: [
          <IdBadge id="69b91ed0921d54a9e81..." />,
          <NameCell avatar="U" name="Urban Axis" />,
          <ContactCell phone="[+91] 7867******" email="urbanaxis@convoai.in" />,
          <div><div style={{ fontSize: '11px', color: 'var(--dim)' }}>BD - Manoj Yadav</div><div style={{ fontSize: '11px', color: 'var(--muted)' }}>CS -</div></div>,
          <Settings2 className="w-4 h-4" style={{ color: '#fbbf24' }} />,
          <span style={{ color: 'var(--muted)' }}>—</span>,
          <DateCell date="17 Mar 2026" time="02:58 pm" />,
        ],
      },
    ]}
  />
);

export const ChannelPartnersPage = () => (
  <RichListPage
    title="CHANNEL PARTNER"
    searchPlaceholder="Search CP"
    actions={<PrimaryButton icon={Plus}>ADD</PrimaryButton>}
    entrySeparator=" to "
    columns={['ID', 'NAME', 'CONTACT INFORMATION', 'PROJECT', 'DATE']}
    rows={[
      { id: '6a479cbcecf68e48dfd4a405', name: 'Realty Mozart', avatar: 'R', color: '#7c3aed', phone: '(+91) 6985......', email: 'Realtymozart@gmail.com', date: '03 Jul 2026', time: '04:57 PM' },
      { id: '6a479c7eecf68e48dfd4a37f', name: 'Great PropDeal', avatar: 'G', color: '#7c3aed', phone: '(+91) 8974......', email: 'Greatpropdeal@gmail.com', date: '03 Jul 2026', time: '04:56 PM' },
    ].map((cp) => ({
      searchText: cp.name,
      cells: [
        <IdBadge id={cp.id} />,
        <NameCell avatar={cp.avatar} name={cp.name} color={cp.color} />,
        <ContactCell phone={cp.phone} email={cp.email} />,
        <span style={{ color: 'var(--dim)' }}>Joy Street</span>,
        <DateCell date={cp.date} time={cp.time} />,
      ],
    }))}
  />
);

export const ProjectsPage = () => (
  <RichListPage
    title="PROJECTS"
    searchPlaceholder="Search project"
    columns={['ACTION', 'ID', 'DEVELOPER NAME', 'PROJECT NAME', 'TOTAL CREDIT', 'USED CREDIT', 'AVAILABLE', 'CREATED DATE']}
    rows={[
      { id: '69b91efd9b392d1...', dev: 'Urban Axis', project: 'Joy Street', total: '₹1,35,000', used: '₹1,04,808', available: '₹30,192', date: '17 Mar 2026', time: '02:59 pm' },
    ].map((p) => ({
      searchText: p.project,
      cells: [
        <ActionDots />,
        <IdBadge id={p.id} />,
        <NameCell avatar="U" name={p.dev} />,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{p.project}</span>,
        <span style={{ color: 'var(--dim)' }}>{p.total}</span>,
        <span style={{ color: '#f87171', fontWeight: 700 }}>{p.used}</span>,
        <span style={{ color: '#34d399', fontWeight: 700 }}>{p.available}</span>,
        <DateCell date={p.date} time={p.time} />,
      ],
    }))}
  />
);

const SEGMENTS_DATA = [
  { id: '6a61fbfd5e43f624dbc5f...', segment: 'Investors3', leads: 1147, date: '23 Jul 2026', time: '05:03 pm' },
  { id: '6a61f7105e43f624dbc5c...', segment: 'Preetika_01', leads: 3, date: '23 Jul 2026', time: '04:42 pm' },
  { id: '6a61f1032af9fcd41124c...', segment: 'Demo_mayank_01', leads: 3, date: '23 Jul 2026', time: '04:16 pm' },
  { id: '6a61b8c808c3832bcc30...', segment: 'Investors2', leads: 9, date: '23 Jul 2026', time: '12:16 pm' },
  { id: '6a5db060205ab3f516a0...', segment: 'Investors1', leads: 1000, date: '20 Jul 2026', time: '10:51 am' },
  { id: '6a51fd79658566809f0e...', segment: 'Investors', leads: 1000, date: '11 Jul 2026', time: '01:53 pm' },
  { id: '6a4e31fbb825f7b1e708...', segment: 'Test_joystreet', leads: 1, date: '08 Jul 2026', time: '04:48 pm' },
  { id: '6a4ded77735ab6309657...', segment: 'Client 1', leads: 209, date: '08 Jul 2026', time: '11:55 am' },
  { id: '6a4dece0735ab6309657...', segment: 'Client', leads: 0, date: '08 Jul 2026', time: '11:53 am' },
  { id: '6a48ca6b89a258607301...', segment: 'Data', leads: 0, date: '04 Jul 2026', time: '02:25 pm' },
];

export const SegmentsPage = () => (
  <RichListPage
    title="SEGMENTS"
    filters={['Joy Street']}
    searchPlaceholder="Search segments..."
    actions={<PrimaryButton icon={Plus}>ADD SEGMENT</PrimaryButton>}
    totalEntries={47}
    columns={['ACTIONS', 'ID', 'DEVELOPER NAME', 'PROJECT NAME', 'SEGMENT NAME', 'LEADS COUNT', 'CREATED DATE']}
    rows={SEGMENTS_DATA.map((s) => ({
      searchText: s.segment,
      cells: [
        <ActionDots />,
        <IdBadge id={s.id} />,
        <NameCell avatar="U" name="Urban Axis" />,
        <span style={{ color: 'var(--dim)' }}>Joy Street</span>,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{s.segment}</span>,
        <LeadsBadge count={s.leads} />,
        <DateCell date={s.date} time={s.time} />,
      ],
    }))}
  />
);

const CAMPAIGNS_DATA = [
  { id: '6a61fd2d...', campaign: 'Joy_Street_21_07', segment: 'Investors3', priority: 'HIGHEST', leads: 1149, inprogress: 15, answered: 441, answeredPct: 38, unanswered: 693, unansweredPct: 60 },
  { id: '6a61f815...', campaign: 'Preetika_23_07_2026_01', segment: 'Preetika_01', priority: 'HIGH', leads: 0, inprogress: 0, answered: 0, unanswered: 0 },
  { id: '6a61f7a7...', campaign: 'Preetika_23_07_2026', segment: 'Preetika_01', priority: 'HIGH', leads: 3, inprogress: 0, answered: 3, answeredPct: 100, unanswered: 0 },
  { id: '6a61f164...', campaign: 'Joystreet_teset_570', segment: 'Demo_mayank_01', priority: 'HIGH', leads: 3, inprogress: 0, answered: 2, answeredPct: 67, unanswered: 1, unansweredPct: 33 },
  { id: '6a61b906...', campaign: 'Joy_Street_campaign_01', segment: 'Investors2', priority: 'ULTRAHIGH', leads: 9, inprogress: 0, answered: 0, unanswered: 9, unansweredPct: 100 },
  { id: '6a5db219...', campaign: 'Joy_Street_campaign_01', segment: 'Investors1', priority: 'ULTRAHIGH', leads: 1000, inprogress: 22, answered: 0, unanswered: 978, unansweredPct: 98 },
  { id: '6a51fdcb...', campaign: 'Joy_Street_campaign_01', segment: 'Investors', priority: 'ULTRAHIGH', leads: 1000, inprogress: 14, answered: 0, unanswered: 986, unansweredPct: 99 },
  { id: '6a4e335d...', campaign: 'Joy_Street_campaign_01', segment: 'Client 1', priority: 'ULTRAHIGH', leads: 209, inprogress: 4, answered: 0, unanswered: 205, unansweredPct: 98 },
  { id: '6a4e3254...', campaign: 'Joy_Street_campaign_08_07_2026', segment: 'Test_joystreet', priority: 'HIGH', leads: 1, inprogress: 0, answered: 1, answeredPct: 100, unanswered: 0 },
  { id: '6a4e12bd...', campaign: 'Client_1_campaign_8_jul', segment: 'Client 1', priority: 'ULTRAHIGH', leads: 0, inprogress: 0, answered: 0, unanswered: 0 },
];

export const CampaignsPage = () => (
  <RichListPage
    title="CAMPAIGNS"
    filters={['Joy Street']}
    searchPlaceholder="Search Campaigns"
    actions={<>
      <GhostIconButton icon={RefreshCw} />
      <PrimaryButton icon={Plus}>ADD CAMPAIGN</PrimaryButton>
    </>}
    totalEntries={48}
    columns={['ACTION', 'ID', 'DEVELOPER/PROJECT', 'CAMPAIGN/SEGMENT', 'SCRIPT NAME', 'PRIORITY', 'LEADS', 'INPROGRESS', 'ANSWERED', 'UNANSWERED']}
    rows={CAMPAIGNS_DATA.map((c) => ({
      searchText: c.campaign,
      cells: [
        <ActionDots />,
        <IdBadge id={c.id} />,
        <DevProjectCell dev="Urban Axis" project="Joy Street" />,
        <CampaignSegmentCell campaign={c.campaign} segment={c.segment} />,
        <StatusBadge label="Normal" color="#94a3b8" />,
        <PriorityBadge label={c.priority} />,
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: 'var(--text)' }}>{c.leads.toLocaleString()}</span>,
        <CallStatCell icon={Clock} count={c.inprogress} color="#60a5fa" />,
        <CallStatCell icon={Phone} count={c.answered} pct={c.answeredPct} color="#34d399" />,
        <CallStatCell icon={PhoneOff} count={c.unanswered} pct={c.unansweredPct} color="#f87171" />,
      ],
    }))}
  />
);

const CALL_LOGS_STATS = [
  { label: 'Total Calls', value: '11,046', icon: PhoneCall, color: '#818cf8' },
  { label: 'Answered', value: '3,403', icon: Phone, color: '#34d399' },
  { label: 'Unanswered', value: '5,950', icon: PhoneOff, color: '#f87171' },
  { label: 'Amount Used', value: '₹1,04,808', icon: IndianRupee, color: '#fbbf24' },
  { label: 'Hot Leads', value: '0', icon: Flame, color: '#fb923c' },
  { label: 'Warm Leads', value: '0', icon: Sun, color: '#facc15' },
  { label: 'Cold Leads', value: '0', icon: Snowflake, color: '#60a5fa' },
];

const CALL_LOGS_DATA = [
  { id: '6a632c272055a904724874a2', campaign: 'Joy_Street_21_07', phone: '(+91) 99999*****', endReason: '-' },
  { id: '6a632bdc6df199f32b95362b', campaign: 'Joy_Street_21_07', phone: '(+91) 99999*****', endReason: '-' },
  { id: '6a61fd402af9fcd4112513b5', campaign: 'Joy_Street_21_07', phone: '(+91) 94514*****', endReason: 'Unanswered' },
  { id: '6a61fd402af9fcd4112513b4', campaign: 'Joy_Street_21_07', phone: '(+91) 93054*****', endReason: 'Unanswered' },
  { id: '6a61fd402af9fcd4112513b3', campaign: 'Joy_Street_21_07', phone: '(+91) 94154*****', endReason: 'Unanswered' },
  { id: '6a61fd402af9fcd4112513b2', campaign: 'Joy_Street_21_07', phone: '(+91) 94510*****', endReason: 'Unanswered' },
  { id: '6a61fd402af9fcd4112513b1', campaign: 'Joy_Street_21_07', phone: '(+91) 98893*****', endReason: 'Client Hangup', playing: true, duration: '0:08' },
  { id: '6a61fd402af9fcd4112513b0', campaign: 'Joy_Street_21_07', phone: '(+91) 99363*****', endReason: 'Unanswered' },
];

export const CallLogsPage = () => {
  const [search, setSearch] = React.useState('');
  const rows = CALL_LOGS_DATA.filter(c => c.phone.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left"><h2>CALL LOGS</h2></div>
      </div>

      <div className="g2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '20px' }}>
        {CALL_LOGS_STATS.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="glass" style={{ padding: '14px 16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '9px 14px', gap: '8px' }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Search by phone number or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
            />
          </div>
          <PlainPill label="Joy Street" active />
          <PlainPill label="Duration" />
          <PlainPill label="Segment" />
          <PlainPill label="Campaign" />
          <GhostIconButton icon={Filter} />
          <GhostIconButton icon={ArrowUpDown} />
          <GhostIconButton icon={Download} />
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <X className="w-3.5 h-3.5" /> Clear all <span style={{ background: '#f87171', color: '#fff', borderRadius: '50%', width: '15px', height: '15px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active Filters:</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', background: 'rgba(129,140,248,0.12)', color: '#818cf8', fontSize: '11px', fontWeight: 700 }}>
            Proj: Joy Street <X className="w-3 h-3" style={{ cursor: 'pointer' }} />
          </span>
        </div>
      </div>

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {['ACTION', 'ID', 'DEVELOPER', 'PROJECT NAME', 'CAMPAIGN', 'PHONE NO', 'CALL RECORDING', 'CALL END REASON'].map((col, i) => (
                  <th key={i} style={{ whiteSpace: 'nowrap' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={i}>
                  <td><ActionDots /></td>
                  <td><IdBadge id={c.id} /></td>
                  <td><NameCell avatar="U" name="Urban Axis" /></td>
                  <td style={{ color: 'var(--dim)' }}>Joy Street</td>
                  <td style={{ color: 'var(--dim)' }}>{c.campaign}</td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--dim)' }}><Phone className="w-3 h-3" style={{ color: 'var(--muted)' }} />{c.phone}</td>
                  <td><RecordingCell playing={c.playing} duration={c.duration} /></td>
                  <td><CallEndBadge label={c.endReason} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>No entries found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TRANSACTIONS_DATA = [
  { id: '6a4e3404b169fa0dc44e...', logId: '6a4e326bb169fa0dc44e6e07', phone: '[+91] 78381*****', duration: '1:54', amount: '-₹0', particular: 'ANALYSIS', balance: '₹30,192', date: '08 Jul 2026', time: '04:57 pm' },
  { id: '6a4e33ccb825f7b1e708...', logId: '6a4e326bb169fa0dc44e6e07', phone: '[+91] 78381*****', duration: '1:54', amount: '-₹16', particular: 'AI CALL', balance: '₹30,208', date: '08 Jul 2026', time: '04:56 pm' },
  { id: '6a479db2ecf68e48dfd4...', logId: '—', phone: '—', duration: '—', amount: '-₹10,000', particular: 'PROJECT-CP-TRANSFER-AMOUNT', balance: '₹30,208', date: '03 Jul 2026', time: '05:02 pm' },
  { id: '6a479d79ecf68e48dfd4...', logId: '—', phone: '—', duration: '—', amount: '-₹10,000', particular: 'PROJECT-CP-TRANSFER-AMOUNT', balance: '₹40,208', date: '03 Jul 2026', time: '05:01 pm' },
  { id: '6a4767a61f2f8e7cde70...', logId: '6a465b4c73830b76f0631f1b', phone: '[+91] 92778*****', duration: '6:30', amount: '-₹0', particular: 'ANALYSIS', balance: '₹50,208', date: '03 Jul 2026', time: '01:11 pm' },
  { id: '6a47670f1f2f8e7cde70a...', logId: '6a4603ca3a93681cadae25d8', phone: '[+91] 99844*****', duration: '1:57', amount: '-₹0', particular: 'ANALYSIS', balance: '₹50,208', date: '03 Jul 2026', time: '01:08 pm' },
  { id: '6a47665d1f2f8e7cde70...', logId: '6a4603ca3a93681cadae25ad', phone: '[+91] 98392*****', duration: '0:23', amount: '-₹0', particular: 'ANALYSIS', balance: '₹50,208', date: '03 Jul 2026', time: '01:05 pm' },
  { id: '6a4765845f1bfc0ce10fa...', logId: '6a4603ca3a93681cadae25b8', phone: '[+91] 99350*****', duration: '0:28', amount: '-₹0', particular: 'ANALYSIS', balance: '₹50,208', date: '03 Jul 2026', time: '01:02 pm' },
  { id: '6a4764ea5f1bfc0ce10fa...', logId: '6a4603ca3a93681cadae25bc', phone: '[+91] 82880*****', duration: '0:35', amount: '-₹0', particular: 'ANALYSIS', balance: '₹50,208', date: '03 Jul 2026', time: '12:59 pm' },
];

export const TransactionsPage = () => (
  <RichListPage
    title="TRANSACTIONS"
    filters={['Joy Street']}
    actions={<>
      <GhostIconButton icon={RefreshCw} />
      <GhostIconButton icon={Filter} />
      <GhostIconButton icon={Download} />
    </>}
    extraRow={
      <div className="g2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <SummaryCard label="Total Credits" value="₹1,35,000" icon={Wallet} />
        <SummaryCard label="Set-up Amount" value="₹60,000" icon={Clock} />
        <SummaryCard label="Available Credits" value="₹30,192" sub="₹1,35,000" icon={ArrowUpRight} />
        <SummaryCard label="Used Credits" value="₹1,04,808" icon={IndianRupee} />
      </div>
    }
    columns={['ID', 'WEBBOT LOG ID', 'PHONE', 'DURATION', 'TYPE', 'AMOUNT', 'PARTICULAR', 'BALANCE', 'CREATED DATE']}
    rows={TRANSACTIONS_DATA.map((t) => ({
      searchText: t.particular,
      cells: [
        <IdBadge id={t.id} />,
        <span style={{ color: 'var(--muted)', fontSize: '10px' }}>{t.logId}</span>,
        <span style={{ color: 'var(--dim)' }}>{t.phone}</span>,
        <span style={{ color: 'var(--dim)' }}>{t.duration}</span>,
        <StatusBadge label="DEBIT" color="#f87171" />,
        <span style={{ color: t.amount === '-₹0' ? 'var(--muted)' : '#f87171', fontWeight: 700 }}>{t.amount}</span>,
        <ParticularBadge label={t.particular} />,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{t.balance}</span>,
        <DateCell date={t.date} time={t.time} />,
      ],
    }))}
  />
);
