import React from 'react';
import {
  LayoutDashboard,
  PhoneCall,
  PieChart,
  Flag,
  History,
  Users,
  Moon,
  Bell,
  LogOut,
  ChevronDown,
  ChevronUp,
  Pin,
  Building2,
  Boxes,
  Megaphone,
} from 'lucide-react';
import convoAILogo from '../assets/convoAI-purple.svg';

const Sidebar = ({ activePage = 'dashboard', onNavigate = () => {} }) => {
  const [isDark, setIsDark] = React.useState(() => {
    return !document.body.classList.contains('light-mode');
  });
  const [channelPartnersOpen, setChannelPartnersOpen] = React.useState(true);
  const [projectsOpen, setProjectsOpen] = React.useState(true);

  React.useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDark]);

  const topItems = [
    { id: 'dashboard', label: 'Customer Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'presales', label: 'Pre Sales', icon: <PieChart className="w-4 h-4" /> },
    { id: 'developers', label: 'Developers', icon: <Users className="w-4 h-4" /> },
  ];

  const tailItems = [
    { id: 'segments', label: 'Segments', icon: <Flag className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'call-logs', label: 'Call Logs', icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <History className="w-4 h-4" /> },
  ];

  const renderItem = (item) => (
    <div key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)} style={{ cursor: 'pointer' }}>
      {item.icon}
      <span>{item.label}</span>
      {activePage === item.id && <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--accent)' }}>›</span>}
    </div>
  );

  const renderGroup = (label, icon, open, setOpen, childId, childLabel) => (
    <div key={childId}>
      <div className="nav-item" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        {icon}
        <span>{label}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5" style={{ marginLeft: 'auto', color: 'var(--muted)' }} /> : <ChevronDown className="w-3.5 h-3.5" style={{ marginLeft: 'auto', color: 'var(--muted)' }} />}
      </div>
      {open && (
        <div
          onClick={() => onNavigate(childId)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px 9px 34px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: activePage === childId ? '#818cf8' : 'var(--muted)', background: activePage === childId ? 'rgba(129,140,248,0.08)' : 'transparent' }}
        >
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>{childLabel}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={convoAILogo} alt="ACX ConvoAI" style={{ height: '28px', objectFit: 'contain' }} />
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Pin className="w-4 h-4" style={{ color: '#7c3aed' }} />
        </div>
      </div>

      {/* Navigation */}
      <div className="nav">
        {topItems.map(renderItem)}
        {renderGroup('Channel Partners', <Building2 className="w-4 h-4" />, channelPartnersOpen, setChannelPartnersOpen, 'channel-partners', 'Channel Partner')}
        {renderGroup('Projects', <Boxes className="w-4 h-4" />, projectsOpen, setProjectsOpen, 'projects', 'Project Lists')}
        {tailItems.map(renderItem)}
      </div>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <div className="dark-mode-toggle" onClick={() => setIsDark(!isDark)} style={{ cursor: 'pointer' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Moon className="w-3.5 h-3.5" />
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <div className="toggle-switch" style={{ background: isDark ? 'var(--accent)' : '#cbd5e1', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transform: isDark ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 0.2s ease' }} />
          </div>
        </div>

        <div className="user-info">
          <div className="user-avatar">UA</div>
          <div>
            <div className="user-name">
              Urban Axis
              <span style={{ marginLeft: '6px', fontSize: '9px', fontWeight: 700, color: 'var(--accent)', background: 'rgba(124,58,237,0.15)', padding: '1px 6px', borderRadius: '4px', verticalAlign: 'middle' }}>DEV</span>
            </div>
            <div className="user-email">urbanaxis@convoai.in</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <Bell className="w-3.5 h-3.5" style={{ color: 'var(--muted)', cursor: 'pointer' }} />
            <LogOut className="w-3.5 h-3.5" style={{ color: 'var(--muted)', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
