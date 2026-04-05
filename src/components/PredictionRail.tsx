import { formatProbability } from "../lib/format";
import type { MatchPreview, PredictionCard } from "../lib/types";

interface PredictionRailProps {
  matches: MatchPreview[];
  predictions: PredictionCard[];
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function PredictionRail({
  matches,
  predictions,
  searchValue,
  onSearchChange
}: PredictionRailProps) {
  return (
    <section className="prediction-panel reveal reveal-delay-2">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Predictive feed</p>
          <h3>Text rationale mapped to structured probabilities.</h3>
        </div>
        <label className="searchbox">
          <span>Filter</span>
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search teams, markets, or rationale"
          />
        </label>
      </div>

      <div className="prediction-list">
        {predictions.map((prediction) => {
          const fixture = matches.find((match) => match.id === prediction.fixtureId);

          return (
            <article key={prediction.id} className="prediction-row">
              <div className="prediction-headline">
                <div>
                  <p className="prediction-market">{prediction.market}</p>
                  <strong>
                    {fixture?.homeTeam} vs {fixture?.awayTeam}
                  </strong>
                </div>
                <div className={`confidence-pill ${prediction.confidence}`}>
                  {prediction.confidence}
                </div>
              </div>

              <div className="prediction-probability">
                <span>Probability</span>
                <strong>{formatProbability(prediction.probability)}</strong>
              </div>

              <p className="prediction-rationale">{prediction.rationale}</p>
              <div className="prediction-trigger">{prediction.liveTrigger}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
