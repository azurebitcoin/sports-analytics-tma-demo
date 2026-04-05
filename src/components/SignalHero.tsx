import type { Metric } from "../lib/types";

interface SignalHeroProps {
  aiSummary: string;
  metrics: Metric[];
}

export function SignalHero({ aiSummary, metrics }: SignalHeroProps) {
  return (
    <section className="signal-panel reveal">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">AI summary</p>
          <h3>Structured data distilled into operator language.</h3>
        </div>
        <span className="panel-chip">LLM + rules engine</span>
      </div>

      <p className="signal-copy">{aiSummary}</p>

      <div className="metric-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className={`metric metric-${metric.tone}`}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.delta}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
