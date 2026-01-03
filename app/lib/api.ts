// Add /api prefix for Vercel serverless function routing
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL! + "/api";
export const APP_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD!;

export async function apiGet(path: string) {
  const res = await fetch(API_BASE + path, {
    headers: { "x-app-password": APP_PASSWORD },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-password": APP_PASSWORD,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
