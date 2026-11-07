import type { ReactNode } from 'react';
import { useSession } from '../../lib/session';
import { Monogram } from '../../components/Logo';

// Sign-in, recovery, two-factor and password pages: one glass card on the app's wallpaper.
export function AuthLayout({ title, subtitle, children, footer, wide }: { title: ReactNode; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  const { data: session } = useSession();
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-10">
      <div className={wide ? 'w-full max-w-2xl' : 'w-full max-w-[380px]'}>
        <div className="glass-read rounded-[26px] px-6 pt-8 pb-7 sm:px-8 animate-pop-in">
          <div className="mb-7 flex flex-col items-center text-center">
            <Monogram name={session?.instanceName ?? 'OpenInbox'} size={52} />
            <h1 className="mt-4 text-[22px] leading-tight font-semibold tracking-[-0.02em] text-balance">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-muted text-pretty">{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer && <div className="mt-5 text-center text-[13px] text-muted">{footer}</div>}
      </div>
    </div>
  );
}
