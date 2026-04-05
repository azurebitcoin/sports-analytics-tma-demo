import type { PropsWithChildren } from "react";

interface TelegramShellProps extends PropsWithChildren {
  accentColor: string;
  competition: string;
  generatedAt: string;
  userLabel: string;
}

export function TelegramShell({
  accentColor,
  competition,
  generatedAt,
  userLabel,
  children
}: TelegramShellProps) {
  return (
    <div className="shell">
      <div className="shell-topline">
        <div className="brand-block">
          <span className="brand-mark" style={{ backgroundColor: accentColor }} />
          <div>
            <p className="eyebrow">Telegram Mini App</p>
            <h2>SportSignal Demo Surface</h2>
          </div>
        </div>
        <div className="shell-meta">
          <span>Demo mode</span>
          <span>{competition}</span>
          <span>{generatedAt}</span>
          <span>@{userLabel}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
