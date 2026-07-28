import React from 'react';
import {
  LayoutDashboard,
  PhoneCall,
  PieChart,
  Flag,
  History,
  Settings,
  Users,
  Moon,
  Upload,
  Bell,
  LogOut,
  ChevronDown,
  Pin,
  Building2,
  Boxes,
  Megaphone,
} from 'lucide-react';
import convoAILogo from '../assets/convoAI-purple.svg';

const Sidebar = ({ activePage = 'dashboard', onNavigate = () => {} }) => {
  const [managementOpen, setManagementOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(() => {
    return !document.body.classList.contains('light-mode');
  });

  React.useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDark]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, active: activePage === 'dashboard' },
    { id: 'presales', label: 'Pre Sales', icon: <PieChart className="w-4 h-4" />, active: activePage === 'presales' },
    { id: 'developers', label: 'Developers', icon: <Users className="w-4 h-4" />, active: activePage === 'developers' },
    { id: 'channel-partners', label: 'Channel Partners', icon: <Building2 className="w-4 h-4" />, active: activePage === 'channel-partners' },
    { id: 'projects', label: 'Projects', icon: <Boxes className="w-4 h-4" />, active: activePage === 'projects' },
    { id: 'segments', label: 'Segments', icon: <Flag className="w-4 h-4" />, active: activePage === 'segments' },
    { id: 'campaigns', label: 'Campaigns', icon: <Megaphone className="w-4 h-4" />, active: activePage === 'campaigns' },
    { id: 'call-logs', label: 'Call Logs', icon: <PhoneCall className="w-4 h-4" />, active: activePage === 'call-logs' },
    { id: 'transactions', label: 'Transactions', icon: <History className="w-4 h-4" />, active: activePage === 'transactions' },
  ];

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
        {menuItems.map(item => (
          <div key={item.id} className={`nav-item ${item.active ? 'active' : ''}`} onClick={() => onNavigate(item.id)} style={{ cursor: 'pointer' }}>
            {item.icon}
            <span>{item.label}</span>
            {item.active && <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--accent)' }}>›</span>}
          </div>
        ))}
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
