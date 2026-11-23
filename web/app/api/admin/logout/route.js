import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sessionCookie } from "../../../../lib/adminAuth";

export async function POST() {
  const jar = await cookies();
  jar.set(sessionCookie.name, "", { ...sessionCookie.options, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
