import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { AccessMatrix } from "../components/AccessMatrix";
import { MatchGrid } from "../components/MatchGrid";
import { PredictionRail } from "../components/PredictionRail";
import { SignalHero } from "../components/SignalHero";
import { TelegramShell } from "../components/TelegramShell";
import { useTelegramWebApp } from "../hooks/useTelegramWebApp";
import { loadDashboard } from "../lib/api";
import { formatKickoff } from "../lib/format";
import type { DashboardSnapshot } from "../lib/types";
import { mockDashboard } from "../mocks/dashboard";

type AppTab = "overview" | "live" | "insights" | "access";

const tabs: AppTab[] = ["overview", "live", "insights", "access"];

export function App() {
  const { accentColor, isTelegram, user, webApp } = useTelegramWebApp();
  const [dashboard, setDashboard] = useState<DashboardSnapshot>(mockDashboard);
  const [activeTab, setActiveTab] = useState<AppTab>("overview");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const deferredSearch = useDeferredValue(searchValue.trim().toLowerCase());

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      setIsLoading(true);
      const nextSnapshot = await loadDashboard();

      if (isMounted) {
        setDashboard(nextSnapshot);
        setIsLoading(false);
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMatches = dashboard.matches.filter((match) => {
    if (!deferredSearch) {
      return true;
    }

    const haystack = `${match.homeTeam} ${match.awayTeam} ${match.league} ${match.h2hEdge}`.toLowerCase();
    return haystack.includes(deferredSearch);
  });

  const filteredPredictions = dashboard.predictions.filter((prediction) => {
    if (!deferredSearch) {
      return true;
    }

    const fixture = dashboard.matches.find((match) => match.id === prediction.fixtureId);
    const haystack =
      `${prediction.market} ${prediction.rationale} ${prediction.liveTrigger} ${fixture?.homeTeam ?? ""} ${fixture?.awayTeam ?? ""}`.toLowerCase();

    return haystack.includes(deferredSearch);
  });

  function handleSearchChange(value: string) {
    startTransition(() => {
      setSearchValue(value);
    });
  }

  function handleTabChange(tab: AppTab) {
    setActiveTab(tab);
    webApp?.HapticFeedback?.selectionChanged();
  }

  const userLabel = user?.username ?? user?.first_name ?? "analyst";

  return (
    <TelegramShell
      accentColor={accentColor}
      competition={dashboard.competition}
      generatedAt={formatKickoff(dashboard.generatedAt)}
      userLabel={userLabel}
    >
      <section className="hero-grid reveal">
        <div className="hero-copy">
          <p className="eyebrow">Visual thesis</p>
          <h1>High-speed sports intelligence that lives inside Telegram.</h1>
          <p className="hero-text">
            One interface for fixtures, lineups, injuries, H2H context, model
            probabilities, LLM narratives, paywall control, and retention loops.
          </p>

          <p className="hero-text">
            Demo build: frontend-only snapshot with mocked feeds for client review.
          </p>

          <div className="hero-actions">
            <button className="cta-primary" type="button">
              Open live slate
            </button>
            <button className="cta-secondary" type="button">
              Sync postbacks
            </button>
          </div>

          <div className="hero-notes">
            <span>{isTelegram ? "Native Telegram WebApp session" : "Browser preview mode"}</span>
            <span>Frontend-only demo</span>
            <span>Next sync window: 12 sec</span>
          </div>
        </div>

        <div className="hero-radar">
          <div className="hero-orbit">
            <div className="hero-core">
              <span className="live-dot" />
              <strong>Realtime ingestion</strong>
              <small>fixtures / lineups / live / injuries / H2H</small>
            </div>
          </div>
          <div className="hero-statline">
            <div>
              <span>Primary league</span>
              <strong>{dashboard.matches[0]?.league ?? dashboard.competition}</strong>
            </div>
            <div>
              <span>Top fixture</span>
              <strong>
                {dashboard.matches[0]?.homeTeam} vs {dashboard.matches[0]?.awayTeam}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <nav className="tab-dock">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === activeTab ? "tab-active" : ""}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="toolbar">
        <div className="toolbar-copy">
          <p className="eyebrow">Content plan</p>
          <h3>Overview, live signal board, AI rationale, and monetization logic.</h3>
        </div>
        <div className="toolbar-status">
          <span className={`status-pill ${isLoading ? "loading" : "ready"}`}>
            {isLoading ? "Refreshing snapshot" : "Snapshot ready"}
          </span>
          <span className="status-pill muted">User: {userLabel}</span>
        </div>
      </section>

      <main className="workspace">
        {(activeTab === "overview" || activeTab === "live") && (
          <MatchGrid matches={filteredMatches} />
        )}

        {(activeTab === "overview" || activeTab === "insights") && (
          <>
            <SignalHero aiSummary={dashboard.aiSummary} metrics={dashboard.metrics} />
            <PredictionRail
              matches={dashboard.matches}
              predictions={filteredPredictions}
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
            />
          </>
        )}

        {(activeTab === "overview" || activeTab === "access") && (
          <AccessMatrix alertRules={dashboard.alertRules} tiers={dashboard.tiers} />
        )}
      </main>
    </TelegramShell>
  );
}
