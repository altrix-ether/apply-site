import crypto from "crypto";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 12;

export function adminUsername() {
  return process.env.ADMIN_USER || "admin";
}

function expectedPassword() {
  return process.env.ADMIN_PASSWORD || "alteryx-careers";
}

function secret() {
  return process.env.ADMIN_SECRET || "alteryx-admin-session";
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function credentialsMatch(username, password) {
  return safeEqual(String(username || "").trim(), adminUsername()) && safeEqual(password || "", expectedPassword());
}

export function createSession(username) {
  const payload = Buffer.from(JSON.stringify({ u: username, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readSession(token) {
  if (!token || !token.includes(".")) return null;
  const dot = token.lastIndexOf(".");
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  if (!safeEqual(sig, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data?.u || data.u !== adminUsername() || !data.exp || data.exp < Date.now()) return null;
    return data.u;
  } catch {
    return null;
  }
}

export const sessionCookie = {
  name: COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  },
};
