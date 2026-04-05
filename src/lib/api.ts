import { mockDashboard } from "../mocks/dashboard";
import type { DashboardSnapshot } from "./types";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export async function loadDashboard(): Promise<DashboardSnapshot> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/v1/dashboard/overview`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Dashboard request failed: ${response.status}`);
    }

    return (await response.json()) as DashboardSnapshot;
  } catch {
    return mockDashboard;
  }
}
