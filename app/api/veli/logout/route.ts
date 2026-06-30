import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST() { (await cookies()).delete("ka_parent"); return NextResponse.json({ ok: true }); }
