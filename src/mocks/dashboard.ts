import type { DashboardSnapshot } from "../lib/types";

export const mockDashboard: DashboardSnapshot = {
  generatedAt: "2026-04-05T09:15:00Z",
  competition: "UEFA + Top-5 Leagues",
  aiSummary:
    "The strongest edges are forming around high-tempo home sides with stable lineups and favorable injury asymmetry. Live alerts should prioritize momentum spikes after minute 25 and late substitution clusters.",
  metrics: [
    {
      label: "Live fixtures",
      value: "18",
      delta: "+4 in last 10 min",
      tone: "positive"
    },
    {
      label: "Model edge",
      value: "6.8%",
      delta: "xG + injuries blend",
      tone: "neutral"
    },
    {
      label: "Cache latency",
      value: "42 ms",
      delta: "Redis warm path",
      tone: "positive"
    },
    {
      label: "Bot triggers",
      value: "11",
      delta: "2 in cooldown",
      tone: "alert"
    }
  ],
  matches: [
    {
      id: "ars-rma-01",
      league: "Champions League",
      startTime: "2026-04-05T18:00:00Z",
      homeTeam: "Arsenal",
      awayTeam: "Real Madrid",
      status: "Pre-match",
      injuries: 2,
      momentum: 0.71,
      modelConfidence: 0.83,
      h2hEdge: "Arsenal press advantage"
    },
    {
      id: "mci-int-02",
      league: "Champions League",
      startTime: "2026-04-05T20:00:00Z",
      homeTeam: "Manchester City",
      awayTeam: "Inter",
      status: "Live 58'",
      injuries: 1,
      momentum: 0.79,
      modelConfidence: 0.88,
      h2hEdge: "City central overload"
    },
    {
      id: "psg-mil-03",
      league: "Champions League",
      startTime: "2026-04-05T19:00:00Z",
      homeTeam: "PSG",
      awayTeam: "Milan",
      status: "Pre-match",
      injuries: 4,
      momentum: 0.66,
      modelConfidence: 0.74,
      h2hEdge: "Wide transition bias"
    },
    {
      id: "atl-sev-04",
      league: "La Liga",
      startTime: "2026-04-05T16:30:00Z",
      homeTeam: "Atletico",
      awayTeam: "Sevilla",
      status: "Live 24'",
      injuries: 3,
      momentum: 0.61,
      modelConfidence: 0.69,
      h2hEdge: "Set-piece control"
    }
  ],
  predictions: [
    {
      id: "pred-01",
      fixtureId: "ars-rma-01",
      market: "Arsenal draw no bet",
      probability: 0.68,
      confidence: "core",
      rationale:
        "Lineup stability and home pressure profile are stronger than the market baseline. Injury delta also favors the hosts.",
      liveTrigger: "Escalate if Arsenal completes 7+ box entries by minute 25."
    },
    {
      id: "pred-02",
      fixtureId: "mci-int-02",
      market: "Over 2.5 goals",
      probability: 0.73,
      confidence: "sharp",
      rationale:
        "Live possession pressure and transition volume remain elevated. Inter's defensive line is stretching after minute 50.",
      liveTrigger: "Push a bot alert if total shots on target reach 9 before minute 70."
    },
    {
      id: "pred-03",
      fixtureId: "psg-mil-03",
      market: "Both teams to score",
      probability: 0.64,
      confidence: "watch",
      rationale:
        "PSG's high event profile meets Milan's counter window. Risk is tied to PSG fullback availability.",
      liveTrigger: "Upgrade if Milan records 3+ progressive carries in the first half."
    },
    {
      id: "pred-04",
      fixtureId: "atl-sev-04",
      market: "Atletico to score next",
      probability: 0.61,
      confidence: "core",
      rationale:
        "Atletico has the stronger territory share and is forcing repeated corners into Sevilla's weak-side channel.",
      liveTrigger: "Send minute-level trigger on any Sevilla right-flank substitution."
    }
  ],
  alertRules: [
    {
      id: "rule-01",
      name: "Momentum Spike",
      condition: "Momentum > 0.78 for 4 consecutive minutes",
      channel: "Telegram Bot",
      status: "armed"
    },
    {
      id: "rule-02",
      name: "Injury Shock",
      condition: "Confirmed starter withdrawn inside 30 minutes",
      channel: "Telegram Bot",
      status: "armed"
    },
    {
      id: "rule-03",
      name: "Odds Drift",
      condition: "Model edge widens above 8%",
      channel: "Telegram Bot",
      status: "cooldown"
    }
  ],
  tiers: [
    {
      id: "free",
      name: "Scout",
      price: "$0",
      description: "Topline fixtures, delayed probabilities, one daily brief.",
      features: [
        "15 minute delayed live states",
        "3 AI briefs per day",
        "One active watchlist"
      ],
      accent: "var(--accent)"
    },
    {
      id: "pro",
      name: "Edge Pro",
      price: "$29/mo",
      description: "Full live dashboards, premium signals, trigger notifications.",
      features: [
        "Real-time lineup and injury sync",
        "Unlimited AI-generated previews",
        "Telegram trigger notifications"
      ],
      accent: "var(--accent-warm)"
    },
    {
      id: "elite",
      name: "Quant Desk",
      price: "$99/mo",
      description: "Multi-league coverage, admin insights, and custom bot flows.",
      features: [
        "Portfolio-level market monitoring",
        "Custom postback access rules",
        "Private analyst bot scenarios"
      ],
      accent: "var(--accent-hot)"
    }
  ]
};
