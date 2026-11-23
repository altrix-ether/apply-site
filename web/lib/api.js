const API_URL = process.env.API_URL || "http://127.0.0.1:4000";

export async function getCatalog() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load roles.");
  return res.json();
}

export async function getJob(slug) {
  const res = await fetch(`${API_URL}/api/jobs/${slug}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Could not load this role.");
  const data = await res.json();
  return data.job;
}
