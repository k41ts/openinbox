import { cn } from '../lib/utils';

/** The instance's mark: the first letter of its name on the accent ("Kai's Mail" -> K). */
export function Monogram({ name, size = 28, className }: { name?: string; size?: number; className?: string }) {
  const letter = (name ?? '').trim().charAt(0).toUpperCase() || 'M';
  return (
    <span
      aria-hidden
      className={cn('grid shrink-0 place-items-center bg-primary font-semibold text-primary-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]', className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.3), fontSize: Math.round(size * 0.48), letterSpacing: '-0.02em' }}
    >
      {letter}
    </span>
  );
}

/** Kept for any caller that still asks for the old mark; draws the monogram. */
export function LogoMark({ size = 28, name }: { size?: number; name?: string }) {
  return <Monogram size={size} name={name ?? 'OpenInbox'} />;
}

export function Logo({ name = 'OpenInbox' }: { name?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Monogram name={name} />
      <span className="text-[15px] font-semibold tracking-tight text-fg">{name}</span>
    </div>
  );
}
