import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminUsername, createSession, credentialsMatch, sessionCookie } from "../../../../lib/adminAuth";

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!credentialsMatch(body.username, body.password)) {
    return NextResponse.json({ error: "That username or password is wrong." }, { status: 401 });
  }

  const username = adminUsername();
  const jar = await cookies();
  jar.set(sessionCookie.name, createSession(username), sessionCookie.options);
  return NextResponse.json({ ok: true, username });
}
