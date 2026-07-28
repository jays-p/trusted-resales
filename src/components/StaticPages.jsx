import React from 'react';
import { Phone, Mail, Settings2 } from 'lucide-react';
import StaticListPage from './StaticListPage';

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

export const SegmentsPage = () => (
  <StaticListPage
    title="SEGMENTS"
    searchPlaceholder="Search Segments"
    columns={['ID', 'SEGMENT NAME', 'CRITERIA', 'LEAD COUNT', 'CREATED DATE']}
    rows={[
      { name: 'Hot Leads', criteria: 'Confidence ≥ 80% & Interested', count: 44, color: '#f87171' },
      { name: 'Warm Leads', criteria: 'Confidence 50–79%', count: 411, color: '#fbbf24' },
      { name: 'Cold Leads', criteria: 'Confidence < 50%', count: 889, color: '#60a5fa' },
      { name: 'Site Visit Booked', criteria: 'Goal: Schedule Visit met', count: 26, color: '#34d399' },
    ].map((s, i) => ({
      searchText: s.name,
      cells: [
        <IdBadge id={`seg_${String(i + 1).padStart(4, '0')}...`} />,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{s.name}</span>,
        <span style={{ color: 'var(--dim)' }}>{s.criteria}</span>,
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: s.color }}>{s.count}</span>,
        <DateCell date="05 Apr 2026" time="09:40 am" />,
      ],
    }))}
  />
);

export const CampaignsPage = () => (
  <StaticListPage
    title="CAMPAIGNS"
    searchPlaceholder="Search Campaigns"
    columns={['ID', 'CAMPAIGN NAME', 'TYPE', 'STATUS', 'LEADS TARGETED', 'CREATED DATE']}
    rows={[
      { name: 'FY26 Outbound Blitz', type: 'Outbound Voice', status: 'Active', color: '#34d399', leads: 1200 },
      { name: 'Smartworld Sky Arc Launch', type: 'Outbound Voice', status: 'Completed', color: '#94a3b8', leads: 480 },
      { name: 'Diwali Site Visit Push', type: 'Outbound Voice', status: 'Scheduled', color: '#fbbf24', leads: 650 },
    ].map((c, i) => ({
      searchText: c.name,
      cells: [
        <IdBadge id={`cmp_${String(i + 1).padStart(4, '0')}...`} />,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{c.name}</span>,
        <span style={{ color: 'var(--dim)' }}>{c.type}</span>,
        <StatusBadge label={c.status} color={c.color} />,
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: 'var(--text)' }}>{c.leads.toLocaleString()}</span>,
        <DateCell date="28 Jun 2026" time="06:30 pm" />,
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

export const TransactionsPage = () => (
  <StaticListPage
    title="TRANSACTIONS"
    searchPlaceholder="Search Transactions"
    columns={['ID', 'PROJECT', 'TOTAL TOPUP', 'AVAILABLE', 'TOTAL USED', 'DATE']}
    rows={[
      { project: 'ABC Tower 1', topup: '₹25,000', available: '₹20,588', used: '₹4,412' },
      { project: 'M3m', topup: '₹41,421', available: '₹39,849', used: '₹1,572' },
      { project: 'DTC Downtown', topup: '₹3,000', available: '₹2,871', used: '₹129' },
    ].map((t, i) => ({
      searchText: t.project,
      cells: [
        <IdBadge id={`txn_${String(i + 1).padStart(4, '0')}...`} />,
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{t.project}</span>,
        <span style={{ color: 'var(--success)', fontWeight: 700 }}>{t.topup}</span>,
        <span style={{ color: 'var(--success)', fontWeight: 700 }}>{t.available}</span>,
        <span className="lb-badge" style={{ background: 'rgba(129,140,248,0.12)', color: 'var(--accent)' }}>{t.used}</span>,
        <DateCell date="24 Jul 2026" time="03:52 pm" />,
      ],
    }))}
  />
);
