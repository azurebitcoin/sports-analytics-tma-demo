import { formatConfidence, formatKickoff } from "../lib/format";
import type { MatchPreview } from "../lib/types";

interface MatchGridProps {
  matches: MatchPreview[];
}

export function MatchGrid({ matches }: MatchGridProps) {
  return (
    <section className="match-panel reveal reveal-delay-1">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Fixtures + live states</p>
          <h3>Provider-normalized match surface.</h3>
        </div>
        <span className="panel-chip">Cache-aware feed</span>
      </div>

      <div className="match-list">
        {matches.map((match) => (
          <article key={match.id} className="match-row">
            <div className="match-main">
              <div className="match-title">
                <strong>
                  {match.homeTeam} vs {match.awayTeam}
                </strong>
                <span>{match.league}</span>
              </div>
              <div className="match-subline">
                <span>{formatKickoff(match.startTime)}</span>
                <span>{match.status}</span>
                <span>{match.h2hEdge}</span>
              </div>
            </div>

            <div className="match-stats">
              <div>
                <span>Injuries</span>
                <strong>{match.injuries}</strong>
              </div>
              <div>
                <span>Momentum</span>
                <strong>{formatConfidence(match.momentum)}</strong>
              </div>
              <div>
                <span>Model</span>
                <strong>{formatConfidence(match.modelConfidence)}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
