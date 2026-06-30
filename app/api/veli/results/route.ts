import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  const session = readSession((await cookies()).get("ka_parent")?.value);
  if (!slug || session?.role !== "parent" || session.slug !== slug) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  try {
    const db = getSupabaseAdmin();
    const [{ data: parent, error: pError }, { data: exams, error: eError }] = await Promise.all([
      db.from("parent_accounts").select("parent_name,student_name,slug").eq("id", session.parentId).single(),
      db.from("exams").select("id,title,exam_date,score,note,exam_subjects(subject_name,correct_count,wrong_count,blank_count,review_topics)").eq("parent_id", session.parentId).order("exam_date", { ascending: true }),
    ]);
    if (pError || eError) throw pError || eError;
    return NextResponse.json({ parent, exams });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Sonuçlar alınamadı." }, { status: 500 }); }
}
