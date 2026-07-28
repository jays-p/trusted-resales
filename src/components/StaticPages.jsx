import React from 'react';
import { Phone, Mail, Settings2, MoreVertical, Users, Clock, PhoneOff, RefreshCw, Filter, Repeat, ArrowUpRight, Wallet, IndianRupee, Download, Plus, Target } from 'lucide-react';
import StaticListPage from './StaticListPage';
import RichListPage, { GhostButton, GhostIconButton, PrimaryButton, SummaryCard } from './RichListPage';

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
  <StaticListPage
    title="CHANNEL PARTNERS"
    searchPlaceholder="Search Channel Partners"
    columns={['ID', 'NAME', 'CONTACT INFORMATION', 'DEVELOPERS MAPPED', 'CITY', 'CREATED DATE']}
    rows={[
      {
        searchText: 'Square Yards Realty',
        cells: [
          <IdBadge id="7a12fd3c8e21a5b0c44..." />,
          <NameCell avatar="S" name="Square Yards Realty" color="#0ea5e9" />,
          <ContactCell phone="[+91] 9811******" email="partners@squareyards.in" />,
          <span style={{ color: 'var(--dim)' }}>Smartworld, M3m</span>,
          <span style={{ color: 'var(--dim)' }}>Gurugram</span>,
          <DateCell date="02 Feb 2026" time="11:20 am" />,
        ],
      },
      {
        searchText: 'Anarock Advisors',
        cells: [
          <IdBadge id="c3e40b91f7d62a1e903..." />,
          <NameCell avatar="A" name="Anarock Advisors" color="#f97316" />,
          <ContactCell phone="[+91] 9922******" email="channel@anarock.com" />,
          <span style={{ color: 'var(--dim)' }}>DTC Group, BPTP Ltd</span>,
          <span style={{ color: 'var(--dim)' }}>Delhi</span>,
          <DateCell date="14 Jan 2026" time="04:05 pm" />,
        ],
      },
    ]}
  />
);

export const ProjectsPage = () => (
  <StaticListPage
    title="PROJECTS"
    searchPlaceholder="Search Projects"
    columns={['ID', 'PROJECT NAME', 'DEVELOPER', 'CITY', 'STATUS', 'CREATED DATE']}
    rows={[
      { name: 'Smartworld Sky Arc', dev: 'Smartworld', city: 'Gurugram', status: 'Active', color: '#34d399' },
      { name: 'Smartworld One Dxp', dev: 'Smartworld', city: 'Gurugram', status: 'Active', color: '#34d399' },
      { name: 'M3m Crown', dev: 'M3m Developer', city: 'Gurugram', status: 'Active', color: '#34d399' },
      { name: 'DTC Downtown', dev: 'DTC Group', city: 'Panchkula', status: 'Upcoming', color: '#fbbf24' },
      { name: 'BPTP Smartworld Pride', dev: 'BPTP Ltd', city: 'Faridabad', status: 'Active', color: '#34d399' },
    ].map((p, i) => ({
      searchText: p.name,
      cells: [
        <IdBadge id={`prj_${String(i + 1).padStart(4, '0')}...`} />,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{p.name}</span>,
        <span style={{ color: 'var(--dim)' }}>{p.dev}</span>,
        <span style={{ color: 'var(--dim)' }}>{p.city}</span>,
        <StatusBadge label={p.status} color={p.color} />,
        <DateCell date="21 Mar 2026" time="10:15 am" />,
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
    filters={['Urban Axis', 'Joy Street']}
    searchValue=""
    onSearch={() => {}}
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
    filters={['Urban Axis', 'Joy Street']}
    searchValue=""
    onSearch={() => {}}
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

export const CallLogsPage = () => (
  <StaticListPage
    title="CALL LOGS"
    searchPlaceholder="Search Call Logs"
    columns={['PROJECT', 'STATUS', 'RATING', 'DURATION', 'TOTAL USED', 'DATE & TIME']}
    rows={[
      { project: 'SFDC_00Tfw0000ecqAZEAY', status: 'QUEUED', date: '24 Jul 26 03:52 PM' },
      { project: 'SFDC_00Tfw0000ed3alEAA', status: 'QUEUED', date: '24 Jul 26 03:52 PM' },
      { project: 'SFDC_00TOX00000x8wfV2A0', status: 'QUEUED', date: '24 Jul 26 03:52 PM' },
    ].map((c, i) => ({
      searchText: c.project,
      cells: [
        <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '11px' }}>{c.project}</span>,
        <StatusBadge label={c.status} color="#fbbf24" />,
        <span style={{ color: 'var(--muted)' }}>—</span>,
        <span style={{ color: 'var(--muted)' }}>—</span>,
        <span style={{ color: 'var(--muted)' }}>—</span>,
        <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{c.date}</span>,
      ],
    }))}
  />
);

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
    filters={['Urban Axis', 'Joy Street']}
    actions={<>
      <GhostIconButton icon={RefreshCw} />
      <GhostIconButton icon={Filter} />
      <GhostButton>TRANSFER AMOUNT</GhostButton>
      <GhostButton icon={Repeat}>AD-HOC</GhostButton>
      <GhostButton icon={ArrowUpRight}>TOP-UP</GhostButton>
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
