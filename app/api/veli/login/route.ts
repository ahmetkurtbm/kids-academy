import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSession, sessionCookie, verifyPassword } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { slug, password } = await request.json();
    const { data } = await getSupabaseAdmin().from("parent_accounts").select("id,slug,password_hash,active").eq("slug", String(slug || "").toLowerCase()).maybeSingle();
    if (!data?.active || typeof password !== "string" || !verifyPassword(password, data.password_hash)) {
      return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
    }
    (await cookies()).set("ka_parent", createSession({ role: "parent", parentId: data.id, slug: data.slug }), sessionCookie);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Giriş şu anda yapılamıyor." }, { status: 500 }); }
}
