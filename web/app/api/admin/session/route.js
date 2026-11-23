import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession, sessionCookie } from "../../../../lib/adminAuth";

export async function GET() {
  const jar = await cookies();
  const username = readSession(jar.get(sessionCookie.name)?.value);
  if (!username) return NextResponse.json({ error: "Sign in." }, { status: 401 });
  return NextResponse.json({ username });
}
