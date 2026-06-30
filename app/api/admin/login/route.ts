import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSession, sessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Admin şifresi yapılandırılmamış." }, { status: 503 });
  if (typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }
  (await cookies()).set("ka_admin", createSession({ role: "admin" }), sessionCookie);
  return NextResponse.json({ ok: true });
}
