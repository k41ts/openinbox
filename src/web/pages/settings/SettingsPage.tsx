import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router';
import { CalendarClock, Download, Forward, Funnel, MonitorSmartphone, Palette, PenLine, ShieldCheck, Tag, UserRound } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AppearanceSettings, DevicesSettings, ProfileSettings, SecuritySettings } from './AccountSettings';
import { MAIL_SECTIONS, MailboxSettings, type MailSection } from './MailboxSettings';

const ACCOUNT = [
  { to: 'profile', label: 'Profile', Icon: UserRound, element: <ProfileSettings /> },
  { to: 'appearance', label: 'Appearance', Icon: Palette, element: <AppearanceSettings /> },
  { to: 'security', label: 'Security', Icon: ShieldCheck, element: <SecuritySettings /> },
  { to: 'devices', label: 'Devices', Icon: MonitorSmartphone, element: <DevicesSettings /> },
];

const MAIL_ICONS: Record<MailSection, typeof UserRound> = {
  signature: PenLine,
  'auto-reply': CalendarClock,
  forwarding: Forward,
  labels: Tag,
  filters: Funnel,
  'import-export': Download,
};

export default function SettingsPage() {
  // Mail sections keep the chosen inbox (?inbox=) when switching between them.
  const { search } = useLocation();
  const link = (to: string, label: string, Icon: typeof UserRound, keep = '') => (
    <NavLink
      key={to}
      to={`/settings/${to}${keep}`}
      className={({ isActive }) =>
        cn(
          'flex h-8 shrink-0 items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] whitespace-nowrap transition-colors',
          isActive ? 'bg-surface-3 font-medium text-fg [&>svg]:text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg [&>svg]:text-faint',
        )
      }
    >
      <Icon className="h-[15px] w-[15px]" />
      {label}
    </NavLink>
  );
  const heading = (label: string, first?: boolean) => <div className={cn('hidden h-[26px] items-center px-2.5 text-[12.5px] font-medium text-faint md:flex', !first && 'md:mt-3')}>{label}</div>;
  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row md:gap-2">
      <aside className="glass-side shrink-0 max-md:border-b max-md:border-border md:w-[224px] md:rounded-[16px]">
        <nav className="scroll-thin flex gap-px overflow-x-auto p-2 md:flex-col md:px-2.5 md:py-3.5">
          {heading('Account', true)}
          {ACCOUNT.map((a) => link(a.to, a.label, a.Icon))}
          {heading('Mail')}
          {MAIL_SECTIONS.map((m) => link(m.id, m.label, MAIL_ICONS[m.id], search))}
        </nav>
      </aside>
      <div className="glass min-h-0 flex-1 md:overflow-hidden md:rounded-[16px]">
        <div className="scroll-thin h-full overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pt-6 pb-12 sm:px-8 lg:pt-8">
          <Routes>
            {ACCOUNT.map((a) => (
              <Route key={a.to} path={a.to} element={a.element} />
            ))}
            {MAIL_SECTIONS.map((m) => (
              <Route key={m.id} path={m.id} element={<MailboxSettings section={m.id} />} />
            ))}
            {/* Older links. */}
            <Route path="account" element={<Navigate to="/settings/profile" replace />} />
            <Route path="mailboxes/*" element={<Navigate to="/settings/signature" replace />} />
            <Route path="*" element={<Navigate to="/settings/profile" replace />} />
          </Routes>
        </div>
        </div>
      </div>
    </div>
  );
}
