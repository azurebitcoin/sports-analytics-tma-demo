import type { AccessTier, AlertRule } from "../lib/types";

interface AccessMatrixProps {
  alertRules: AlertRule[];
  tiers: AccessTier[];
}

export function AccessMatrix({ alertRules, tiers }: AccessMatrixProps) {
  return (
    <section className="access-panel reveal reveal-delay-3">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Monetization + retention</p>
          <h3>Tiered access and event-triggered Telegram delivery.</h3>
        </div>
        <span className="panel-chip">Postback verified</span>
      </div>

      <div className="access-layout">
        <div className="tier-stack">
          {tiers.map((tier) => (
            <article key={tier.id} className="tier-panel">
              <div className="tier-topline">
                <div>
                  <span className="tier-name">{tier.name}</span>
                  <strong className="tier-price">{tier.price}</strong>
                </div>
                <span
                  className="tier-accent"
                  style={{ backgroundColor: tier.accent }}
                />
              </div>
              <p className="tier-description">{tier.description}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="rule-stack">
          {alertRules.map((rule) => (
            <article key={rule.id} className={`rule-row status-${rule.status}`}>
              <div>
                <strong>{rule.name}</strong>
                <p>{rule.condition}</p>
              </div>
              <div className="rule-meta">
                <span>{rule.channel}</span>
                <span>{rule.status}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
