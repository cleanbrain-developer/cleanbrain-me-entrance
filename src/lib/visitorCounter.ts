// Client for the shared cleanbrain-me-visitor-counter service. This app has
// no backend of its own (see docs/architecture/overview.md), so this is a
// plain external fetch, not a proxied/forwarded request.
const BASE_URL =
  import.meta.env.VITE_VISITOR_COUNTER_URL ?? "https://visitor-counter.cleanbrain.me";
const SERVICE_ID = "entrance";

function clientTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// No client-side "have I already pinged" guard: the backend already
// dedups correctly on its own (Today counts distinct ip_hash+user_agent
// within the day's range; All is a unique constraint on
// service+ip_hash+user_agent+day), so a plain ping on every page load is
// both simpler and more robust than trying to mirror that dedup logic
// client-side with sessionStorage -- which is per-tab state, invisible
// from the server, and silently permanent for the rest of the day if the
// one attempt it allowed happened to fail.
export async function recordVisit(): Promise<void> {
  try {
    await fetch(`${BASE_URL}/v1/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service: SERVICE_ID, tz: clientTimeZone() }),
    });
  } catch {
    // Counter being unreachable must never affect the page itself.
  }
}

export async function fetchTodayCount(): Promise<number | null> {
  try {
    const tz = encodeURIComponent(clientTimeZone());
    const res = await fetch(`${BASE_URL}/v1/visits/today?service=${SERVICE_ID}&tz=${tz}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { count: number };
    return data.count;
  } catch {
    return null;
  }
}

export async function fetchAllTimeCount(): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/v1/visits/all?service=${SERVICE_ID}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { count: number };
    return data.count;
  } catch {
    return null;
  }
}

// TEMPORARY diagnostic for a mobile-only report where Today/All never
// render on this app specifically (not on sibling apps hitting the same
// backend from the same device) -- surfaces the actual failure on-screen
// since the reporter has no way to open browser dev tools. Remove once
// the cause is found.
export async function debugVisitorCounter(): Promise<string> {
  const lines: string[] = [];
  lines.push(`base=${BASE_URL}`);
  lines.push(`tz=${(() => {
    try {
      return clientTimeZone();
    } catch (err) {
      return `threw: ${err instanceof Error ? err.message : String(err)}`;
    }
  })()}`);

  try {
    const res = await fetch(`${BASE_URL}/healthz`);
    lines.push(`healthz: HTTP ${res.status}`);
  } catch (err) {
    lines.push(`healthz: threw "${err instanceof Error ? err.message : String(err)}"`);
  }

  try {
    const tz = encodeURIComponent(clientTimeZone());
    const url = `${BASE_URL}/v1/visits/today?service=${SERVICE_ID}&tz=${tz}`;
    const res = await fetch(url);
    const text = await res.text();
    lines.push(`today: HTTP ${res.status} body=${text.slice(0, 100)}`);
  } catch (err) {
    lines.push(`today: threw "${err instanceof Error ? err.message : String(err)}"`);
  }

  try {
    const url = `${BASE_URL}/v1/visits/all?service=${SERVICE_ID}`;
    const res = await fetch(url);
    const text = await res.text();
    lines.push(`all: HTTP ${res.status} body=${text.slice(0, 100)}`);
  } catch (err) {
    lines.push(`all: threw "${err instanceof Error ? err.message : String(err)}"`);
  }

  return lines.join(" | ");
}
